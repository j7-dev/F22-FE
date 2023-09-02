import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sidebarIsOpenAtom } from '@/components/ContentLayout/Sidebar';
import { selectedSectionAtom } from '@/pages/Content/Wallet';
import {
    popupIsOpenAtom,
    IsLoginAtom,
} from '@/components/ContentLayout/LoginPopUp';
import depositImg from '@/assets/images/deposit-icon-hover.svg';
import withdrawImg from '@/assets/images/withdraw-icon-hover.svg';
// import creaditImg from '@/assets/images/credit-icon-hover.svg';
import historyImg from '@/assets/images/history-icon-hover.svg';

const index: React.FC = () => {
    const { t } = useTranslation();
    const sidebarIsOpen = useAtomValue(sidebarIsOpenAtom);
    const isLogin = useAtomValue(IsLoginAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const setSelectedSection = useSetAtom(selectedSectionAtom);
    const Navigate = useNavigate();

    const handleClick = (data: string) => {
        setSelectedSection(data);
        if (isLogin) {
            Navigate('/wallet');
        } else {
            setPopupIsOpen(true);
        }
    };
    return (
        <ul className=" w-full bg-[#2e3135] text-white rounded-md py-4 px-4">
            <li className="py-4 border-0 border-b-[1px] border-solid border-[#485160] ">
                <span className="flex items-center gap-x-3.5 text-sm hover:text-[#78D39D] text-white dark:bg-gray-900 dark:text-white">
                    <img src={depositImg as unknown as string} alt="" />
                    <span
                        className={`${
                            sidebarIsOpen ? 'block' : 'hidden'
                        } text-lg font-semibold tracking-wider cursor-pointer`}
                        onClick={() => {
                            handleClick('Deposit');
                        }}
                    >
                        {t('Deposit')}
                    </span>
                </span>
            </li>

            <li className="py-4 border-0 border-b-[1px] border-solid border-[#485160]">
                <span className="flex items-center gap-x-3.5 text-sm  text-white hover:text-[#78D39D] dark:bg-gray-900 dark:text-white">
                    <img src={withdrawImg as unknown as string} alt="" />
                    <span
                        className={`${
                            sidebarIsOpen ? 'block' : 'hidden'
                        } text-lg font-semibold tracking-wider cursor-pointer`}
                        onClick={() => {
                            handleClick('Withdraw');
                        }}
                    >
                        {t('Withdraw')}
                    </span>
                </span>
            </li>

            {/* <li className="py-4 border-0 border-b-[1px] border-solid border-[#485160]">
                <span className="flex items-center gap-x-3.5 text-sm hover:text-[#78D39D] text-white dark:bg-gray-900 dark:text-white">
                    <img src={creaditImg as unknown as string} alt="" />
                    <span
                        className={`${
                            sidebarIsOpen ? 'block' : 'hidden'
                        } text-lg font-semibold tracking-wider cursor-pointer`}
                        onClick={() => {
                            handleClick('MyBalance');
                        }}
                    >
                        {t('Credit Transfer')}
                    </span>
                </span>
            </li> */}

            <li className="py-4 ">
                <span className="flex items-center gap-x-3.5 hover:text-[#78D39D] text-sm text-white dark:bg-gray-900 dark:text-white">
                    <img src={historyImg as unknown as string} alt="" />
                    <span
                        className={`${
                            sidebarIsOpen ? 'block' : 'hidden'
                        } text-lg font-semibold tracking-wider cursor-pointer`}
                        onClick={() => {
                            handleClick('RolloverHistory');
                        }}
                    >
                        {t('Rollover')}
                    </span>
                </span>
            </li>
        </ul>
    );
};
export default index;
