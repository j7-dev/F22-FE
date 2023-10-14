import { DataType } from '../types';
import { ShowButton, EditButton } from '@refinedev/antd';
import { BooleanIndicator } from '@/components/PureComponents';
import { Link } from 'react-router-dom';
import { TTransaction, TUser, TVip } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useGetSiteSetting, useBalanceColumns } from '@/hooks';
import Amount from '@/components/Admin/Amount';

const useColumns = () => {
    const { default_currency } = useGetSiteSetting();
    const allBalances = useBalanceColumns();

    const columns: ColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Risk Management',
            dataIndex: 'memberAccount ',
            key: 'RiskManagement',
        },
        {
            title: 'Account',
            dataIndex: 'username',
            key: 'Account',
        },
        {
            title: 'Display Name',
            dataIndex: 'display_name',
            key: 'DisplayName',
        },
        {
            title: 'Agent',
            dataIndex: 'agent',
            key: 'Agent',
            render: (agent: TUser) => (agent ? <Link to={`/refine/agent/show/${agent?.id}`}>{agent?.display_name}</Link> : null),
        },
        ...allBalances,
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'vip',
            dataIndex: 'vip',
            key: 'vip',
            render: (vip: TVip) => <Link to="/refine/system-setting/vips">{vip?.label}</Link>,
        },
        {
            title: 'status',
            dataIndex: 'confirmed',
            key: 'status',
            align: 'center',
            render: (confirmed: boolean) => (
                <BooleanIndicator
                    enabled={confirmed}
                    tooltipProps={{
                        title: confirmed ? 'Confirmed' : 'Note Confirmed',
                        enabled: true,
                    }}
                />
            ),
        },
        {
            title: 'AnyTimeDiscount',
            dataIndex: 'anyTimeDiscount',
            key: 'AnyTimeDiscount',
        },
        {
            title: 'Total Deposits',
            dataIndex: 'transaction_records',
            key: 'TotalDeposits',
            render: (transaction_records: TTransaction[]) => {
                const sum = transaction_records.reduce((acc, cur) => {
                    if (cur.type === 'DEPOSIT' && cur.status === 'SUCCESS') {
                        return acc + Number(cur.amount);
                    }
                    return acc;
                }, 0);
                return <Amount amount={sum} />;
            },
        },
        {
            title: 'Total Withdrawal',
            dataIndex: 'transaction_records',
            key: 'TotalWithdrawal',
            render: (transaction_records: TTransaction[]) => {
                const sum = transaction_records.reduce((acc, cur) => {
                    if (cur.type === 'WITHDRAW' && cur.status === 'SUCCESS') {
                        return acc + Number(cur.amount);
                    }
                    return acc;
                }, 0);
                return <Amount amount={sum} />;
            },
        },
        {
            title: 'DP-WD',
            dataIndex: 'transaction_records',
            key: 'DP-WD',
            render: (transaction_records: TTransaction[]) => {
                const sumDeposit = transaction_records.reduce((acc, cur) => {
                    if (cur.type === 'DEPOSIT' && cur.status === 'SUCCESS') {
                        return acc + Number(cur.amount);
                    }
                    return acc;
                }, 0);
                const sumWithdraw = transaction_records.reduce((acc, cur) => {
                    if (cur.type === 'WITHDRAW' && cur.status === 'SUCCESS') {
                        return acc + Number(cur.amount);
                    }
                    return acc;
                }, 0);
                const dpWd = sumDeposit - sumWithdraw;
                return <Amount amount={dpWd} currency={default_currency} symbol className={dpWd === 0 ? '' : dpWd > 0 ? 'text-teal-500' : 'text-rose-500'} />;
            },
        },
        {
            title: 'Join Date',
            dataIndex: 'createdAt',
            key: 'JoinDate',
            render: (createdAt) => dayjs(createdAt).format('YYYY-MM-DD'),
        },
        {
            title: 'Last BetTime',
            dataIndex: 'transaction_records',
            key: 'LastBetTime',
            render: (transaction_records: TTransaction[]) => {
                const lastBet = (transaction_records || []).find((tr) => tr.type === 'DEBIT' && tr.status === 'SUCCESS');
                return lastBet ? dayjs(lastBet?.createdAt).format('YYYY-MM-DD') : null;
            },
        },
        {
            title: '',
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
