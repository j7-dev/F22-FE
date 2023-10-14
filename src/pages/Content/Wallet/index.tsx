import React from 'react';
import { atom } from 'jotai';
import { Authenticated } from './Authenticated';
import { useGetIdentity } from '@refinedev/core';
import { TUser } from '@/types';
import UserInfo from './UserInfo';
import BankCard from './BankCard';
import { useTranslation } from 'react-i18next';

export const selectedSectionAtom = atom('siteNotify');

const Wallet: React.FC = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetIdentity<TUser>();

    if (isLoading) return <div>loading...</div>;
    return (
        <Authenticated>
            <div className="myPage relative sm:w-full flex flex-col gap-6 mt-9 px-4">
                <UserInfo userInfo={data} />
                <div className="userSection2 grid grid-cols-4 gap-6">
                    <div className="h-full px-[32px] py-[42px] userBank col-span-1 flex flex-col gap-4 rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] ">
                        <span className="text-black font-bold text-2xl">{t('Bank Information')}</span>
                        <BankCard />
                    </div>
                    <div className="h-20 userPas col-span-1 px-6 flex gap-5 items-center sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl"></div>
                    <div className="h-20 userNoteBox col-span-2 px-6 flex gap-5 items-center sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl"></div>
                </div>
            </div>
        </Authenticated>
    );
};
export default Wallet;
