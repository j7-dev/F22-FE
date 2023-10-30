import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { searchPropsAtom } from './atom';
import { useAtomValue } from 'jotai';
import { useCustom, useApiUrl } from '@refinedev/core';

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
            title: 'agent',
            dataIndex: 'agent',
        },
        {
            title: 'deposit',
            dataIndex: 'deposit ',
        },
        {
            title: 'withdraw',
            dataIndex: 'withdraw',
        },
        {
            title: 'DPWD',
            dataIndex: 'dpWd',
        },
        {
            title: 'valid bet amount',
            dataIndex: 'validBet',
        },
        {
            title: 'payout',
            dataIndex: 'payout',
        },
        {
            title: 'winloss',
            dataIndex: 'winloss',
        },
        {
            title: 'bonus & turnover bonus',
            dataIndex: 'coupon',
        },
        {
            title: 'profit',
            dataIndex: 'profit',
        },
        {
            // 佣金比例
            title: 'commission',
            dataIndex: 'commission',
        },
        {
            // 佣金結金額
            title: 'commissionSettlement',
            dataIndex: 'commissionSettlement',
        },
    ];

    const apiUrl = useApiUrl();
    const { data, isLoading } = useCustom({
        url: `${apiUrl}/utility/statistic/daily`,
        method: 'get',
        config: {
            query: {
                start: dateRange ? dateRange[0].toISOString() : undefined,
                end: dateRange ? dateRange[1].toISOString() : undefined,
            },
        },
    });
    const dataSource = data?.data?.data || [];

    //TODO API 抓出某個AGENT底下的所有資料

    return (
        <>
            <Table rowKey="date" size="small" columns={columns} dataSource={dataSource} loading={isLoading} />
        </>
    );
};

export default DetailedInformation;
