import { Table, Row, Col, Card, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable, List, EditButton, DeleteButton } from '@refinedev/antd';
import { DataType, TSearchProps } from './types';
import { TUser, TPeriod } from '@/types';
import { useTranslation } from 'react-i18next';
import UserLink from '@/components/Admin/UserLink';
import { BooleanIndicator } from '@/components/PureComponents';
import Period from '@/components/Admin/Period';
import { RESOURCE } from '../constants';
import Filter from './Filter';
import FilterTags from '@/components/Admin/FilterTags';
import { CrudFilters } from '@refinedev/core';

const index = () => {
    const { t } = useTranslation();
    const { tableProps, searchFormProps } = useTable({
        resource: RESOURCE,
        meta: {
            populate: {
                user: {
                    fields: ['id', 'display_name'],
                },
                period: {
                    fields: '*',
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
        onSearch: (values: TSearchProps) => {
            const filters = [
                {
                    field: 'createdAt',
                    operator: 'gt',
                    value: values?.dateRange ? values?.dateRange[0]?.startOf('day').format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
                },
                {
                    field: 'createdAt',
                    operator: 'lt',
                    value: values?.dateRange ? values?.dateRange[1]?.endOf('day').format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
                },
                {
                    field: 'is_claimed',
                    operator: 'eq',
                    value: values?.is_claimed,
                },
                {
                    field: 'user.id',
                    operator: 'eq',
                    value: values?.user,
                },
            ];

            return filters as CrudFilters;
        },
    });

    const columns: ColumnsType<DataType> = [
        {
            title: t('#'),
            dataIndex: 'id',
        },
        {
            title: t('Title'),
            dataIndex: 'title',
        },
        {
            title: t('Description'),
            dataIndex: 'description',
        },
        {
            title: t('Amount'),
            dataIndex: 'coupon_amount',
        },
        {
            title: t('Is Claimed'),
            dataIndex: 'is_claimed',
            render: (v: boolean) => <BooleanIndicator enabled={v} />,
        },
        {
            title: t('User'),
            dataIndex: 'user',
            render: (user: TUser) => <UserLink user={user} />,
        },
        {
            title: t('Allow Game Categories'),
            dataIndex: 'allow_game_categories',
            render: (v: string[]) => (Array.isArray(v) ? v.join(', ') : ''),
        },
        {
            title: t('Period'),
            dataIndex: 'period',
            render: (period: TPeriod) => {
                return <Period period={period} />;
            },
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
