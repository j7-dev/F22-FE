import { Table, TableProps } from 'antd';
import { useTable } from '@refinedev/antd';
import { TTransaction } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import { DateTime } from '@/components/PureComponents';
import Amount from '@/components/Admin/Amount';
import { useGetSiteSetting } from '@/hooks';

type DataType = {
    id: number;
    date: string;
    credit: number;
    debit: number;
    balance_after_mutate: number | null | undefined;
    description: string;
};

const index: React.FC<{
    user_id: string | number | undefined;
}> = ({ user_id }) => {
    const siteSetting = useGetSiteSetting();
    if (!user_id) return <p>can't get user_id</p>;

    const default_currency = siteSetting?.default_currency || 'KRW';

    const columns: ColumnsType<DataType> = [
        {
            title: 'date',
            dataIndex: 'date',
            key: 'date',
            render: (date: string) => <DateTime value={date} />,
        },
        {
            title: 'credit',
            dataIndex: 'credit',
            key: 'credit',
            render: (credit: number) => <Amount amount={credit} currency={default_currency} symbol />,
        },
        {
            title: 'debit',
            dataIndex: 'debit',
            key: 'debit',
            render: (debit: number) => <Amount amount={debit} currency={default_currency} symbol />,
        },
        {
            title: 'balance',
            dataIndex: 'balance_after_mutate',
            key: 'balance_after_mutate',
            render: (balance_after_mutate: number) => <Amount amount={balance_after_mutate} currency={default_currency} symbol />,
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    const { tableProps } = useTable<TTransaction>({
        resource: 'transaction-records',
        filters: {
            permanent: [
                {
                    field: 'status',
                    operator: 'eq',
                    value: 'SUCCESS',
                },
                {
                    field: 'user.id',
                    operator: 'eq',
                    value: user_id,
                },
            ],
        },
        sorters: {
            initial: [
                {
                    field: 'updatedAt',
                    order: 'desc',
                },
            ],
        },
    });

    const formatter = (records: TTransaction[]) => {
        const data: DataType[] = records.map((record) => ({
            id: record.id,
            date: record.updatedAt,
            credit: record?.amount > 0 ? record?.amount : 0,
            debit: record?.amount < 0 ? record?.amount : 0,
            balance_after_mutate: record.balance_after_mutate,
            description: `#${record.id} ${record.type} ${record.title}`,
        }));

        return data;
    };

    const formattedTableProps = {
        ...tableProps,
        dataSource: formatter([...(tableProps?.dataSource || [])]),
        columns,
        rowKey: 'id',
    } as TableProps<DataType>;

    return <Table {...formattedTableProps} />;
};

export default index;
