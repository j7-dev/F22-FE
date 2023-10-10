import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from '@refinedev/core';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import { IsLoginAtom, popupIsOpenAtom } from '../LoginModule';
import { mbSidebarAtom, windowWidthAtom } from '@/components/ContentLayout';
import { sidebarIsOpenAtom } from '@/components/ContentLayout/Sidebar';
import Mobile from './Mobile';
import Pc from './Pc';

const NavBar: React.FC = () => {
    const setMbSidebar = useSetAtom(mbSidebarAtom);
    const setSidebarIsOpen = useSetAtom(sidebarIsOpenAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const windowWidth = useAtomValue(windowWidthAtom);
    const [isLogin, setIsLogin] = useAtom(IsLoginAtom);
    const { data } = useIsAuthenticated();
    const Navigate = useNavigate();

    //手機版選單暴露函式
    const handleMbSidebar = () => {
        setSidebarIsOpen((prevValue) => !prevValue);
        setMbSidebar((prevValue) => !prevValue);
    };
    const handleProfile = () => {
        if (isLogin) {
            Navigate('/wallet');
        } else {
            setPopupIsOpen(true);
        }
    };
    //選擇顯示的選單
    const ShowNav = () => {
        if (windowWidth > 414) return <Pc isLogin={isLogin} />;
        else return <Mobile handleMbSidebar={handleMbSidebar} handleProfile={handleProfile} isLogin={isLogin} />;
    };
    //判斷是否登入並且覆值
    useEffect(() => {
        setIsLogin(!!data?.authenticated);
    }, [data?.authenticated]);
    return (
        <div className="z-[999] fixed h-20 Navbar sm:relative w-full sm:h-full bg-white md:flex md:items-center md:justify-between px-4 sm:px-6 lg:px-8 shadow-[0_4px_4px_0px_#A370ED33]">
            <nav className="relative w-full h-full py-3 xl:flex md:items-center xl:justify-between md:py-0  xl:mx-auto " aria-label="Global">
                <ShowNav />
                {/* 舊手機選單 */}
                {/* <div className="flex sm:hidden bg-white fixed bottom-0 left-0 justify-between w-full px-8 pt-3 pb-2 z-50" style={{ borderTop: '1px solid #999' }}>
                    <Link to="/">
                        <div className="flex flex-col justify-center items-center text-gray-600 hover:text-gray-400">
                            <GiPokerHand className="text-[1.5rem]" />
                            <span className="text-xs font-normal">Game</span>
                        </div>
                    </Link>
                    <Link to="/about">
                        <div className="flex flex-col justify-center items-center text-gray-600 hover:text-gray-400">
                            <BiCheckShield className="text-[1.5rem]" />
                            <span className="text-xs font-normal">About</span>
                        </div>
                    </Link>
                    <Link to="/customer">
                        <div className="flex flex-col justify-center items-center text-gray-600 hover:text-gray-400">
                            <RiCustomerService2Fill className="text-[1.5rem]" />
                            <span className="text-xs font-normal">Service</span>
                        </div>
                    </Link>

                    <div className="cursor-pointer flex flex-col justify-center items-center text-gray-600 hover:text-gray-400" onClick={handleProfile}>
                        <UserOutlined className="text-[1.5rem]" />
                        <span className="text-xs font-normal">Profile</span>
                    </div>
                </div> */}
            </nav>
        </div>
    );
};

export default NavBar;
