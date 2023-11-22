import { Table, Row, Col, Card, TableProps, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable, List, EditButton, DeleteButton } from '@refinedev/antd';
import { DataType, TSearchProps } from './types';
import { useTranslation } from 'react-i18next';
import { RESOURCE } from '../constants';
import Filter from './Filter';
import FilterTags from '@/components/Admin/FilterTags';
import { CrudFilters } from '@refinedev/core';

const index = () => {
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
                users_role: {
                    fields: '*',
                },
            },
        },
        sorters: {
            initial: [
                {
                    field: 'order',
                    order: 'asc',
                },
            ],
        },
        onSearch: (values: TSearchProps) => {
            const filters = [
                {
                    field: 'activated',
                    operator: 'eq',
                    value: values?.activated,
                },
            ];

            return filters as CrudFilters;
        },
    });

    const columns: ColumnsType<DataType> = [
        {
            title: t('level'),
            dataIndex: 'order',
        },
        {
            title: t('label'),
            dataIndex: 'label',
        },
        {
            title: t('Turnover Rate'),
            dataIndex: 'turnover_rate',
            render: (v) => `${v || 0}%`,
        },
        {
            title: t('Upgrade - Deposit Amount'),
            dataIndex: 'deposit_upgrade_threshold',
        },
        {
            title: t('Upgrade - Valid Bet'),
            dataIndex: 'valid_bet_amount_upgrade_threshold',
        },
        {
            title: t('status'),
            dataIndex: 'activated',
            render: (activated) => <Tag color={activated ? '#87d068' : '#ff4d4f'}>{activated ? 'ON' : 'OFF'}</Tag>,
        },
        {
            title: '',
            fixed: 'right',
            dataIndex: 'action',
            render: (_, record) => (
                <p className="m-0 whitespace-nowrap">
                    <EditButton size="small" type="primary" shape="circle" recordItemId={record.id} hideText className="mr-2" />
                    <DeleteButton size="small" type="primary" shape="circle" recordItemId={record.id} hideText />
                </p>
            ),
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
            title={t('Vip upgrade rules')}
            resource={RESOURCE}
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
