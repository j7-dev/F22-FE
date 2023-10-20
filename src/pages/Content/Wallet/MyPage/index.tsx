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
        <div className="myPage relative flex flex-col gap-6 ">
            <UserInfo userInfo={data} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                <div className="col-span-1">
                    <BankCard bankInfo={data?.bank_account} />
                </div>
                <div className="col-span-1">
                    <ChangPas />
                </div>
                <div className="col-span-1 sm:col-span-2">
                    <NoteBox pageSize={3} pagination={false} />
                </div>
            </div>
            <CashHistory userID={data?.id as number} pageSize={3} />
            <CouponHistory userID={data?.id as number} pageSize={3} />
        </div>
    );
};

export default index;
