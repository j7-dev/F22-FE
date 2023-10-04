import React from 'react';
import { nanoid } from 'nanoid';
import { useIsAuthenticated } from '@refinedev/core';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSetAtom, useAtom } from 'jotai';
import { selectedSectionAtom } from '@/pages/Content/Wallet';
import { popupIsOpenAtom } from '@/components/ContentLayout/Header/LoginModule';
import { walletArray } from './walletArray';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';

const index: React.FC = () => {
    const { t } = useTranslation();
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);
    const [_selectedSection, setSelectedSection] = useAtom(selectedSectionAtom);

    const Navigate = useNavigate();
    const { data } = useIsAuthenticated();
    const isLogin = data?.authenticated;
    const walletArrayData = walletArray;

    return (
        <ul className="WallerContainer w-full text-white transition-all duration-300 mb-0 pl-0 flex flex-col gap-4">
            {walletArrayData.map((wallet) => {
                const handleClick = (walletAction: string) => {
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
                            handleClick(wallet.value);
                        }}
                        className={`${activeMenu === wallet.value && isLogin ? 'active' : ''} ${wallet.value} relative transition-all cursor-pointer  px-6 sm:px-0 sm:rounded-2xl text-[#333333]`}
                    >
                        <span className="flex items-center text-sm overflow-hidden">
                            <div className="favicon min-w-[60px] min-h-[60px] flex justify-center items-center" />
                            <span className={`whitespace-nowrap text-lg font-normal`}>{t(wallet.label)}</span>
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
