import React from 'react';
import { useList } from '@refinedev/core';
import { Table } from 'antd';
import { DateTime } from '@/components/PureComponents';
import { TTransaction, TUser } from '@/types';
import UserLink from '@/components/Admin/UserLink';
import { gameProviderTxnEnum } from '@/utils';

type DataType = any;

const index: React.FC<{ user_id: string | number | undefined }> = React.memo(({ user_id }) => {
    // TODO 未來再從後端優化分頁功能
    const { data: txnResult, isLoading } = useList({
        resource: 'transaction-records',
        pagination: {
            mode: 'off',
        },
        filters: [
            {
                field: 'user.id',
                operator: 'eq',
                value: user_id,
            },
            {
                field: 'type',
                operator: 'in',
                value: ['DEBIT', 'CREDIT'],
            },
        ],
        meta: {
            populate: {
                user: '*',
            },
        },
        sorters: [
            {
                field: 'createdAt',
                order: 'desc',
            },
        ],
        queryOptions: {
            staleTime: 1000 * 60 * 5,
        },
    });

    if (!user_id) return <p>can't get user_id</p>;

    const allTxns = (txnResult?.data || []) as TTransaction[];
    console.log('⭐  allTxns:', allTxns);

    const formattedTxns = allTxns.map((txn) => {
        if (txn.type === 'DEBIT') {
            return {
                by: txn?.by,
                ref_id: txn?.ref_id,
                user: txn?.user,
                debit_amount: txn?.amount,
                valid_bet_amount: txn?.amount,
            };
        }

        if (txn.type === 'CREDIT') {
            return {
                by: txn?.by,
                ref_id: txn?.ref_id,
                user: txn?.user,
                credit_amount: txn?.amount,
            };
        }
    });
    console.log('⭐  formattedTxns:', formattedTxns);

    // TODO CHECK 有沒有合併成功

    const combinedTxns = formattedTxns.reduce((acc, curr: DataType) => {
        const existing = acc.find((item) => item.ref_id === curr.ref_id && !!item.ref_id && !!curr.ref_id);
        if (existing) {
            existing.debit_amount = curr.debit_amount;
            existing.credit_amount = curr.credit_amount;
            existing.valid_bet_amount = curr.valid_bet_amount;
        } else {
            acc.push(curr);
        }
        return acc;
    }, [] as DataType[]);
    console.log('⭐  combinedTxns:', combinedTxns);

    const columns = [
        {
            title: 'Game Provider',
            dataIndex: 'by',
            render: (by: string) => {
                //get key of gameProviderTxnEnum
                const key = Object.keys(gameProviderTxnEnum).find((k) => gameProviderTxnEnum[k as keyof typeof gameProviderTxnEnum] === by);
                return key;
            },
        },
        {
            title: 'Transaction id',
            dataIndex: 'ref_id',
        },
        {
            title: 'user',
            dataIndex: 'user',
            render: (user: TUser) => <UserLink user={user} />,
        },
        {
            title: 'Debit Amount',
            dataIndex: 'debit_amount',
            render: (v: number) => (v || 0).toLocaleString(),
        },
        {
            title: 'Pay Out',
            dataIndex: 'credit_amount',
            render: (v: number) => (v || 0).toLocaleString(),
        },
        {
            title: 'Valid Bet Amount',
            dataIndex: 'valid_bet_amount',
            render: (v: number) => (v || 0).toLocaleString(),
        },
        {
            title: 'win/loss',
            dataIndex: 'winloss',
            render: (_: undefined, record: DataType) => ((record?.debit_amount || 0) + (record?.credit_amount || 0)).toLocaleString(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_: undefined, record: DataType) => {
                if (!!record?.debit_amount && !!record?.credit_amount) return 'NORMAL';
                if (!!record?.debit_amount && !record?.credit_amount) return 'PENDING';
                // TODO 取消怎麼做
                return '';
            },
        },
        {
            title: 'Bet Time',
            dataIndex: 'betTime',
            render: (_: undefined, record: DataType) => {
                const betTime = allTxns.find((t: TTransaction) => t.ref_id === record.ref_id && t.type === 'DEBIT')?.createdAt;
                return betTime ? <DateTime value={betTime} /> : <></>;
            },
        },
        {
            title: 'Update Time',
            dataIndex: 'updateTime',
            render: (_: undefined, record: DataType) => {
                const updateTime = allTxns.find((t: TTransaction) => t.ref_id === record.ref_id && t.type === 'CREDIT')?.createdAt;
                return updateTime ? <DateTime value={updateTime} /> : <></>;
            },
        },
    ];

    return <Table size="small" dataSource={combinedTxns} columns={columns} rowKey="uuid" loading={isLoading} />;
});

export default index;
