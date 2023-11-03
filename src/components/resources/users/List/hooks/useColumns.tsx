import { DataType } from '../types';
import { ShowButton, EditButton } from '@refinedev/antd';
import { BooleanIndicator, DateTime } from '@/components/PureComponents';
import { Link } from 'react-router-dom';
import { TUser, TVip } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import { useBalanceColumns } from '@/hooks';

const useColumns = () => {
    const allBalances = useBalanceColumns();

    const columns: ColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },

        {
            title: 'Account',
            dataIndex: 'username',
            key: 'Account',
        },
        {
            title: 'Real Name',
            dataIndex: 'display_name',
            key: 'RealName',
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
                        title: confirmed ? 'Confirmed' : 'Not Confirmed',
                        enabled: true,
                    }}
                />
            ),
        },
        {
            title: 'Total Deposits',
            dataIndex: 'totalDp',
            key: 'totalDp',
            render: (v: number) => v.toLocaleString(),
        },
        {
            title: 'Total Withdrawal',
            dataIndex: 'totalWd',
            key: 'totalWd',
            render: (v: number) => v.toLocaleString(),
        },
        {
            title: 'DP-WD',
            dataIndex: 'DP-WD',
            key: 'DP-WD',
            render: (_: undefined, record: any) => {
                const v = Number(record.totalDp || 0) - Number(record.totalWd || 0);
                return v.toLocaleString();
            },
        },
        {
            title: 'Join Date',
            dataIndex: 'createdAt',
            key: 'JoinDate',
            render: (createdAt: string) => <DateTime value={createdAt} />,
        },
        {
            title: 'Last BetTime',
            dataIndex: 'lastBetTime',
            key: 'LastBetTime',
            render: (lastBetTime: string) => <DateTime value={lastBetTime} />,
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
