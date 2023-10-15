import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom, useAtomValue } from 'jotai';
import { popupIsOpenAtom } from '../LoginModule';
import { mbSidebarAtom, windowWidthAtom } from '@/components/ContentLayout';
import { sidebarIsOpenAtom } from '@/components/ContentLayout/Sidebar';
import Mobile from './Mobile';
import Pc from './Pc';
import { useIsLogin } from '@/hooks/resources/useIsLogin';

const NavBar: React.FC = () => {
    const setMbSidebar = useSetAtom(mbSidebarAtom);
    const setSidebarIsOpen = useSetAtom(sidebarIsOpenAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const windowWidth = useAtomValue(windowWidthAtom);
    const isLogin = useIsLogin();
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

    return (
        <div className="Navbar z-[999] fixed p-4 w-full h-fit bg-white sm:flex sm:items-center sm:justify-between sm:px-6 sm:py-4 sm:h-full sm:relative shadow-[0_4px_4px_0px_#A370ED33]">
            <nav className="relative w-full h-full py-3 xl:flex sm:items-center xl:justify-between sm:py-0  xl:mx-auto " aria-label="Global">
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
