import { DataType } from './types';
import { ShowButton, EditButton } from '@refinedev/antd';
import { BooleanIndicator } from '@/components/PureComponents';
import { Link } from 'react-router-dom';
import { TVip } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const columns: ColumnsType<DataType> = [
    {
        title: '#',
        dataIndex: 'id',
    },
    {
        title: 'Risk Management',
        dataIndex: 'memberAccount ',
    },
    {
        title: 'Account',
        dataIndex: 'username',
    },
    {
        title: 'Display Name',
        dataIndex: 'display_name',
        render: (text: string, record: DataType) => text || record?.username,
    },
    {
        title: 'Agent',
        dataIndex: 'agentId',
    },
    {
        title: 'birthday',
        dataIndex: 'birthday',
    },
    {
        title: 'Account Balance',
        dataIndex: 'balances',
        render: (_balances) => <></>,
    },
    {
        title: 'phone',
        dataIndex: 'phone',
    },
    {
        title: 'vip',
        dataIndex: 'vip',
        render: (vip: TVip) => <Link to="/refine/system-setting/vips">{vip?.label}</Link>,
    },
    {
        title: 'blocked',
        dataIndex: 'blocked',
        align: 'center',
        render: (blocked: boolean) => (
            <BooleanIndicator
                enabled={!blocked}
                tooltipProps={{
                    title: blocked ? 'Blocked' : 'Unblocked',
                    enabled: true,
                }}
            />
        ),
    },
    {
        title: 'AnyTimeDiscount',
        dataIndex: 'anyTimeDiscount',
    },
    {
        title: 'Total Deposits',
        dataIndex: 'totalDeposits',
    },
    {
        title: 'Total Withdrawal',
        dataIndex: 'totalWithdrawal',
    },
    {
        title: 'DP-WD',
        dataIndex: 'dp-wd',
    },
    {
        title: 'Join Date',
        dataIndex: 'createdAt',
        render: (createdAt) => dayjs(createdAt).format('YYYY-MM-DD'),
    },
    {
        title: 'Last Bettime',
        dataIndex: 'lastBettime ',
    },
    {
        title: '',
        fixed: 'right',
        dataIndex: 'action',
        render: (_: any, record: DataType) => (
            <p className="m-0 whitespace-nowrap">
                <ShowButton size="small" type="primary" shape="circle" recordItemId={record.id} hideText className="mr-2" />
                <EditButton size="small" type="primary" shape="circle" recordItemId={record.id} hideText />
            </p>
        ),
    },
];

export default columns;
