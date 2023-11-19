import SimpleAmount from '@/components/Admin/SimpleAmount';
import { useGetBalance } from '@/hooks/resources/useGerBalance';
import { Spin } from 'antd';
import userBalanceIcon from '@/assets/images/topBar/userBalance.svg';
import userBonusIcon from '@/assets/images/topBar/userBonus.svg';
import { useGetSiteSetting } from '@/hooks';
/**
 * 渲染Balance 餘額與Rolling Point洗碼的組件
 * @param userId
 * @returns 包含Balance 餘額與Rolling Point
 */
export const BalanceAmount = ({ userId }: { userId: number }) => {
    //取得預設幣別
    const { default_currency } = useGetSiteSetting();
    const { data, isLoading } = useGetBalance({ userId: userId });

    if (isLoading) return <Spin />;
    const balance = data?.data?.filter((item) => item.currency === default_currency && item.amount_type === 'CASH')[0].amount || 0;
    const turnoverBonus = data?.data?.filter((item) => item.currency === default_currency && item.amount_type === 'TURNOVER_BONUS')[0].amount || 0;

    return (
        <>
            <div className="userBalance flex gap-2 items-center ">
                <img src={userBalanceIcon} alt="" />
                <span>
                    <SimpleAmount amount={Number(balance)} />
                </span>
            </div>
            <div className="userBonus flex gap-2 items-center ">
                <img src={userBonusIcon} alt="" />
                <span>
                    <SimpleAmount amount={Number(turnoverBonus)} />
                </span>
            </div>
        </>
    );
};
