import { DateTime } from '@/components/PureComponents';
import ReferralLink from '@/components/general/ReferralLink';
import { TBankAccount, TVip } from '@/types';
import VipLink from '@/components/Admin/VipLink';
import Amount from '@/components/Admin/Amount';
import { useGetSiteSetting, useBalanceColumns } from '@/hooks';
import BankAccount from '@/components/Admin/BankAccount';

const useColumns = () => {
    const { default_currency } = useGetSiteSetting();
    const allBalances = useBalanceColumns();

    const infoLeftColumns = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
        },
        {
            key: 'username',
            title: 'Username',
            dataIndex: 'username',
        },
        {
            key: 'vip',
            title: 'vip',
            dataIndex: 'vip',
            render: (vip: TVip) => <VipLink vip={vip} />,
        },
        {
            key: 'dayDp',
            title: 'Deposit in today',
            dataIndex: 'dayDp',
            render: (v: number) => <Amount amount={v} currency={default_currency} symbol />,
        },
        {
            key: 'monthDp',
            title: 'Deposit in recent 30 days',
            dataIndex: 'monthDp',
            render: (v: number) => <Amount amount={v} currency={default_currency} symbol />,
        },
        {
            key: 'totalDp',
            title: 'Total Deposit',
            dataIndex: 'totalDp',
            render: (v: number) => <Amount amount={v} currency={default_currency} symbol />,
        },
        {
            key: 'dayWd',
            title: 'Withdraw in today',
            dataIndex: 'dayWd',
            render: (v: number) => <Amount amount={v} currency={default_currency} symbol />,
        },
        {
            key: 'monthWd',
            title: 'Withdraw in recent 30 days',
            dataIndex: 'monthWd',
            render: (v: number) => <Amount amount={v} currency={default_currency} symbol />,
        },
        {
            key: 'totalWd',
            title: 'Total Withdraw',
            dataIndex: 'totalWd',
            render: (v: number) => <Amount amount={v} currency={default_currency} symbol />,
        },
        {
            key: 'dayDpWd',
            title: 'DP-WD in today',
            dataIndex: 'dayDpWd',
            render: (_: undefined, record: any) => <Amount amount={record?.dayDp - record?.dayWd} currency={default_currency} symbol />,
        },
        {
            key: 'monthDpWd',
            title: 'DP-WD in recent 30 days',
            dataIndex: 'monthDpWd',
            render: (_: undefined, record: any) => <Amount amount={record?.monthDp - record?.monthWd} currency={default_currency} symbol />,
        },
        {
            key: 'totalDpWd',
            title: 'Total DP-WD',
            dataIndex: 'totalDpWd',
            render: (_: undefined, record: any) => <Amount amount={record?.totalDp - record?.totalWd} currency={default_currency} symbol />,
        },
        {
            key: 'referralLink',
            title: 'Referral Link',
            dataIndex: 'uuid',
            render: (uuid: string) => <ReferralLink uuid={uuid} />,
        },
    ];

    const infoRightColumns = [
        ...allBalances,
        {
            key: 'display_name',
            title: 'Display Name',
            dataIndex: 'display_name',
        },
        {
            key: 'phone',
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            key: 'uuid',
            title: 'UUID',
            dataIndex: 'uuid',
        },

        {
            key: 'allow_payments',
            title: 'Allow Payments',
            dataIndex: 'allow_payments',
            render: (allow_payments: string[] | null) => (allow_payments || []).join(', '),
        },
        {
            key: 'allow_game_providers',
            title: 'Allow Game Providers',
            dataIndex: 'allow_game_providers',
            render: (allow_game_providers: string[] | null) => (allow_game_providers || []).join(', '),
        },
        {
            key: 'bank_account',
            title: 'Bank Account',
            dataIndex: 'bank_account',
            render: (bank_account: TBankAccount | null) => <BankAccount bank_account={bank_account} />,
        },
        {
            key: 'createdAt',
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (createdAt: string) => <DateTime value={createdAt} />,
        },
        {
            key: 'updatedAt',
            title: 'Updated At',
            dataIndex: 'updatedAt',
            render: (updatedAt: string) => <DateTime value={updatedAt} />,
        },
    ];

    return {
        infoLeftColumns,
        infoRightColumns,
    };
};

export default useColumns;
