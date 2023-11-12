import { Table, Row, Col, Card, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable, List } from '@refinedev/antd';
import { DataType, TSearchProps } from './types';
import { TUser } from '@/types';
import { useTranslation } from 'react-i18next';
import UserLink from '@/components/Admin/UserLink';
import { DateTime } from '@/components/PureComponents';
import { RESOURCE } from '../constants';
import Filter from './Filter';
import FilterTags from '@/components/Admin/FilterTags';
import { CrudFilters } from '@refinedev/core';
import { gameProviderTxnEnum } from '@/utils';
import SimpleAmount from '@/components/Admin/SimpleAmount';

const index: React.FC<{ user_id?: string | number }> = ({ user_id }) => {
    const { t } = useTranslation();
    const { tableProps, searchFormProps } = useTable({
        resource: RESOURCE,
        pagination: {
            pageSize: 20,
        },
        meta: {
            populate: {
                user: {
                    fields: ['id', 'display_name', 'username'],
                },
            },
        },
        sorters: {
            initial: [
                {
                    field: 'createdAt',
                    order: 'desc',
                },
            ],
        },
        filters: user_id
            ? {
                  permanent: [
                      {
                          field: 'user.id',
                          operator: 'eq',
                          value: user_id,
                      },
                  ],
              }
            : undefined,
        onSearch: (values: TSearchProps) => {
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
                    field: 'ref_id',
                    operator: 'contains',
                    value: values?.ref_id,
                },
                {
                    field: 'status',
                    operator: 'eq',
                    value: values?.status,
                },
                {
                    field: 'user.id',
                    operator: 'eq',
                    value: values?.user,
                },
                {
                    field: 'by',
                    operator: 'eq',
                    value: gameProviderTxnEnum?.[values?.gameProvider as keyof typeof gameProviderTxnEnum],
                },
            ];

            return filters as CrudFilters;
        },
    });

    const columns: ColumnsType<DataType> = [
        {
            title: t('Game Provider'),
            dataIndex: 'by',
            render: (by: string) => {
                const key = Object.keys(gameProviderTxnEnum).find((k) => gameProviderTxnEnum[k as keyof typeof gameProviderTxnEnum] === by);
                return key;
            },
        },
        {
            title: t('Transaction id'),
            dataIndex: 'ref_id',
        },
        {
            title: t('user'),
            dataIndex: 'user',
            render: (user: TUser) => <UserLink user={user} />,
        },
        {
            title: t('Debit Amount'),
            dataIndex: 'debit_amount',
            render: (v: number) => (v === undefined ? '' : <SimpleAmount amount={-v} />),
        },
        {
            title: t('Pay Out'),
            dataIndex: 'credit_amount',
            render: (v: number) => (v === undefined ? '' : <SimpleAmount amount={-v} />),
        },
        {
            title: t('win/loss'),
            dataIndex: 'winloss',
            render: (_: undefined, record: DataType) => <SimpleAmount amount={((record?.debit_amount || 0) + (record?.credit_amount || 0)) * -1} />,
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            render: (v: string) => t(v),
        },
        {
            title: t('Bet Time'),
            dataIndex: 'bet_time',
            render: (v: string) => <DateTime value={v} />,
        },
        {
            title: t('Update Time'),
            dataIndex: 'update_time',
            render: (v: string) => <DateTime value={v} />,
        },
    ];

    const formattedTableProps = {
        ...tableProps,
        scroll: { x: 1000 },
        columns,
        rowKey: 'id',
        pagination: {
            ...tableProps?.pagination,
            showSizeChanger: true,
            pageSizeOptions: ['20', '50', '100', '500', '1000'],
        },
    } as TableProps<DataType>;

    const filterTagsKey = JSON.stringify(searchFormProps?.form?.getFieldsValue());

    return (
        <List
            resource="coupons"
            canCreate
            createButtonProps={{
                children: t('Create'),
            }}
        >
            <Row gutter={[16, 16]}>
                <Col lg={24} xs={24}>
                    <Filter formProps={searchFormProps} />
                </Col>
                <Col lg={24} xs={24}>
                    <Card bordered={false}>
                        <div className="mb-4">
                            <FilterTags key={filterTagsKey} form={searchFormProps.form} />
                        </div>
                        <Table {...formattedTableProps} />
                        <hr className="my-8" />
                    </Card>
                </Col>
            </Row>
        </List>
    );
};

export default index;
