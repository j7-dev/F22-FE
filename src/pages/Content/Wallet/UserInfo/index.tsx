import React from 'react';
import { TUser } from '@/types';
import { useTranslation } from 'react-i18next';
import userBalanceIcon from '@/assets/images/topBar/userBalance.svg';
import userBonusIcon from '@/assets/images/topBar/userBonus.svg';
import { useVip } from '@/hooks/resources/useVip';
import vipNextIcon from '@/assets/images/newMyPage/vipNextIcon.svg';
import ConvertBtn from './ConvertBtn';

const index: React.FC<{ userInfo?: TUser }> = ({ userInfo }) => {
    const { t } = useTranslation();
    //取得用戶資料
    const balance = userInfo?.balances !== undefined ? userInfo?.balances.filter((item) => item.currency === 'KRW' && item.amount_type === 'CASH')[0].amount || 0 : 0;
    const turnoverBonus = userInfo?.balances !== undefined ? userInfo?.balances.filter((item) => item.currency === 'KRW' && item.amount_type === 'TURNOVER_BONUS')[0].amount || 0 : 0;
    const userName = userInfo?.username || 'userName';
    const userPhone = userInfo?.phone || 'No phone';
    //取得VIP資料
    const vipData = useVip();
    const { nextVip, diff } = vipData || { nextVip: null, prevVip: null, diff: null };

    //還差多少升級
    const depositUpgrade = diff?.deposit_upgrade_threshold || 0;
    const validUpgrade = diff?.valid_bet_amount_upgrade_threshold || 0;

    //升級門檻
    const nextDepositUpgrade = nextVip?.deposit_upgrade_threshold || 0;
    const nextValidUpgrade = nextVip?.valid_bet_amount_upgrade_threshold || 0;

    //當前積分
    const currentDeposit = nextDepositUpgrade - depositUpgrade;
    const currentValid = nextValidUpgrade - validUpgrade;

    //百分比
    const depositPercent = (currentDeposit / nextDepositUpgrade) * 100 || 0;
    const validPercent = (currentValid / nextValidUpgrade) * 100 || 0;

    return (
        <div className="userInfo bg-white rounded-2xl grid grid-cols-2 gap-2.5 pb-3 sm:gap-6 sm:p-[30px] sm:grid-cols-4 shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
            <div className="userName flex flex-col gap-4 col-span-2 sm:col-span-2  sm:p-0 px-4 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-end text-3xl font-bold text-[#5932EA]">
                    {userName}
                    <span className="text-sm text-[#ACACAC] font-normal sm:ml-2">{userPhone}</span>
                </div>
                {/* VIP進度條 */}
                <div className="relative p-0.5 w-full h-12 bg-gradient-to-r from-[#9680EA33] to-[#BAA8FF33] rounded-full sm:w-5/6">
                    <div className="relative w-full h-full">
                        {/* 當前等級 */}
                        <div className="currentVip absolute z-10 left-0 h-full flex justify-center items-center aspect-square bg-[#9680EA] text-white text-base font-semibold rounded-full">
                            <div>{nextVip?.order}</div>
                        </div>
                        <div className="progressBar w-full h-full rounded-full overflow-hidden flex flex-col gap-0.5">
                            {/* 有效投注進度條 */}
                            <div className="validBetProgress h-1/2 relative">
                                <div style={{ width: `${validPercent}%` }} className="h-full bg-gradient-to-r from-[#D4C9FF] to-[#9680EA] rounded-tr-full" />
                                <div className="absolute top-0 left-1/2 -translate-x-2/4 whitespace-nowrap h-full text-[10px] font-semibold text-white">
                                    <span>{`${validUpgrade} points to next level ${currentValid}/${nextValidUpgrade}`}</span>
                                </div>
                            </div>
                            {/* 存款進度條 */}
                            <div className="depositProgress h-1/2 relative">
                                <div style={{ width: `${depositPercent}%` }} className="h-full bg-gradient-to-r from-[#D4C9FF] to-[#9680EA] rounded-br-full" />
                                <div className="absolute top-0 left-1/2 -translate-x-2/4 whitespace-nowrap h-full text-[10px] font-semibold text-white">
                                    <span>{`${depositUpgrade} points to next level ${currentDeposit}/${nextDepositUpgrade}`}</span>
                                </div>
                            </div>
                        </div>
                        {/* 下一等級 */}
                        <div className="nextVip absolute z-10 right-0 bottom-0 h-full flex justify-center items-center aspect-square bg-[#FDD92A] text-white text-base font-semibold rounded-full">
                            <div className="relative">
                                <img src={vipNextIcon} alt="" className="absolute -top-6 left-1/2 -translate-x-2/4 w-6" />
                                {(nextVip?.order as number) + 1}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="userBalance h-full col-span-1 border-0 border-solid border-[#F0F0F0] flex gap-5 items-center pl-2 sm:border-l-2 sm:px-6 sm:-ml-4">
                <div className="aspect-square p-3 sm:p-6 bg-gradient-to-r from-[#E7C9FF00] to-[#D4C9FFA3] rounded-full">
                    <img src={userBalanceIcon} alt="" className="w-5 sm:w-[30px] h-full" />
                </div>
                <div className="">
                    <div className="text-[#ACACAC] text-[8px] sm:text-sm font-normal">{t('Total Balance')}</div>
                    <div className="text-[#333333] text-base sm:text-3xl font-semibold">${balance}</div>
                </div>
            </div>
            <div className="userRolling h-full col-span-1 border-0 border-solid border-[#F0F0F0] flex gap-5 items-center pr-2 sm:border-l-2 sm:px-6">
                <div className="aspect-square p-3 sm:p-6 bg-gradient-to-r from-[#E7C9FF00] to-[#D4C9FFA3] rounded-full">
                    <img src={userBonusIcon} alt="" className="w-5 sm:w-[30px] h-full" />
                </div>
                <div className="">
                    <div className="text-[#ACACAC] text-[8px] sm:text-sm font-normal">{t('Rolling Point')}</div>
                    <div className="text-[#333333] text-base sm:text-3xl font-semibold">${turnoverBonus}</div>
                    <ConvertBtn rollingPoint={turnoverBonus as number} />
                </div>
            </div>
        </div>
    );
};

export default index;
