import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { searchPropsAtom } from './atom';
import { useAtomValue } from 'jotai';
import { useCustom, useApiUrl } from '@refinedev/core';
import SimpleAmount from '@/components/Admin/SimpleAmount';
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
            title: t('Date'),
            dataIndex: 'date',
        },
        {
            title: t('Deposit'),
            dataIndex: 'deposit',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Withdraw'),
            dataIndex: 'withdraw',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('DPWD'),
            dataIndex: 'dpWd',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Valid Bet Amount'),
            dataIndex: 'validBet',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Payout'),
            dataIndex: 'payout',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('winloss'),
            dataIndex: 'winloss',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Bonus & Turnover Bonus'),
            dataIndex: 'coupon',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Profit'),
            dataIndex: 'profit',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('New Registered Members'),
            dataIndex: 'numberOfRegistrants',
        },
        {
            title: t('Betting Members'),
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
