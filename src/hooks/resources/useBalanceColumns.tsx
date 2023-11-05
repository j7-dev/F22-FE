import { TBalance } from '@/types';
import { useGetSiteSetting } from '@/hooks';
import SimpleAmount from '@/components/Admin/SimpleAmount';

/**
 * 取得 Balance Column[]
 * 可以用於 antd Table
 * 原本 Balances 是一個 TBalance[]，這邊將其轉換成 Column[]
 */
export const useBalanceColumns = () => {
    const { support_amount_types, support_currencies } = useGetSiteSetting();
    const allBalances = support_currencies
        .map((currency) => {
            const amount_type_balances = support_amount_types.map((amount_type) => {
                return {
                    with: 300,
                    title: `${currency.toLowerCase()} ${amount_type.toLowerCase()} balance`,
                    dataIndex: `balances`,
                    key: `balances-${currency}-${amount_type}`,
                    render: (balances: TBalance[]) => {
                        const balance = (balances || []).find((b) => b.currency === currency && b.amount_type === amount_type);
                        return <SimpleAmount amount={Number(balance?.amount)} />;
                    },
                };
            });

            return amount_type_balances;
        })
        .flat();

    return allBalances;
};
