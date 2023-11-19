import React from 'react';
import { TUser } from '@/types';
import { useTranslation } from 'react-i18next';
import userBalanceIcon from '@/assets/images/topBar/userBalance.svg';
import userBonusIcon from '@/assets/images/topBar/userBonus.svg';
import { useVip } from '@/hooks/resources/useVip';
import vipNextIcon from '@/assets/images/newMyPage/vipNextIcon.svg';
import ConvertBtn from './ConvertBtn';
import { AiFillStar } from 'react-icons/ai';
import { useGetSiteSetting } from '@/hooks';
import Amount from '@/components/Admin/Amount';

const index: React.FC<{ userInfo?: TUser }> = ({ userInfo }) => {
    const { t } = useTranslation();

    const { default_currency } = useGetSiteSetting();

    //取得用戶資料
    const balance = userInfo?.balances !== undefined ? userInfo?.balances.filter((item) => item.currency === default_currency && item.amount_type === 'CASH')[0].amount || 0 : 0;
    const turnoverBonus = userInfo?.balances !== undefined ? userInfo?.balances.filter((item) => item.currency === default_currency && item.amount_type === 'TURNOVER_BONUS')[0].amount || 0 : 0;
    const userName = userInfo?.username || 'userName';
    const userPhone = userInfo?.phone || 'No phone';
    //取得VIP資料
    const vipData = useVip();
    const { nextVip, diff } = vipData || { nextVip: null, prevVip: null, diff: null };
    // console.log('🚀 ~ diff:', diff);
    // console.log('🚀 ~ nextVip:', nextVip);

    //還差多少升級
    const depositUpgrade = diff?.deposit_upgrade_threshold || 0;
    const validUpgrade = diff?.valid_bet_amount_upgrade_threshold || 0;

    //升級門檻
    const nextDepositUpgrade = nextVip?.deposit_upgrade_threshold || 0;
    const nextValidUpgrade = nextVip?.valid_bet_amount_upgrade_threshold || 0;

    //當前積分
    //解存款為負數的BUG，如果小於0就設為0，否則相減顯示當前積分
    const currentDeposit = nextDepositUpgrade - depositUpgrade < 0 ? 0 : nextDepositUpgrade - depositUpgrade;
    const currentValid = nextValidUpgrade - validUpgrade;

    //百分比
    const depositPercent = (currentDeposit / nextDepositUpgrade) * 100 || 0;
    const validPercent = (currentValid / nextValidUpgrade) * 100 || 0;

    return (
        <div className="userInfo bg-white rounded-2xl grid grid-cols-2 gap-2.5 pb-3 md:gap-[30px] md:p-[30px] md:grid-cols-3 shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
            <div className="userName h-fit flex flex-col gap-4 col-span-2 md:col-span-1 md:p-0 px-4 pt-4">
                <div className="flex flex-col md:flex-row md:items-end text-3xl font-bold text-[#5932EA]">
                    {userName}
                    <span className="text-sm text-[#ACACAC] font-normal md:ml-2">{userPhone}</span>
                </div>
                {/* VIP進度條 */}
                <div className="relative p-0.5 w-full h-[22px] md:h-[34px] bg-gradient-to-r from-[#9680EA33] to-[#BAA8FF33] rounded-full">
                    <div className="relative w-full h-full">
                        {/* 當前等級 */}
                        <div className="currentVip absolute z-10 left-0 h-full flex justify-center items-center aspect-square bg-[#9680EA] rounded-full">
                            <span className="text-white md:text-base text-xs font-semibold md:leading-[30px]">{nextVip?.order}</span>
                        </div>
                        <div className="progressBar w-full h-full rounded-full overflow-hidden flex flex-col gap-0.5">
                            {/* 有效投注進度條 */}
                            <div className="validBetProgress h-1/2 relative">
                                <div style={{ width: `${validPercent}%` }} className="h-full bg-gradient-to-r from-[#D4C9FF] to-[#9680EA] rounded-tr-full" />
                                <div className="absolute top-0 left-12 z-10 whitespace-nowrap h-full flex items-center justify-start gap-1">
                                    <AiFillStar color="#FDD92A" size={12} />
                                    <span className="drop-shadow-[1px_1px_1px_#00000033] text-[6px] md:text-[10px] font-semibold text-white">{`${currentValid}/${nextValidUpgrade}`}</span>
                                </div>
                            </div>
                            {/* 存款進度條 */}
                            <div className="depositProgress h-1/2 relative">
                                <div style={{ width: `${depositPercent}%` }} className="h-full bg-gradient-to-r from-[#D4C9FF] to-[#9680EA] rounded-br-full" />
                                <div className="absolute top-0 left-12 z-10 whitespace-nowrap h-full flex items-center justify-start gap-1">
                                    <AiFillStar color="#FDD92A" size={12} />
                                    <span className="drop-shadow-[1px_1px_1px_#00000033] text-[6px] md:text-[10px] font-semibold text-white">{`${currentDeposit}/${nextDepositUpgrade}`}</span>
                                </div>
                            </div>
                        </div>
                        {/* 下一等級 */}
                        <div className="nextVip absolute z-10 right-0 bottom-0 h-full flex justify-center items-center aspect-square bg-[#FFB930] rounded-full">
                            <div className="relative">
                                <img src={vipNextIcon} alt="" className="absolute -top-2 md:-top-3 left-1/2 -translate-x-2/4 w-4" />
                                <span className="text-white md:text-base text-xs font-semibold md:leading-[30px]">{(nextVip?.order as number) + 1 || 'MAX'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="userBalance h-fit col-span-1 whitespace-nowrap  flex gap-5 items-center pl-2 md:p-0 ">
                <div className="p-3 md:p-6 bg-gradient-to-r from-[#E7C9FF00] to-[#D4C9FFA3] rounded-full">
                    <img src={userBalanceIcon} alt="" className="aspect-square w-5 md:w-10 h-full" />
                </div>
                <div className="">
                    <div className="text-[#ACACAC] text-[8px] md:text-sm font-normal">{t('Total Balance')}</div>
                    {/*TODO 改成Admin 裡面的Account組件 */}
                    <div className="text-[#333333] text-base md:text-2xl font-semibold">
                        <Amount amount={Number(balance)} symbol />
                    </div>
                </div>
            </div>
            <div className="userRolling h-fit col-span-1 whitespace-nowrap flex gap-5 items-center pr-2 md:p-0">
                <div className="p-3 md:p-6 bg-gradient-to-r from-[#E7C9FF00] to-[#D4C9FFA3] rounded-full">
                    <img src={userBonusIcon} alt="" className="aspect-square w-5 md:w-10 h-full" />
                </div>
                <div className="">
                    <div className="text-[#ACACAC] text-[8px] md:text-sm font-normal">{t('Rolling Point')}</div>
                    <div className="text-[#333333] text-base md:text-2xl font-semibold">
                        <Amount amount={Math.floor(Number(turnoverBonus))} symbol />
                    </div>
                    <ConvertBtn />
                </div>
            </div>
        </div>
    );
};

export default index;
