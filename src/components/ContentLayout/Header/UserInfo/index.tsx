import React from 'react';
import { useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { useGetIdentity } from '@refinedev/core';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { TMe } from '@/types';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import userDepositIcon from '@/assets/images/topBar/userDeposit.svg';
import { BalanceAmount } from './Balance';

const index: React.FC = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetIdentity<TMe>();
    const userName = data?.username || 'userName';
    const vip = (data?.vip?.order as number) + 1 || 0;
    // const balance = data?.balances !== undefined ? data?.balances.filter((item) => item.currency === 'KRW' && item.amount_type === 'CASH')[0].amount || 0 : 0;
    // const turnoverBonus = data?.balances !== undefined ? data?.balances.filter((item) => item.currency === 'KRW' && item.amount_type === 'TURNOVER_BONUS')[0].amount || 0 : 0;
    const navigate = useNavigate();
    const setSection = useSetAtom(activeMenuAtom);

    const handleNavigate = (goTo: string) => () => {
        setSection(goTo);
        navigate('/wallet');
    };

    // useEffect(() => {
    //     // 每5秒重新取得用戶資料
    //     const timer = setInterval(() => {
    //         queryClient.invalidateQueries(['getUserIdentity']);
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <Spin spinning={isLoading}>
            <div className="userInfo w-full flex justify-end text-base leading-4 font-bold gap-2.5">
                <div className="userName flex flex-col justify-center items-end">
                    <span className="userVip text-[#828282] ">{vip ? `LV.${vip}` : ''}</span>
                    <span className=" text-[#5932EA] whitespace-nowrap ">{userName}</span>
                </div>
                <div className="userBalancesWrap flex justify-center items-center gap-2 px-2 py-1.5 rounded-2xl bg-[#ECE8FA]">
                    <BalanceAmount userId={data?.id || 0} />
                    <div className="divider h-[17px] border-r border-0 border-solid border-[#9680EA] bg-[#9680EA] " />
                    <div onClick={handleNavigate('deposit')} className="userDeposit cursor-pointer flex gap-2 items-center px-3 py-1 bg-white rounded-2xl hover:text-[#828282]">
                        <img src={userDepositIcon} alt="" />
                        <span className="whitespace-nowrap">{t('Deposit')}</span>
                    </div>
                    <div onClick={handleNavigate('withdraw')} className="userWithdraw cursor-pointer flex gap-2 items-center px-3 py-1 bg-white rounded-2xl hover:text-[#828282]">
                        <img src={userDepositIcon} alt="" />
                        <span className="whitespace-nowrap">{t('Withdraw')}</span>
                    </div>
                </div>
                {/* <div onClick={handleClickToSiteNotify} className="h-10 gap-2.5 relative rounded-lg flex justify-between items-center px-2 hover:bg-[#F3F3F4] cursor-pointer">
                <img src={noteBoxIcon} alt="" className="w-10" />
            <div className="rewardNumber absolute right-0 top-0 origin-center flex justify-center items-center min-w-[15px] min-h- bg-[#DC3545] px-1.5 aspect-square rounded-full text-xs font-bold text-white">{notifyCount}</div>
            </div> */}
            </div>
        </Spin>
    );
};

export default index;
