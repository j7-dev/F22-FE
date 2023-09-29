import React from 'react';
import { useSetAtom } from 'jotai';
// import { useUserAPI } from '@/hooks/useUserAPI';
import { useTranslation } from 'react-i18next';
import { selectedSectionAtom } from '@/pages/Content/Wallet';
import { useGetIdentity } from '@refinedev/core';
import { TUser } from '@/types';

const index: React.FC = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetIdentity<TUser>();

    const setSelectedSection = useSetAtom(selectedSectionAtom);
    if (isLoading) return <div>loading...</div>;
    const userName = data?.username || 'userName';
    const vip = data?.vip?.label || '';

    return (
        <div className="userInfo w-full flex justify-end">
            <span className="userName flex text-sm font-bold text-[#2B3240] p-2.5">
                {userName}
                <span className={`${vip ? 'block' : 'hidden'} userVip text-sm font-bold text-[#f9a318] pl-2.5`}>{vip && vip}</span>
            </span>
            <div
                onClick={() => {
                    setSelectedSection('siteNotify');
                }}
                className="h-10 gap-2.5 rounded-lg flex justify-between items-center px-2 hover:bg-[#F3F3F4] cursor-pointer"
            >
                <div className="rewardInfo flex  justify-start items-center gap-2.5">
                    <span className="text-sm font-bold text-[#2B3240]">{t('站内信쪽지')}</span>
                </div>
                <span className="rewardNumber flex justify-center items-center min-w-[36px] h-[27px] bg-[#DC3545] rounded-lg text-sm font-bold text-white">0</span>
            </div>
        </div>
    );
};

export default index;
