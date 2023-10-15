import React from 'react';
import { Link } from 'react-router-dom';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import WallerContainer from './WallerContainer';
import GameNavContainer from './GameNavContainer';
// import LanguageSwitch from '@/components/ContentLayout/Header/LanguageSwitch';
import { windowWidthAtom, mbSidebarAtom } from '@/components/ContentLayout';
import { loginOrSignUpAtom, popupIsOpenAtom } from '@/components/ContentLayout/Header/LoginModule';

//FIXME sidebarIsOpenAtom 有沒有更好的做法?它的作用是判斷側選單要不要打開
// activeMenuAtom應該不用,就是用做判斷active的
export const sidebarIsOpenAtom = atom(false);
export const activeMenuAtom = atom('');

export const Sidebar: React.FC = () => {
    const windowWidth = useAtomValue(windowWidthAtom);
    const setMbSidebar = useSetAtom(mbSidebarAtom);
    const setLoginOrSignUp = useSetAtom(loginOrSignUpAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const [sidebarIsOpen, setSidebarIsOpen] = useAtom(sidebarIsOpenAtom);

    const handleMouseEnter = () => {
        windowWidth >= 414 && setSidebarIsOpen(true);
    };
    const handleMouseLeave = () => {
        windowWidth >= 414 && setSidebarIsOpen(false);
    };

    const handleMbSidebar = () => {
        if (windowWidth <= 414) {
            setSidebarIsOpen((prevValue) => !prevValue);
            setMbSidebar((prevValue) => !prevValue);
        }
    };

    //登入彈窗
    const handleClick = () => {
        setLoginOrSignUp(true);
        setPopupIsOpen(true);
    };
    return (
        <div className={`sideBar ${sidebarIsOpen ? 'active' : ''} text-[#BDBDBD] h-full bg-white pb-10 sm:w-[88px] sm:hover:w-80 transition-all duration-300`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleMbSidebar}>
            <div className="opacity-0 w-full logo h-20 flex justify-center items-center mb-6 sm:mb-9 sm:opacity-100 ">
                <Link to="/" className="w-full">
                    <div className="relative w-full block h-12 px-[14px]">
                        <div className="logoFavicon w-full h-full bg-contain bg-center bg-no-repeat" />
                        <span className="sr-only">跳轉到首頁</span>
                    </div>
                </Link>
            </div>
            <div className="sideNav overflow-y-scroll h-[calc(100%-80px)] pb-10  sm:px-[14px] w-full flex flex-col relative">
                <GameNavContainer />
                <div className="border-0 border-solid border-t-2 mx-[14px] my-[46px]" />
                <WallerContainer />
                {/* 電腦登入 */}
                <div className="hidden sm:flex flex-col startNow opacity-0 w-full duration-300 mt-52">
                    <div className="contain flex flex-col py-5 gap-5 p-[14px] font-semibold text-sm justify-center items-center bg-gradient-to-r from-[#E9AAF1] to-[#8155EC] rounded-[20px]">
                        <p className="text-white">
                            Lorem ipsum dolor sit <br /> amet consectetur.{' '}
                        </p>
                        <span onClick={handleClick} className="startNowBtn cursor-pointer flex justify-center items-center text-black bg-white shadow-[2px_4px_4px_0_#4F2AEA2B] rounded-2xl h-10 w-full py-2.5 px-6">
                            START NOW
                        </span>
                    </div>
                </div>
                {/* 手機選單 */}
                {/* <div className="sm:hidden tertiaryButton languageSwitchContain relative w-fit mt-20 mx-6 flex items-center justify-center">
                    <LanguageSwitch />
                </div> */}
            </div>
        </div>
    );
};
