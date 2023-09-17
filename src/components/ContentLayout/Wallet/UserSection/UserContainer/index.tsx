import React from 'react';
import { useTranslation } from 'react-i18next';
import refreshIcon from '@/assets/images/refresh-icon.svg';
import { useUserAPI } from '../../../../../hooks/useUserAPI';

const UserContainer: React.FC = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useUserAPI(); //TODO 同時還會在UserInfo中用到，怎麼讓他不要一直重複發送請求
    // console.log(data);
    if (isLoading) return <div>loading...</div>;
    const balance = data?.data.balances[0]?.amount || 0;
    const userName = data?.data?.username || 'userName';
    const vip = data?.data.vip?.label || '';
    // console.log('data', data);
    return (
        <div className="userContainer flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
                <span className="userName flex text-sm font-bold text-[#2B3240] p-2.5">
                    <span className={`${vip ? 'block' : 'hidden'} userVip text-sm font-bold text-[#f9a318] pr-2.5`}>{vip && vip}</span>
                    {userName}
                </span>
                <div className="w-10 h-10 bg-[#F3F3F4] rounded-lg flex justify-center items-center hover:bg-[#e5e5e5] cursor-pointer">
                    <img src={refreshIcon as unknown as string} alt="" />
                </div>
            </div>
            <div className="balanceContainer h-10 bg-[#F3F3F4] rounded-lg flex justify-between items-center px-4 hover:bg-[#e5e5e5] cursor-pointer">
                <span className="text-sm font-bold text-[#2b324080]">{t('Total Balance')}</span>
                <span className="text-sm font-bold text-[#2B3240]">{`₩ ${balance && balance}`}</span>
            </div>
            {/* <div className="balanceContainer h-10 bg-[#F3F3F4] rounded-lg flex justify-between items-center px-4 hover:bg-[#e5e5e5] cursor-pointer">
                <span className="text-sm font-bold text-[#2b324080]">{t('Bonus Point')}</span>
                <span className="text-sm font-bold text-[#2B3240]">0</span>
            </div> */}
        </div>
    );
};
export default UserContainer;
