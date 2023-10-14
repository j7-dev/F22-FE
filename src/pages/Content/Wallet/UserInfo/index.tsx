import React from 'react';
import { TUser } from '@/types';
import { useTranslation } from 'react-i18next';
import userBalanceIcon from '@/assets/images/topBar/userBalance.svg';
import userBonusIcon from '@/assets/images/topBar/userBonus.svg';

const index: React.FC<{ userInfo?: TUser }> = ({ userInfo }) => {
    const { t } = useTranslation();

    const balance = userInfo?.balances !== undefined ? userInfo?.balances.filter((item) => item.currency === 'KRW' && item.amount_type === 'CASH')[0].amount || 0 : 0;
    const turnoverBonus = userInfo?.balances !== undefined ? userInfo?.balances.filter((item) => item.currency === 'KRW' && item.amount_type === 'TURNOVER_BONUS')[0].amount || 0 : 0;

    const userName = userInfo?.username || 'userName';
    const userPhone = userInfo?.phone || 'userPhone';
    // const vip = userInfo?.vip?.label || '';
    return (
        <div className="userInfo sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl grid grid-cols-4 gap-6 p-[30px]">
            <div className="userName col-span-2 flex flex-col gap-4">
                <div className="text-3xl font-bold text-[#5932EA]">
                    {userName}
                    <span className="text-sm text-[#ACACAC] font-normal ml-2">{userPhone}</span>
                </div>
                <div className="w-5/6 h-6 bg-gradient-to-r from-[#9680EA33] to-[#BAA8FF33] rounded-full">
                    <div className="bg-gradient-to-r from-[#9680EA] to-[#D4C9FF] h-full rounded-full w-[45%]"></div>
                </div>
            </div>
            <div className="userBalance h-full col-span-1 border-0 border-l-2 border-solid border-[#F0F0F0] px-6 flex gap-5 items-center">
                <div className="aspect-square p-6 bg-gradient-to-r from-[#E7C9FF00] to-[#D4C9FFA3] rounded-full">
                    <img src={userBalanceIcon} alt="" className="w-full h-full" />
                </div>
                <div className="">
                    <div className="text-[#ACACAC] text-sm font-normal">{t('Total Balance')}</div>
                    <div className="text-[#333333] text-3xl font-semibold">${balance}</div>
                </div>
            </div>
            <div className="userRolling h-full col-span-1 border-0 border-l-2 border-solid border-[#F0F0F0] px-6 flex gap-5 items-center">
                <div className="aspect-square p-6 bg-gradient-to-r from-[#E7C9FF00] to-[#D4C9FFA3] rounded-full">
                    <img src={userBonusIcon} alt="" className="w-full h-full" />
                </div>
                <div className="">
                    <div className="text-[#ACACAC] text-sm font-normal">{t('Rolling Point')}</div>
                    <div className="text-[#333333] text-3xl font-semibold">${turnoverBonus}</div>
                </div>
            </div>
        </div>
    );
};

export default index;
