import React from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSetAtom, useAtom } from 'jotai';
import { selectedSectionAtom } from '@/pages/Content/Wallet';
import { popupIsOpenAtom } from '@/components/ContentLayout/Header/LoginModule';
import { walletArray } from './walletArray';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import { useIsLogin } from '@/hooks/resources/useIsLogin';

const index: React.FC = () => {
    const { t } = useTranslation();
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);
    const [_selectedSection, setSelectedSection] = useAtom(selectedSectionAtom);

    const Navigate = useNavigate();
    const isLogin = useIsLogin();
    const walletArrayData = walletArray;
    const walletFilterData = isLogin ? walletArrayData : walletArrayData.filter((item) => item.showIn === 'beforeLogin');
    return (
        <ul className="WallerContainer w-full transition-all duration-300 mb-0 pl-0 flex flex-col gap-4">
            {walletFilterData.map((wallet) => {
                const handleClick = (walletAction: string) => {
                    //如果點擊的是faq，就跳轉到faq頁面
                    if (walletAction === 'faq') {
                        setActiveMenu(walletAction);
                        Navigate('/faq');
                        return;
                    }
                    if (walletAction === 'sportsRegulations') {
                        setActiveMenu(walletAction);
                        Navigate('/sports-regulations');
                        return;
                    }
                    if (walletAction === 'battingRegulations') {
                        setActiveMenu(walletAction);
                        Navigate('/batting-regulations');
                        return;
                    }
                    //其餘為跳轉到錢包頁面
                    setSelectedSection(walletAction);
                    if (isLogin) {
                        Navigate('/wallet');
                        setActiveMenu(walletAction);
                    } else {
                        setPopupIsOpen(true);
                    }
                };

                return (
                    <li
                        key={nanoid()}
                        onClick={() => {
                            handleClick(wallet.label);
                        }}
                        className={`${activeMenu === wallet.label && isLogin ? 'active' : ''} ${wallet.label} relative transition-all cursor-pointer  px-6 sm:px-0 sm:rounded-2xl `}
                    >
                        <span className="flex items-center text-sm overflow-hidden pr-2.5">
                            <div className="favicon min-w-[60px] min-h-[60px] flex justify-center items-center" />
                            <span className={`whitespace-nowrap text-lg font-normal`}>{t(wallet.value)}</span>
                        </span>
                    </li>
                );
            })}
            {/* <li className={`${isLogin ? 'block' : 'hidden'} py-4`}>
                <span className="flex items-center gap-x-3.5 hover:text-[#78D39D] text-sm text-white overflow-hidden">
                    <div className="min-w-[30px] flex justify-center">
                        <BiLogOut size={25} />
                    </div>
                    <span
                        className={`text-lg whitespace-nowrap font-semibold cursor-pointer tracking-wider`}
                        onClick={() => {
                            logout({ redirectPath: '/' });
                        }}
                    >
                        {t('Log out')}
                    </span>
                </span>
            </li> */}
        </ul>
    );
};
export default index;
