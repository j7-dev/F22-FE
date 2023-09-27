import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import NewsMarquee from '../NewsMarquee';
import UserInfo from './UserInfo';
import LoginModule, { IsLoginAtom, popupIsOpenAtom } from '@/components/ContentLayout/Header/LoginModule';
import { mbSidebarAtom } from '@/components/ContentLayout';
import { sidebarIsOpenAtom } from '@/components/ContentLayout/Sidebar';
import { UserOutlined } from '@ant-design/icons';
import { GiPokerHand } from 'react-icons/gi';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { BiCheckShield } from 'react-icons/bi';
import { AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai';

const NavBar: React.FC = () => {
    const [mbSidebar, setMbSidebar] = useAtom(mbSidebarAtom);
    const setSidebarIsOpen = useSetAtom(sidebarIsOpenAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const isLogin = useAtomValue(IsLoginAtom);
    const Navigate = useNavigate();

    //手機版選單
    const handleMbSidebar = () => {
        setSidebarIsOpen((prevValue) => !prevValue);
        setMbSidebar((prevValue) => !prevValue);
        // console.log('mbSidebar', mbSidebar);
        // console.log('sidebarIsOpen', sidebarIsOpen);
    };
    const handleProfile = () => {
        if (isLogin) {
            Navigate('/wallet');
        } else {
            setPopupIsOpen(true);
        }
    };
    return (
        <>
            {/* <!-- Navbar --> */}
            <div className="Navbar relative w-full bg-white md:flex md:items-center md:justify-between px-4 sm:px-6 lg:px-8">
                <nav className="relative w-full py-3 xl:flex md:items-center xl:justify-between md:py-0  xl:mx-auto " aria-label="Global">
                    {/* 手機版選單按鈕 */}
                    <div className="phoneMenu flex items-center justify-end">
                        <div className="xl:hidden mobileBtn">
                            <button type="button" className="inline-flex justify-center items-center gap-2 rounded-full bg-transparent border-transparent  shadow-sm align-middle transition-all" onClick={handleMbSidebar}>
                                <div className={`menuBtn transition-all ${mbSidebar ? 'rotate-45' : ''}`}>{mbSidebar ? <AiOutlinePlus size={30} /> : <AiOutlineMenu size={30} />}</div>
                            </button>
                        </div>
                    </div>
                    {/* 桌機選單 */}
                    <div className="hidden w-full relative transition-all duration-300 basis-full grow xl:flex flex-row justify-between items-center">
                        <NewsMarquee />
                        <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:pl-7">
                            {isLogin && <UserInfo />}
                            <LoginModule />
                        </div>
                    </div>
                    {/* 手機選單 */}
                    <div className="flex xl:hidden bg-white fixed bottom-0 left-0 justify-between w-full px-8 pt-3 pb-2 z-50" style={{ borderTop: '1px solid #999' }}>
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
                    </div>
                </nav>
            </div>
            {/* <!-- End Navbar --> */}
        </>
    );
};

export default NavBar;
