import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { searchPropsAtom } from './atom';
import { useAtomValue } from 'jotai';
import { useCustom, useApiUrl } from '@refinedev/core';
import SimpleAmount from '@/components/Admin/SimpleAmount';

type DataType = {
    agentId: number;
    newMembers: string;
    numberOfDepositors: string;
    numberOfFirstDeposit: string;
    numberOfDisable: string;
    totalDeposits: string;
    totalWithdraw: string;
    profit: string;
    commissionAmount: string;
};

const DetailedInformation = () => {
    const searchProps = useAtomValue(searchPropsAtom);
    const dateRange = searchProps.dateRange || undefined;

    const columns: ColumnsType<DataType> = [
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Deposit',
            dataIndex: 'deposit',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: 'Withdraw',
            dataIndex: 'withdraw',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: 'DPWD',
            dataIndex: 'dpWd',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: 'Valid Bet Amount',
            dataIndex: 'validBet',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: 'Payout',
            dataIndex: 'payout',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: 'winloss',
            dataIndex: 'winloss',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: 'Bonus & Turnover Bonus',
            dataIndex: 'coupon',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: 'Profit',
            dataIndex: 'profit',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: 'New Registered Members',
            dataIndex: 'numberOfRegistrants',
        },
        {
            title: 'Betting Members',
            dataIndex: 'bettingMembers',
        },
    ];

    const apiUrl = useApiUrl();
    const { data, isLoading } = useCustom({
        url: `${apiUrl}/utility/statistic/daily`,
        method: 'get',
        config: {
            query: {
                start: dateRange ? dateRange[0].startOf('day').format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
                end: dateRange ? dateRange[1].endOf('day').format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
            },
        },
    });
    const dataSource = data?.data?.data || [];

    return (
        <>
            <Table pagination={false} rowKey="date" size="small" columns={columns} dataSource={dataSource} loading={isLoading} />
        </>
    );
};

export default DetailedInformation;
