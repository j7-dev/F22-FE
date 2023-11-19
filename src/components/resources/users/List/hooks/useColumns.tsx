import { DataType } from '../types';
import { ShowButton, EditButton } from '@refinedev/antd';
import { BooleanIndicator, DateTime } from '@/components/PureComponents';
import { Link } from 'react-router-dom';
import { TUser, TVip, TMe } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import { useBalanceColumns } from '@/hooks';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import { useTranslation } from 'react-i18next';
import { useGetIdentity } from '@refinedev/core';

const useColumns = () => {
    const { t } = useTranslation();
    const allBalances = useBalanceColumns();
    const { data: identity } = useGetIdentity<TMe>();
    const role = identity?.role?.type || '';
    const phone =
        role === 'admin'
            ? [
                  {
                      title: t('phone'),
                      dataIndex: 'phone',
                      key: 'phone',
                  },
              ]
            : [];

    const columns: ColumnsType<DataType> = [
        {
            title: t('#'),
            dataIndex: 'id',
            key: 'id',
        },

        {
            title: t('Account'),
            dataIndex: 'username',
            key: 'Account',
        },
        {
            title: t('Real Name'),
            dataIndex: 'display_name',
            key: 'RealName',
        },
        {
            title: t('Agent'),
            dataIndex: 'agent',
            key: 'Agent',
            render: (agent: TUser) => (agent ? <Link to={`/refine/agent/show/${agent?.id}`}>{agent?.username}</Link> : '本部'),
        },
        {
            title: t('Referral'),
            dataIndex: 'referral',
            key: 'referral',
            render: (referral: TUser) => (referral ? <Link to={`/refine/agent/show/${referral?.id}`}>{referral?.username}</Link> : null),
        },
        ...allBalances,
        ...phone,
        {
            title: t('vip'),
            dataIndex: 'vip',
            key: 'vip',
            render: (vip: TVip) => <Link to="/refine/system-setting/vips">{vip?.label}</Link>,
        },
        {
            title: t('status'),
            dataIndex: 'confirmed',
            key: 'status',
            align: 'center',
            render: (confirmed: boolean) => (
                <BooleanIndicator
                    enabled={confirmed}
                    tooltipProps={{
                        title: confirmed ? 'Confirmed' : 'Not Confirmed',
                        enabled: true,
                    }}
                />
            ),
        },
        {
            title: t('Total Deposits'),
            dataIndex: 'totalDp',
            key: 'totalDp',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Total Withdrawal'),
            dataIndex: 'totalWd',
            key: 'totalWd',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('DP-WD'),
            dataIndex: 'DP-WD',
            key: 'DP-WD',
            render: (_: undefined, record: any) => {
                const v = Number(record.totalDp || 0) - Number(record.totalWd || 0);
                return <SimpleAmount amount={v} />;
            },
        },
        {
            title: t('Join Date'),
            dataIndex: 'createdAt',
            key: 'JoinDate',
            render: (createdAt: string) => <DateTime value={createdAt} />,
        },
        {
            title: t('Last BetTime'),
            dataIndex: 'lastBetTime',
            key: 'LastBetTime',
            render: (lastBetTime: string) => <DateTime value={lastBetTime} />,
        },
        {
            title: t(''),
            fixed: 'right',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: DataType) => (
                <p className="m-0 whitespace-nowrap">
                    <ShowButton size="small" type="primary" shape="circle" resource="users" recordItemId={record.id} hideText className="mr-2" />
                    <EditButton size="small" type="primary" shape="circle" resource="users" recordItemId={record.id} hideText />
                </p>
            ),
        },
    ];

    return columns;
};

export default useColumns;
