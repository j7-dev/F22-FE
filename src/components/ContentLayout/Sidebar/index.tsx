import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { atom, useAtom, useSetAtom } from 'jotai';
import WallerContainer from './WallerContainer';
import GameNavContainer from './GameNavContainer';
// import LanguageSwitch from '@/components/ContentLayout/Header/LanguageSwitch';
import { loginOrSignUpAtom, popupIsOpenAtom } from '@/components/ContentLayout/Header/LoginModule';

export const activeMenuAtom = atom('');
export const mbSidebarAtom = atom(false); //手機版選單是否打開

export const Sidebar: React.FC = () => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const [mbSidebar, setMbSidebar] = useAtom(mbSidebarAtom);
    const setLoginOrSignUp = useSetAtom(loginOrSignUpAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);

    //點擊START NOW登入彈窗
    const handleClick = () => {
        setLoginOrSignUp(true);
        setPopupIsOpen(true);
    };

    //點擊選單本身關閉手機選單
    const handleCloseMbSidebar = () => {
        if (mbSidebar) {
            setMbSidebar(false);
        }
    };
    //點擊選單外關閉手機選單
    const windowClick = (event: any) => {
        if (sidebarRef?.current?.classList.contains('active') && !sidebarRef.current.contains(event.target as Node) && !event.target.classList.contains('menuBtnIcon')) {
            setMbSidebar(false);
        }
    };
    //監聽window的點擊事件關閉手機選單
    useEffect(() => {
        window.addEventListener('click', windowClick);
        // 清理监听器以避免内存泄漏
        return () => {
            window.removeEventListener('click', windowClick);
        };
    }, []);

    return (
        <div onClick={handleCloseMbSidebar} ref={sidebarRef} className={`${mbSidebar ? 'active' : 'w-0'} sideBar text-[#828282] h-full bg-white pb-10 sm:w-full sm:shadow-none shadow-[2px_0px_20px_0px_rgba(163,112,237,0.25)] duration-300`}>
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
                <div className="hidden sm:flex flex-col startNow opacity-0 w-full transition-all mt-52">
                    <div className="contain flex flex-col py-5 gap-5 p-[14px] font-semibold text-sm justify-center items-center bg-gradient-to-r from-[#E9AAF1] to-[#8155EC] rounded-[20px]">
                        <p className="text-white">
                            <Trans i18nKey="Lorem ipsum dolor sit" />
                        </p>
                        <span onClick={handleClick} className="startNowBtn cursor-pointer flex justify-center items-center text-black bg-white shadow-[2px_4px_4px_0_#4F2AEA2B] rounded-2xl h-10 w-full py-2.5 px-6">
                            {t('START NOW')}
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
