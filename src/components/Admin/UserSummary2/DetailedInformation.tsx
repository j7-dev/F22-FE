import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { searchPropsAtom } from './atom';
import { useAtomValue } from 'jotai';
import { useCustom, useApiUrl } from '@refinedev/core';
import { useTranslation } from 'react-i18next';
import UserLink from '@/components/Admin/UserLink';
import { TUser } from '@/types';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import { DateTime } from '@/components/PureComponents';

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

const DetailedInformation = ({ user_id }: { user_id: number }) => {
    const { t } = useTranslation();
    const searchProps = useAtomValue(searchPropsAtom);
    const dateRange = searchProps.dateRange || undefined;

    const columns: ColumnsType<DataType> = [
        {
            title: t('referral'),
            dataIndex: 'referral',
            render: (referral: TUser) => (referral?.id === 0 ? t('Total') : <UserLink user={referral} />),
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
            title: t('Registered Date'),
            dataIndex: 'referral',
            key: 'registeredDate',
            render: (referral: TUser) => <DateTime value={referral?.createdAt} />,
        },
        {
            // 佣金結金額
            title: t('Latest Bet At'),
            dataIndex: 'latestBetAt',
            render: (v: string) => <DateTime value={v} />,
        },
    ];

    const apiUrl = useApiUrl();
    const { data, isLoading } = useCustom({
        url: `${apiUrl}/utility/statistic/by-referral`,
        method: 'get',
        config: {
            query: {
                start: dateRange ? dateRange[0].format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
                end: dateRange ? dateRange[1].format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
                user_id,
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
            return acc;
        },
        {
            key: 25,
            referral: {
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
        },
    );

    return (
        <>
            <Table pagination={false} rowKey="key" size="small" columns={columns} dataSource={[sumRecord, ...dataSource]} loading={isLoading} />
        </>
    );
};

export default DetailedInformation;
