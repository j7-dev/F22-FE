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
            title: t('date'),
            dataIndex: 'date',
        },
        {
            title: t('deposit'),
            dataIndex: 'deposit',
        },
        {
            title: t('withdraw'),
            dataIndex: 'withdraw',
        },
        {
            title: t('DPWD'),
            dataIndex: 'dpWd',
        },
        {
            title: t('valid bet amount'),
            dataIndex: 'validBet',
        },
        {
            title: t('payout'),
            dataIndex: 'payout',
        },
        {
            title: t('winloss'),
            dataIndex: 'winloss',
        },
        {
            title: t('bonus & turnover bonus'),
            dataIndex: 'coupon',
        },
        {
            title: t('profit'),
            dataIndex: 'profit',
        },
        {
            title: t('new registered members'),
            dataIndex: 'numberOfRegistrants',
        },
        {
            title: t('betting members'),
            dataIndex: 'bettingMembers',
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
