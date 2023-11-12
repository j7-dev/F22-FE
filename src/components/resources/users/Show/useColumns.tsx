import { DateTime } from '@/components/PureComponents';
import ReferralLink from '@/components/general/ReferralLink';
import { TBankAccount, TVip, TMe } from '@/types';
import VipLink from '@/components/Admin/VipLink';
import { useBalanceColumns } from '@/hooks';
import BankAccount from '@/components/Admin/BankAccount';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import { useTranslation } from 'react-i18next';
import { useGetIdentity } from '@refinedev/core';

const useColumns = () => {
    const allBalances = useBalanceColumns();
    const { t } = useTranslation();
    const { data: identity } = useGetIdentity<TMe>();
    const role = identity?.role?.type || '';

    const infoLeftColumns = [
        {
            key: 'username',
            title: t('Username'),
            dataIndex: 'username',
        },
        {
            key: 'vip',
            title: t('vip'),
            dataIndex: 'vip',
            render: (vip: TVip) => <VipLink vip={vip} />,
        },
        {
            key: 'dayDp',
            title: t('Deposit in today'),
            dataIndex: 'dayDp',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            key: 'monthDp',
            title: t('Deposit in recent 30 days'),
            dataIndex: 'monthDp',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            key: 'totalDp',
            title: t('Total Deposit'),
            dataIndex: 'totalDp',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            key: 'dayWd',
            title: t('Withdraw in today'),
            dataIndex: 'dayWd',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            key: 'monthWd',
            title: t('Withdraw in recent 30 days'),
            dataIndex: 'monthWd',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            key: 'totalWd',
            title: t('Total Withdraw'),
            dataIndex: 'totalWd',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            key: 'dayDpWd',
            title: t('DP-WD in today'),
            dataIndex: 'dayDpWd',
            render: (_: undefined, record: any) => <SimpleAmount amount={record?.dayDp - record?.dayWd} />,
        },
        {
            key: 'monthDpWd',
            title: t('DP-WD in recent 30 days'),
            dataIndex: 'monthDpWd',
            render: (_: undefined, record: any) => <SimpleAmount amount={record?.monthDp - record?.monthWd} />,
        },
        {
            key: 'totalDpWd',
            title: t('Total DP-WD'),
            dataIndex: 'totalDpWd',
            render: (_: undefined, record: any) => <SimpleAmount amount={record?.totalDp - record?.totalWd} />,
        },
        {
            key: 'referralLink',
            title: t('Referral Link'),
            dataIndex: 'username',
            render: (username: string) => <ReferralLink uuid={username} />,
        },
    ];

    const bank_account =
        role === 'admin'
            ? [
                  {
                      key: 'bank_account',
                      title: t('Bank Account'),
                      dataIndex: 'bank_account',
                      render: (b: TBankAccount | null) => <BankAccount bank_account={b} display="text" />,
                  },
              ]
            : [];

    const infoRightColumns = [
        ...allBalances,
        {
            key: 'display_name',
            title: t('Display Name'),
            dataIndex: 'display_name',
        },
        {
            key: 'phone',
            title: t('Phone'),
            dataIndex: 'phone',
        },
        {
            key: 'allow_payments',
            title: t('Allow Payments'),
            dataIndex: 'allow_payments',
            render: (allow_payments: string[] | null) => (allow_payments || []).join(', '),
        },
        {
            key: 'deposit_account_for_user',
            title: t('Deposit Account for User'),
            dataIndex: 'deposit_account_for_user',
            render: (deposit_account_for_user: TBankAccount | null) => <BankAccount bank_account={deposit_account_for_user} display="text" copyable />,
        },
        {
            key: 'allow_game_providers',
            title: t('Allow Game Providers'),
            dataIndex: 'allow_game_providers',
            render: (allow_game_providers: string[] | null) => (allow_game_providers || []).join(', '),
        },
        ...bank_account,
        {
            key: 'createdAt',
            title: t('Created At'),
            dataIndex: 'createdAt',
            render: (createdAt: string) => <DateTime value={createdAt} />,
        },
        {
            key: 'updatedAt',
            title: t('Updated At'),
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
