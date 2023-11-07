import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { searchPropsAtom } from './atom';
import { useAtomValue } from 'jotai';
import { useCustom, useApiUrl } from '@refinedev/core';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import { useTranslation } from 'react-i18next';

type DataType = {
    date: string;
    deposit: number;
    withdraw: number;
    dpWd: number;
    validBet: number;
    payout: number;
    winloss: number;
    coupon: number;
    profit: number;
    numberOfRegistrants: number;
    bettingMembers: number;
};

const DetailedInformation = () => {
    const { t } = useTranslation();
    const searchProps = useAtomValue(searchPropsAtom);
    const dateRange = searchProps.dateRange || undefined;

    const columns: ColumnsType<DataType> = [
        {
            title: t('Date'),
            dataIndex: 'date',
            fixed: true,
        },
        {
            title: t('Deposit'),
            dataIndex: 'deposit',
            fixed: true,
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Withdraw'),
            dataIndex: 'withdraw',
            fixed: true,
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('DPWD'),
            dataIndex: 'dpWd',
            fixed: true,
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Valid Bet Amount'),
            dataIndex: 'validBet',
            fixed: true,
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Payout'),
            dataIndex: 'payout',
            fixed: true,
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('winloss'),
            dataIndex: 'winloss',
            fixed: true,
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Bonus & Turnover Bonus'),
            dataIndex: 'coupon',
            fixed: true,
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Profit'),
            dataIndex: 'profit',
            fixed: true,
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('New Registered Members'),
            dataIndex: 'numberOfRegistrants',
            fixed: true,
        },
        {
            title: t('Betting Members'),
            dataIndex: 'bettingMembers',
            fixed: true,
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
    const dataSource = (data?.data?.data || []) as DataType[];
    const sumRecord = dataSource.reduce(
        (acc, cur) => {
            acc.deposit += cur.deposit;
            acc.withdraw += cur.withdraw;
            acc.dpWd += cur.dpWd;
            acc.validBet += cur.validBet;
            acc.payout += cur.payout;
            acc.winloss += cur.winloss;
            acc.coupon += cur.coupon;
            acc.profit += cur.profit;
            acc.numberOfRegistrants += cur.numberOfRegistrants;
            acc.bettingMembers += cur.bettingMembers;
            return acc;
        },
        {
            date: 'Total',
            deposit: 0,
            withdraw: 0,
            dpWd: 0,
            validBet: 0,
            payout: 0,
            winloss: 0,
            coupon: 0,
            profit: 0,
            numberOfRegistrants: 0,
            bettingMembers: 0,
        },
    );

    return (
        <>
            <Table pagination={false} rowKey="date" size="small" columns={columns} dataSource={[sumRecord, ...dataSource]} loading={isLoading} />
        </>
    );
};

export default DetailedInformation;
