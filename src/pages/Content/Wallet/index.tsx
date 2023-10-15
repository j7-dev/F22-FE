import React from 'react';
import { atom } from 'jotai';
import { Authenticated } from './Authenticated';
import { useGetIdentity } from '@refinedev/core';
import { TUser } from '@/types';
import UserInfo from './UserInfo';
import BankCard from './BankCard';
import ChangPas from './ChangPas';
import NoteBox from './NoteBox';
import CashHistory from './CashHistory';
import Withdraw from './Withdraw';
import Deposit from './Deposit';
// import { useTranslation } from 'react-i18next';
//FIXME 未來想法是改成useState在組件內部切換，取得activeMenuAtom來做判斷就好，減少ATOM的使用
export const selectedSectionAtom = atom('siteNotify');

const Wallet: React.FC = () => {
    // const { t } = useTranslation();
    const { data, isLoading } = useGetIdentity<TUser>();
    // console.log('🚀 ~ data:', data);

    if (isLoading) return <div>loading...</div>;
    return (
        <Authenticated>
            <div className="myPage relative px-4 my-4 flex flex-col gap-6 sm:my-9 sm:w-full">
                <UserInfo userInfo={data} />
                <div className="userSection2 grid grid-cols-1 gap-6 sm:grid-cols-4 ">
                    <div className="col-span-1">
                        <BankCard bankInfo={data?.bank_account} />
                    </div>
                    <div className="col-span-1">
                        <ChangPas />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <NoteBox />
                    </div>
                </div>
                <CashHistory userID={data?.id as number} />

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <Deposit />
                    </div>
                    <div>
                        <Withdraw />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};
export default Wallet;
