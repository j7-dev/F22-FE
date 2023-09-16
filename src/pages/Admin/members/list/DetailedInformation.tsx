import { useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { searchPropsAtom } from './atom';
import { useAtomValue } from 'jotai';
import { DataType } from './types';
import { useTable } from '@refinedev/antd';
import { TVip } from '@/types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { BooleanIndicator } from '@/components/PureComponents';

const DetailedInformation = () => {
    const searchProps = useAtomValue(searchPropsAtom);
    const { tableProps } = useTable({
        resource: 'users',
        meta: {
            populate: ['vip', 'balances'],
        },
    });
    const dateRange = searchProps.dateRange || undefined;
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
            render: (text, record) => text || record.username,
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
            dataIndex: 'accountBalance',
        },
        {
            title: 'phone',
            dataIndex: 'phone',
        },
        {
            title: 'vip',
            dataIndex: 'vip',
            render: (vip: TVip) => <Link to="/refine/system-setting/vips">{vip.label}</Link>,
        },
        {
            title: 'blocked',
            dataIndex: 'blocked',
            align: 'center',
            render: (blocked) => (
                <BooleanIndicator
                    value={!blocked}
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
            title: 'Last Bettime ',
            dataIndex: 'lastBettime ',
        },
    ];

    const formattedTableProps = {
        ...tableProps,
        scroll: { x: 1600 },
        columns,
        rowKey: 'userId',
    };

    useEffect(() => {
        console.log('searchProps', searchProps);
    }, [searchProps]);

    return (
        <>
            <p>Detailed Information {dateRange ? dateRange.map((date) => (date ? date.format('YYYY/MM/DD') : '')).join(' ~ ') : ''}</p>
            <Table {...formattedTableProps} />
            <hr className="my-8" />
        </>
    );
};

export default DetailedInformation;
