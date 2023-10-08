import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import NewsMarquee from '../../NewsMarquee';
import UserInfo from '../UserInfo';
import LoginModule, { IsLoginAtom, popupIsOpenAtom } from '../LoginModule';
import { mbSidebarAtom, windowWidthAtom } from '@/components/ContentLayout';
import { sidebarIsOpenAtom } from '@/components/ContentLayout/Sidebar';
import Icon_Wallet_White from '@/assets/images/Icon_Wallet_White.svg';
import logo from '@/assets/images/logo_f.png';
import menuBtn from '@/assets/images/menuBtn.svg';
import menuOpen from '@/assets/images/menuOpen.svg';

const NavBar: React.FC = () => {
    const [mbSidebar, setMbSidebar] = useAtom(mbSidebarAtom);
    const setSidebarIsOpen = useSetAtom(sidebarIsOpenAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const windowWidth = useAtomValue(windowWidthAtom);
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
        <div className="z-[999] fixed h-20 Navbar sm:relative w-full sm:h-full bg-white md:flex md:items-center md:justify-between px-4 sm:px-6 lg:px-8 shadow-[0_4px_4px_0px_#A370ED33]">
            <nav className="relative w-full h-full py-3 xl:flex md:items-center xl:justify-between md:py-0  xl:mx-auto " aria-label="Global">
                {/* 桌機選單 */}
                <div className="pcMenu hidden w-full relative transition-all duration-300 basis-full grow sm:flex flex-row gap-16 justify-between items-center">
                    {windowWidth > 414 ? <NewsMarquee speed={30} marqueeText={['Lorem ipsum dolor sit amet consectetur. Auctor rhoncus non pharetra sollicitudin.']} /> : ''}
                    <div className="userSection flex items-center gap-2.5">
                        {isLogin ? <UserInfo /> : ''}
                        <LoginModule />
                    </div>
                </div>
                {/* 手機選單 */}
                <div className="mbMenu w-full h-full relative z-50 flex items-center justify-between sm:hidden">
                    {/* 手機版選單按鈕 */}
                    <div className="phoneMenu w-[30px] h-[30px]">
                        <button type="button" className="inline-flex justify-center items-center gap-2 rounded-full bg-transparent border-transparent  shadow-sm align-middle transition-all" onClick={handleMbSidebar}>
                            <div className={`menuBtn transition-all ${mbSidebar ? 'rotate-45' : ''}`}>{mbSidebar ? <img src={menuOpen} /> : <img src={menuBtn} />}</div>
                        </button>
                    </div>
                    <div className="logo w-full h-full flex items-center">
                        <Link to="/" className="w-full">
                            <img src={logo} alt="" className="w-full h-[30px] object-contain" />
                        </Link>
                    </div>
                    <div className="myWallet w-[30px] h-[30px] rounded-xl bg-[#5932EA] aspect-square p-1" onClick={handleProfile}>
                        <img src={Icon_Wallet_White} alt="" className="w-full h-full object-contain " />
                    </div>
                </div>
                {/* 手機選單 */}
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
