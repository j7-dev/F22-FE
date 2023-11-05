import { DateTime } from '@/components/PureComponents';
import ReferralLink from '@/components/general/ReferralLink';
import { TBankAccount, TVip } from '@/types';
import VipLink from '@/components/Admin/VipLink';
import { useBalanceColumns } from '@/hooks';
import BankAccount from '@/components/Admin/BankAccount';
import SimpleAmount from '@/components/Admin/SimpleAmount';

const useColumns = () => {
    const allBalances = useBalanceColumns();

    const infoLeftColumns = [
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
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            key: 'monthDp',
            title: 'Deposit in recent 30 days',
            dataIndex: 'monthDp',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            key: 'totalDp',
            title: 'Total Deposit',
            dataIndex: 'totalDp',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            key: 'dayWd',
            title: 'Withdraw in today',
            dataIndex: 'dayWd',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            key: 'monthWd',
            title: 'Withdraw in recent 30 days',
            dataIndex: 'monthWd',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            key: 'totalWd',
            title: 'Total Withdraw',
            dataIndex: 'totalWd',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            key: 'dayDpWd',
            title: 'DP-WD in today',
            dataIndex: 'dayDpWd',
            render: (_: undefined, record: any) => <SimpleAmount amount={record?.dayDp - record?.dayWd} />,
        },
        {
            key: 'monthDpWd',
            title: 'DP-WD in recent 30 days',
            dataIndex: 'monthDpWd',
            render: (_: undefined, record: any) => <SimpleAmount amount={record?.monthDp - record?.monthWd} />,
        },
        {
            key: 'totalDpWd',
            title: 'Total DP-WD',
            dataIndex: 'totalDpWd',
            render: (_: undefined, record: any) => <SimpleAmount amount={record?.totalDp - record?.totalWd} />,
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
            key: 'deposit_account_for_user',
            title: 'Deposit Account for User',
            dataIndex: 'deposit_account_for_user',
            render: (deposit_account_for_user: TBankAccount | null) => <BankAccount bank_account={deposit_account_for_user} display="text" copyable />,
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
            render: (bank_account: TBankAccount | null) => <BankAccount bank_account={bank_account} display="text" />,
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
