import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { searchPropsAtom } from './atom';
import { useAtomValue } from 'jotai';
import { useCustom, useApiUrl } from '@refinedev/core';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const searchProps = useAtomValue(searchPropsAtom);
    const dateRange = searchProps.dateRange || undefined;

    const columns: ColumnsType<DataType> = [
        {
            title: t('Agent'),
            dataIndex: 'agent',
        },
        {
            title: t('Deposit'),
            dataIndex: 'deposit ',
        },
        {
            title: t('Withdraw'),
            dataIndex: 'withdraw',
        },
        {
            title: t('DPWD'),
            dataIndex: 'dpWd',
        },
        {
            title: t('Valid Bet Amount'),
            dataIndex: 'validBet',
        },
        {
            title: t('Payout'),
            dataIndex: 'payout',
        },
        {
            title: t('WinLoss'),
            dataIndex: 'winloss',
        },
        {
            title: t('Bonus & Turnover Bonus'),
            dataIndex: 'coupon',
        },
        {
            title: t('Profit'),
            dataIndex: 'profit',
        },
        {
            // 佣金比例
            title: t('Commission'),
            dataIndex: 'commission',
        },
        {
            // 佣金結金額
            title: t('Commission Settlement'),
            dataIndex: 'commissionSettlement',
        },
    ];

    const apiUrl = useApiUrl();
    const { data, isLoading } = useCustom({
        url: `${apiUrl}/utility/statistic/daily`,
        method: 'get',
        config: {
            query: {
                start: dateRange ? dateRange[0].format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
                end: dateRange ? dateRange[1].format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
            },
        },
    });
    const dataSource = data?.data?.data || [];

    //TODO API 抓出某個AGENT底下的所有資料

    return (
        <>
            <Table pagination={false} rowKey="date" size="small" columns={columns} dataSource={dataSource} loading={isLoading} />
        </>
    );
};

export default DetailedInformation;
