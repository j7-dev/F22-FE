import React from 'react';
import { useUserAPI } from '@/hooks/useUserAPI';
import { useTranslation } from 'react-i18next';

const index: React.FC = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useUserAPI(); //TODO 同時還會在UserContainer中用到，怎麼讓他不要一直重複發送請求
    // console.log(data);
    if (isLoading) return <div>loading...</div>;
    // const balance = data?.data.balances[0]?.amount || 0;
    const userName = data?.data?.username || 'userName';
    const vip = data?.data.vip?.label || '';

    return (
        <div className="w-full flex justify-end">
            <span className="userName flex text-sm font-bold text-[#2B3240] p-2.5">
                {userName}
                <span className={`${vip ? 'block' : 'hidden'} userVip text-sm font-bold text-[#f9a318] pl-2.5`}>{vip && vip}</span>
            </span>
            <div className="h-10 gap-2.5  rounded-lg flex justify-between items-center px-2 hover:bg-[#F3F3F4] cursor-pointer">
                <div className="rewardInfo flex  justify-start items-center gap-2.5">
                    <span className="text-sm font-bold text-[#2B3240]">{t('站内信쪽지')}</span>
                </div>
                <span className="rewardNumber flex justify-center items-center min-w-[36px] h-[27px] bg-[#DC3545] rounded-lg text-sm font-bold text-white">0</span>
            </div>
        </div>
    );
};

export default index;
