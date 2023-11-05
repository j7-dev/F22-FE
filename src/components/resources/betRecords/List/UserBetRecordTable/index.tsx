import { useList, CrudFilters } from '@refinedev/core';
import { Table } from 'antd';
import { DateTime } from '@/components/PureComponents';
import { TTransaction, TUser } from '@/types';
import UserLink from '@/components/Admin/UserLink';
import { nanoid } from 'nanoid';
import { searchPropsAtom, TSearchProps } from '../atom';
import { useAtomValue } from 'jotai';
import { gameProviderTxnEnum } from '@/utils';
import SimpleAmount from '@/components/Admin/SimpleAmount';

type DataType = any;

const index = () => {
    // TODO 未來再從後端優化分頁功能

    const searchProps = useAtomValue(searchPropsAtom);
    const status = searchProps?.status;
    const { data: txnResult, isFetching } = useList({
        resource: 'transaction-records',
        pagination: {
            mode: 'off',
            pageSize: 100,
        },
        filters: getFilters(searchProps),
        meta: {
            populate: {
                user: {
                    fields: ['id', 'username', 'display_name', 'email'],
                },
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
            // enabled: !!user_id,
        },
    });

    const allTxns = (txnResult?.data || []) as TTransaction[];

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

        if (txn.type === 'CREDIT' || txn.type === 'CANCEL') {
            return {
                by: txn?.by,
                ref_id: txn?.ref_id,
                user: txn?.user,
                credit_amount: txn?.amount,
            };
        }
    });

    // TODO CHECK 有沒有合併成功

    const combinedTxns = formattedTxns.reduce((acc: DataType[], curr: DataType) => {
        const existingItem = acc.find((item) => item.ref_id === curr.ref_id && !!curr.ref_id);
        if (existingItem) {
            // 合并具有相同ref_id的项
            Object.assign(existingItem, curr);
            existingItem.status = getStatus(allTxns, curr);
            existingItem.key = curr.ref_id;
        } else {
            // 如果没有相同的ref_id，添加到结果数组中
            acc.push({ ...curr, key: nanoid() });
        }
        return acc;
    }, []);

    const filteredTxns = combinedTxns.filter((txn) => (status ? txn.status === status : true));

    // const combinedTxns = formattedTxns.reduce((acc, curr: DataType) => {
    //     const existing = acc.find((item) => item.ref_id === curr.ref_id && !!item.ref_id && !!curr.ref_id);
    //     if (existing) {
    //         existing.debit_amount = curr.debit_amount;
    //         existing.credit_amount = curr.credit_amount;
    //         existing.valid_bet_amount = curr.valid_bet_amount;
    //         existing.status = getStatus(allTxns, curr);
    //     } else {
    //         acc.push(curr);
    //     }
    //     return acc;
    // }, [] as DataType[]);

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
            render: (v: number) => <SimpleAmount amount={-v} />,
        },
        {
            title: 'Pay Out',
            dataIndex: 'credit_amount',
            render: (v: number) => <SimpleAmount amount={-v} />,
        },
        // {
        //     title: 'Valid Bet Amount',
        //     dataIndex: 'valid_bet_amount',
        //     render: (v: number) => <SimpleAmount amount={v} />,
        // },
        {
            title: 'win/loss',
            dataIndex: 'winloss',
            render: (_: undefined, record: DataType) => <SimpleAmount amount={(-record?.debit_amount || 0) + (-record?.credit_amount || 0)} />,
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Bet Time',
            dataIndex: 'betTime',
            render: (_: undefined, record: DataType) => {
                const betTime = allTxns.find((t: TTransaction) => t.ref_id === record.ref_id && t.type === 'DEBIT' && !!record.ref_id)?.createdAt;
                return betTime ? <DateTime value={betTime} /> : <></>;
            },
        },
        {
            title: 'Update Time',
            dataIndex: 'updateTime',
            render: (_: undefined, record: DataType) => {
                const updateTime = allTxns.find((t: TTransaction) => t.ref_id === record.ref_id && t.type === 'CREDIT' && !!record.ref_id)?.createdAt;
                return updateTime ? <DateTime value={updateTime} /> : <></>;
            },
        },
    ];

    return <Table size="small" dataSource={filteredTxns} columns={columns} loading={isFetching} rowKey="key" />;
};

function getStatus(allTxns: TTransaction[], record: DataType) {
    if (!!record?.debit_amount && !!record?.credit_amount) return 'NORMAL';
    if (!!record?.debit_amount && !record?.credit_amount) return 'PENDING';

    const findTxn = allTxns.find((t: TTransaction) => t.ref_id === record.ref_id && !!record.ref_id);
    if (!!record?.debit_amount && findTxn?.type === 'CANCEL') return 'CANCEL';
    return '';
}

function getFilters(values: TSearchProps) {
    const start = values?.dateRange ? values?.dateRange[0]?.startOf('day').format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined;
    const end = values?.dateRange ? values?.dateRange[1]?.endOf('day').format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined;

    const defaultFilters = [
        {
            field: 'createdAt',
            operator: 'gt',
            value: start,
        },
        {
            field: 'createdAt',
            operator: 'lt',
            value: end,
        },
        {
            field: 'ref_id',
            operator: 'eq',
            value: values?.txnId,
        },
        {
            field: 'user.id',
            operator: 'eq',
            value: values?.user_id,
        },
        {
            field: 'by',
            operator: 'eq',
            value: gameProviderTxnEnum?.[values?.gameProvider as keyof typeof gameProviderTxnEnum],
        },
        {
            field: 'type',
            operator: 'in',
            value: ['DEBIT', 'CREDIT', 'CANCEL'],
        },
    ];

    const filteredFilter = defaultFilters.filter((f) => f.value !== undefined);
    return filteredFilter as CrudFilters;
}

export default index;
