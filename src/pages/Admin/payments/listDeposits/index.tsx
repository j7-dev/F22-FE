import { Table, Row, Col, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable } from '@refinedev/antd';
import { Dayjs } from 'dayjs';
import Filter from './Filter';
import FilterTags from '@/components/FilterTags';
import { getStatusTag } from '@/utils';
import { TUser } from '@/types';
import UserLink from '@/components/Admin/UserLink';
import VipLink from '@/components/Admin/VipLink';
import Amount from '@/components/Admin/Amount';
import { CrudFilters } from '@refinedev/core';

import { DateTime } from '@/components/PureComponents';

type TSearchProps = {
    dateRange?: [Dayjs, Dayjs] | undefined;
    status?: string | undefined;
    user?: number | undefined;
};

const index = () => {
    const { tableProps, searchFormProps } = useTable({
        resource: 'transaction-records',
        meta: {
            populate: {
                user: {
                    fields: ['id', 'display_name', 'username'],
                    populate: {
                        vip: {
                            fields: ['label'],
                        },
                    },
                },
            },
        },
        filters: {
            permanent: [
                {
                    field: 'type',
                    operator: 'eq',
                    value: 'DEPOSIT',
                },
            ],
        },
        onSearch: (values: TSearchProps) => {
            const filters = [
                {
                    field: 'createdAt',
                    operator: 'gt',
                    value: values?.dateRange ? values?.dateRange[0]?.format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
                },
                {
                    field: 'createdAt',
                    operator: 'lt',
                    value: values?.dateRange ? values?.dateRange[1]?.format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
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
            ];

            return filters as CrudFilters;
        },
    });

    const columns: ColumnsType<any> = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'date',
            dataIndex: 'createdAt',
            render: (createdAt: string) => <DateTime value={createdAt} />,
        },
        {
            title: 'user',
            dataIndex: 'user',
            render: (user: TUser) => <UserLink user={user} />,
        },
        {
            title: 'agent',
            dataIndex: 'agent',
        },
        {
            title: 'amount',
            dataIndex: 'amount',
            render: (amount, record) => <Amount amount={amount} currency={record?.currency} symbol />,
        },
        {
            title: 'vip',
            dataIndex: 'vip',
            render: (_, record) => <VipLink vip={record?.user?.vip} />,
        },
        {
            title: 'title',
            dataIndex: 'title',
        },
        {
            title: 'status',
            dataIndex: 'status',
            render: (status: string) => getStatusTag(status),
        },
        {
            title: 'type',
            dataIndex: 'type',
        },
    ];

    const formattedTableProps = {
        ...tableProps,
        scroll: { x: 1600 },
        columns,
        rowKey: 'id',
    };

    const filterTagsKey = JSON.stringify(searchFormProps?.form?.getFieldsValue());

    return (
        <Row gutter={[16, 16]}>
            <Col lg={6} xs={24}>
                <Card title="Filters">
                    <Filter formProps={searchFormProps} />
                </Card>
            </Col>
            <Col lg={18} xs={24}>
                <Card title="Search Result">
                    <div className="mb-4">
                        <FilterTags key={filterTagsKey} searchFormProps={searchFormProps} />
                    </div>
                    <Table {...formattedTableProps} />
                    <hr className="my-8" />
                </Card>
            </Col>
        </Row>
    );
};

export default index;
