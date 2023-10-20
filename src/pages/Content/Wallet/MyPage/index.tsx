import React from 'react';
import { TMe } from '@/types';
import UserInfo from '../UserInfo';
import BankCard from '../BankCard';
import ChangPas from '../ChangPas';
import NoteBox from '../NoteBox';
import CashHistory from '../CashHistory';
import CouponHistory from '../CouponHistory';
const index: React.FC<{ data: TMe }> = ({ data }) => {
    return (
        <div className="myPage relative flex flex-col gap-2 sm:gap-6 ">
            <UserInfo userInfo={data} />
            <div className="grid grid-cols-2 gap-2 sm:gap-6 sm:grid-cols-4">
                <div className="col-span-1">
                    <BankCard bankInfo={data?.bank_account} />
                </div>
                <div className="col-span-1">
                    <ChangPas />
                </div>
                <div className="col-span-2 sm:col-span-2">
                    <NoteBox pageSize={3} pagination={false} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-6 sm:grid-cols-1">
                <div className="col-span-1">
                    <CashHistory userID={data?.id as number} pageSize={3} />
                </div>
                <div className="col-span-1">
                    <CouponHistory userID={data?.id as number} pageSize={3} />
                </div>
            </div>
        </div>
    );
};

export default index;
