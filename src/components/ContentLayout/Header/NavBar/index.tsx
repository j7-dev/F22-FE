import React from 'react';
import { nanoid } from 'nanoid';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSetAtom, useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai';
import {
    popupIsOpenAtom,
    IsLoginAtom,
} from '@/components/ContentLayout/LoginPopUp';
import SubMenuUI from './SubMenu';
import logo from '@/assets/images/logo.png';
import {
    fakeMenuData,
    MenuItem,
} from '@/components/ContentLayout/Header/MenuData';
import { mbSidebarAtom } from '@/components/ContentLayout';
import { sidebarIsOpenAtom } from '@/components/ContentLayout/Sidebar';
import { BiSolidUser } from 'react-icons/bi';

const NavBar: React.FC = () => {
    const { t } = useTranslation();
    const [isLogin, setIsLogin] = useAtom(IsLoginAtom);
    const [mbSidebar, setMbSidebar] = useAtom(mbSidebarAtom);
    const setsidebarIsOpen = useSetAtom(sidebarIsOpenAtom);
    // const sidebarIsOpen = useAtomValue(sidebarIsOpenAtom);

    const Navigate = useNavigate();
    const fakeData = fakeMenuData;

    // LoginButton
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const handleClick = () => {
        setPopupIsOpen((prevValue) => !prevValue);
        // console.log('popupIsOpenAtom', popupIsOpen);
    };
    // LogOutButton
    const handleLogout = () => {
        setIsLogin(false);
        Navigate('/');
    };

    // 自訂 Hook 來判斷是否為當前路徑
    function isActive(path: string) {
        const location = useLocation();
        return location.pathname === path ? 'active' : '';
    }

    //手機版選單
    const handleMbSidebar = () => {
        setsidebarIsOpen((prevValue) => !prevValue);
        setMbSidebar((prevValue) => !prevValue);
        // console.log('mbSidebar', mbSidebar);
        // console.log('sidebarIsOpen', sidebarIsOpen);
    };
    return (
        <>
            {/* <!-- Navbar --> */}
            <div className="relative w-full bg-white md:flex md:items-center md:justify-between px-4 sm:px-6 lg:px-8">
                <nav
                    className="relative max-w-7xl w-full py-3  md:flex md:items-center md:justify-between md:py-0  xl:mx-auto "
                    aria-label="Global"
                >
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <span className="flex-none text-xl font-semibold text-white ">
                                <img
                                    src={logo}
                                    alt=""
                                    className="max-w-[250px]"
                                />
                            </span>
                        </Link>
                        <div className="md:hidden mobileBtn">
                            <button
                                type="button"
                                className="inline-flex justify-center items-center gap-2 rounded-full bg-transparent border-transparent  shadow-sm align-middle transition-all"
                                onClick={handleMbSidebar}
                            >
                                <div
                                    className={`menuBtn transition-all ${
                                        mbSidebar ? 'rotate-45' : ''
                                    }`}
                                >
                                    {mbSidebar ? (
                                        <AiOutlinePlus size={40} />
                                    ) : (
                                        <AiOutlineMenu size={40} />
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className=" hidden transition-all duration-300 basis-full grow md:block">
                        <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-between md:gap-y-0 md:gap-x-7 md:mt-0 md:pl-7">
                            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-start md:gap-y-0 md:gap-x-7 md:mt-0 ">
                                {fakeData.map((item) => {
                                    const title = item?.title as string;
                                    const path = item?.path as string;
                                    // 如果 item.submenu 存在（非空）則將 hasSubmenu 設置為 true
                                    const hasSubmenu = !!item?.submenu;

                                    return (
                                        <div
                                            className="navMenuItem"
                                            key={nanoid()}
                                        >
                                            <Link to={path}>
                                                <span
                                                    className={`font-bold text-gray-500 hover:text-[#78d39d] md:py-6 ${isActive(
                                                        path,
                                                    )} ${
                                                        hasSubmenu
                                                            ? 'hasSubmenu'
                                                            : ''
                                                    }`}
                                                >
                                                    {t(title)}
                                                </span>
                                            </Link>
                                            {hasSubmenu && (
                                                <ul className="submenu hidden absolute ml-[-20px] bg-white rounded-xl z-10 p-2.5 w-auto my-0">
                                                    <SubMenuUI
                                                        submenu={
                                                            item?.submenu as MenuItem[]
                                                        }
                                                    />
                                                </ul>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {/* TODO 把登入登出拆成組件 */}
                            <span
                                className={`loginBtn whitespace-nowrap flex items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 cursor-pointer ${
                                    isLogin === false ? 'block' : 'hidden'
                                } `}
                                onClick={handleClick}
                            >
                                <BiSolidUser size={20} />
                                Log in
                            </span>
                            <div
                                className={`walletBtn flex flex-row gap-2.5 ${
                                    isLogin === true ? 'block' : 'hidden'
                                }`}
                            >
                                <Link to="/wallet">
                                    <span className="flex whitespace-nowrap  items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 ">
                                        <svg
                                            className="w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                        </svg>
                                        My Wallet
                                    </span>
                                </Link>
                                <span
                                    className="logoutBtn whitespace-nowrap  flex items-center rounded-lg border-white gap-x-2 font-bold bg-[#e5e5e5] text-black hover:opacity-80  md:my-3 md:px-6 md:py-3 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            {/* <!-- End Navbar --> */}
        </>
    );
};

export default NavBar;
