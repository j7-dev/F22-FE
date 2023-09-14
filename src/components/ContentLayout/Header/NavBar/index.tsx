import React from 'react';
import { nanoid } from 'nanoid';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai';
import SubMenuUI from './SubMenu';
import LoginNodule, { IsLoginAtom, popupIsOpenAtom } from '@/components/ContentLayout/LoginModule';
import logo from '@/assets/images/logo.png';
import { fakeMenuData, MenuItem } from '@/components/ContentLayout/Header/MenuData';
import { mbSidebarAtom } from '@/components/ContentLayout';
import { sidebarIsOpenAtom } from '@/components/ContentLayout/Sidebar';
import { UserOutlined } from '@ant-design/icons';
import { GiPokerHand } from 'react-icons/gi';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { BiCheckShield } from 'react-icons/bi';

const NavBar: React.FC = () => {
    const { t } = useTranslation();
    const [mbSidebar, setMbSidebar] = useAtom(mbSidebarAtom);
    const setSidebarIsOpen = useSetAtom(sidebarIsOpenAtom);
    // const sidebarIsOpen = useAtomValue(sidebarIsOpenAtom);
    const isLogin = useAtomValue(IsLoginAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const Navigate = useNavigate();
    const fakeData = fakeMenuData;

    // 自訂 Hook 來判斷是否為當前路徑
    function isActive(path: string) {
        const location = useLocation();
        return location.pathname === path ? 'active' : '';
    }

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
            <div className="relative w-full bg-white md:flex md:items-center md:justify-between px-4 sm:px-6 lg:px-8">
                <nav className="relative max-w-7xl w-full py-3 xl:flex md:items-center xl:justify-between md:py-0  xl:mx-auto " aria-label="Global">
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <span className="flex-none text-xl font-semibold text-white ">
                                <img src={logo} alt="" className="max-w-[250px] xl:max-h-none max-h-[40px]" />
                            </span>
                        </Link>
                        <div className="xl:hidden mobileBtn">
                            <button type="button" className="inline-flex justify-center items-center gap-2 rounded-full bg-transparent border-transparent  shadow-sm align-middle transition-all" onClick={handleMbSidebar}>
                                <div className={`menuBtn transition-all ${mbSidebar ? 'rotate-45' : ''}`}>{mbSidebar ? <AiOutlinePlus size={30} /> : <AiOutlineMenu size={30} />}</div>
                            </button>
                        </div>
                    </div>
                    {/* 桌機選單 */}
                    <div className="hidden transition-all duration-300 basis-full grow xl:block">
                        <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-between md:gap-y-0 md:gap-x-7 md:mt-0 md:pl-7">
                            <div className="hidden xl:flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-start md:gap-y-0 md:gap-x-7 md:mt-0 ">
                                {fakeData.map((item) => {
                                    const title = item?.title as string;
                                    const path = item?.path as string;
                                    // 如果 item.submenu 存在（非空）則將 hasSubmenu 設置為 true
                                    const hasSubmenu = !!item?.submenu;

                                    return (
                                        <div className="navMenuItem" key={nanoid()}>
                                            <Link to={path}>
                                                <span className={`font-bold text-gray-500 hover:text-[#78d39d] md:py-6 ${isActive(path)} ${hasSubmenu ? 'hasSubmenu' : ''}`}>{t(title)}</span>
                                            </Link>
                                            {hasSubmenu && (
                                                <ul className="submenu hidden absolute ml-[-20px] bg-white rounded-xl z-10 p-2.5 w-auto my-0">
                                                    <SubMenuUI submenu={item?.submenu as MenuItem[]} />
                                                </ul>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <LoginNodule />
                        </div>
                    </div>
                    {/* 手機選單 */}
                    <div className="flex xl:hidden bg-white fixed bottom-0 left-0 justify-between w-full px-8 pt-3 pb-2" style={{ borderTop: '1px solid #999' }}>
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
                        <div onClick={handleProfile}>
                            <div className="flex flex-col justify-center items-center text-gray-600 hover:text-gray-400">
                                <UserOutlined className="text-[1.5rem]" />
                                <span className="text-xs font-normal">Profile</span>
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
