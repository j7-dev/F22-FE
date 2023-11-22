import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { searchPropsAtom } from './atom';
import { useAtomValue } from 'jotai';
import { useCustom, useApiUrl } from '@refinedev/core';
import { useTranslation } from 'react-i18next';
import UserLink from '@/components/Admin/UserLink';
import { TUser } from '@/types';
import SimpleAmount from '@/components/Admin/SimpleAmount';

type DataType = {
    key: number;
    agent: {
        id: number;
        username?: string;
        commission_rate?: number;
    };
    deposit: number;
    withdraw: number;
    dpWd: number;
    betAmount: number;
    payout: number;
    winloss: number;
    coupon: number;
    profit: number;
    commissionRate: number | string;
    commission: number;
};

const DetailedInformation = () => {
    const { t } = useTranslation();
    const searchProps = useAtomValue(searchPropsAtom);
    const dateRange = searchProps.dateRange || undefined;

    const columns: ColumnsType<DataType> = [
        {
            title: t('Agent'),
            dataIndex: 'agent',
            render: (agent: TUser) => (agent?.id === 0 ? t('Total') : <UserLink user={agent} role="agent" />),
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
            title: t('Bet Amount'),
            dataIndex: 'betAmount',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Payout'),
            dataIndex: 'payout',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('WinLoss'),
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
            // 佣金比例
            title: t('commission Rate'),
            dataIndex: 'commissionRate',
            render: (commissionRate: number | string) => (typeof commissionRate === 'string' ? commissionRate : `${commissionRate * 100}%`),
        },
        {
            // 佣金結金額
            title: t('Commission'),
            dataIndex: 'commission',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
    ];

    const apiUrl = useApiUrl();
    const { data, isLoading } = useCustom({
        url: `${apiUrl}/utility/statistic/agent`,
        method: 'get',
        config: {
            query: {
                start: dateRange ? dateRange[0].format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
                end: dateRange ? dateRange[1].format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
            },
        },
    });
    const dataSource = data?.data?.data || [];

    const sumRecord = dataSource.reduce(
        (acc: DataType, cur: DataType) => {
            acc.deposit += cur.deposit;
            acc.withdraw += cur.withdraw;
            acc.dpWd += cur.dpWd;
            acc.betAmount += cur.betAmount;
            acc.payout += cur.payout;
            acc.winloss += cur.winloss;
            acc.coupon += cur.coupon;
            acc.profit += cur.profit;
            acc.commission += cur.commission;
            return acc;
        },
        {
            key: 25,
            agent: {
                id: 0,
            },
            deposit: 0,
            withdraw: 0,
            dpWd: 0,
            betAmount: 0,
            payout: 0,
            winloss: 0,
            coupon: 0,
            profit: 0,
            commissionRate: '-',
            commission: 0,
        },
    );

    return (
        <>
            <Table pagination={false} rowKey="key" size="small" columns={columns} dataSource={[sumRecord, ...dataSource]} loading={isLoading} />
        </>
    );
};

export default DetailedInformation;
