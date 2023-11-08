import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { atom, useAtom } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';
import { useIsLogin } from '@/hooks/resources/useIsLogin';
import { useLogout } from '@refinedev/core';
import WallerContainer from './WallerContainer';
import GameNavContainer from './GameNavContainer';
import appStore from '@/assets/images/sideBar/appStore.png';
import googlePlay from '@/assets/images/sideBar/googlePlay.png';

export const activeMenuAtom = atom('');
export const mbSidebarAtom = atom(false); //手機版選單是否打開

export const Sidebar: React.FC = () => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const [mbSidebar, setMbSidebar] = useAtom(mbSidebarAtom);
    const isLogin = useIsLogin();
    //登出
    const queryClient = useQueryClient();
    const { mutate: logout } = useLogout();
    const handleLogOut = () => {
        logout();
        queryClient.clear();
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
        <div onClick={handleCloseMbSidebar} ref={sidebarRef} className={`${mbSidebar ? 'active' : 'w-0'} sideBar text-[#828282] h-full bg-white md:pb-10 pb-20 md:w-full md:shadow-none shadow-[2px_0px_20px_0px_rgba(163,112,237,0.25)] duration-300`}>
            <div className="opacity-0 w-full logo h-20 flex justify-center items-center mb-6 md:mb-9 md:opacity-100 ">
                <Link to="/" className="w-full">
                    <div className="relative w-full block h-12 px-[14px]">
                        <div className="logoFavicon w-full h-full bg-contain bg-center bg-no-repeat" />
                        <span className="sr-only">跳轉到首頁</span>
                    </div>
                </Link>
            </div>
            <div className="sideNav overflow-y-scroll h-[calc(100%-80px)] pb-10  md:px-[14px] w-full flex flex-col relative">
                <GameNavContainer />
                <div className="divider border-0 border-solid border-t mx-[14px] my-[46px] border-[#828282]" />
                <WallerContainer />
                {/* 手機版IPA與APK下載連結 */}
                <div className="appDownload md:hidden flex flex-col gap-2 mt-[50px] w-full px-6">
                    <a href={`itms-services://?action=download-manifest&url=https://${window.location.hostname}/ipa/app.plist`} className="">
                        <img src={appStore} alt="" className="w-[144px]" />
                    </a>
                    <a href="/apk/smtbet7.apk" className="">
                        <img src={googlePlay} alt="" className="w-[144px]" />
                    </a>
                </div>
                {/* 手機版登出 */}
                {isLogin ? (
                    <div onClick={handleLogOut} className="md:hidden w-full flex justify-center logout mt-3">
                        <div className=" px-3 py-1.5 border border-solid border-black rounded-xl">
                            <span className=" text-xs text-black font-bold">{t('Log Out')}</span>
                        </div>
                    </div>
                ) : (
                    ''
                )}

                {/* 手機選單 */}
                {/* <div className="md:hidden tertiaryButton languageSwitchContain relative w-fit mt-20 mx-6 flex items-center justify-center">
                    <LanguageSwitch />
                </div> */}
            </div>
        </div>
    );
};
