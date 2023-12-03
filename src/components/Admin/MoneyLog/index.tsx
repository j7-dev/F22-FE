import { Table, TableProps, Row, Col, Card } from 'antd';
import { useTable } from '@refinedev/antd';
import { TTransaction } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import { DateTime } from '@/components/PureComponents';
import { useGetSiteSetting } from '@/hooks';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import { useTranslation } from 'react-i18next';
import { CrudFilters } from '@refinedev/core';
import { TSearchProps } from './types';
import Filter from './Filter';
import FilterTags from '@/components/Admin/FilterTags';
import { invertGameProviderTxnEnum } from '@/utils';

type DataType = {
    id: number;
    date: string;
    credit: number;
    debit: number;
    balance_after_mutate: number | null | undefined;
    type: string;
};

const index: React.FC<{
    user_id: string | number | undefined;
    currency?: string;
    amount_type?: string;
}> = ({ user_id, currency, amount_type }) => {
    const { default_currency, default_amount_type } = useGetSiteSetting();
    const { t } = useTranslation();

    if (!user_id) return <p>can't get user_id</p>;

    const columns: ColumnsType<DataType> = [
        {
            title: t('Date'),
            dataIndex: 'date',
            key: 'date',
            render: (date: string) => <DateTime value={date} />,
        },
        {
            title: t('Credit'),
            dataIndex: 'credit',
            key: 'credit',
            render: (credit: number) => <SimpleAmount amount={credit} />,
        },
        {
            title: t('Debit'),
            dataIndex: 'debit',
            key: 'debit',
            render: (debit: number) => <SimpleAmount amount={debit} />,
        },
        {
            title: t('Balance'),
            dataIndex: 'balance_after_mutate',
            key: 'balance_after_mutate',
            render: (balance_after_mutate: number) => <SimpleAmount amount={balance_after_mutate} />,
        },
        {
            title: t('Type'),
            dataIndex: 'type',
            key: 'type',
        },
    ];

    const { tableProps, searchFormProps } = useTable<TTransaction>({
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
                {
                    field: 'currency',
                    operator: 'eq',
                    value: currency || default_currency,
                },
                {
                    field: 'amount_type',
                    operator: 'eq',
                    value: amount_type || default_amount_type,
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
        onSearch: (values: TSearchProps) => {
            console.log('⭐  values:', values);
            const filters = [
                {
                    field: 'updatedAt',
                    operator: 'gt',
                    value: values?.dateRange ? values?.dateRange[0]?.startOf('day').format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
                },
                {
                    field: 'updatedAt',
                    operator: 'lt',
                    value: values?.dateRange ? values?.dateRange[1]?.endOf('day').format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
                },
                {
                    field: 'type',
                    operator: 'in',
                    value: values?.type,
                },
            ];

            return filters as CrudFilters;
        },
    });

    const formatter = (records: TTransaction[]) => {
        const data: DataType[] = records.map((record) => {
            const type = getType(record) || '';

            return {
                id: record.id,
                date: record.updatedAt,
                credit: record?.amount > 0 ? record?.amount : 0,
                debit: record?.amount < 0 ? record?.amount : 0,
                balance_after_mutate: record.balance_after_mutate,
                type,
            };
        });

        return data;
    };

    const formattedTableProps = {
        ...tableProps,
        dataSource: formatter([...(tableProps?.dataSource || [])]),
        columns,
        rowKey: 'id',
    } as TableProps<DataType>;

    const filterTagsKey = JSON.stringify(searchFormProps?.form?.getFieldsValue());

    return (
        <Row gutter={[16, 16]}>
            <Col lg={24} xs={24}>
                <Filter formProps={searchFormProps} amount_type={amount_type} />
            </Col>
            <Col lg={24} xs={24}>
                <Card bordered={false}>
                    <div className="mb-4">
                        <FilterTags key={filterTagsKey} form={searchFormProps.form} />
                    </div>
                    <Table {...formattedTableProps} />
                </Card>
            </Col>
        </Row>
    );
};

function getType(record: TTransaction) {
    const gameProviderName = invertGameProviderTxnEnum?.[record?.by as keyof typeof invertGameProviderTxnEnum] || '';
    if (!record?.type) return '';

    switch (record?.type) {
        case 'DEBIT':
        case 'CREDIT':
        case 'BET':
            return `${record?.type} ${gameProviderName}`;
        case 'COUPON':
            return record?.title;
        default:
            return record?.type || '';
    }
}

export default index;
