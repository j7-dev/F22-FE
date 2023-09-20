import { Table, Row, Col, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable } from '@refinedev/antd';
import { Dayjs } from 'dayjs';
import Filter from './Filter';
import FilterTags from '@/components/FilterTags';

type TSearchProps = {
    dateRange?: [Dayjs, Dayjs] | undefined;
    [key: string]: any;
};

const index = () => {
    const { tableProps, searchFormProps } = useTable({
        resource: 'transaction-records',
        meta: {
            populate: ['user'],
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
            return values?.dateRange
                ? [
                      {
                          field: 'email',
                          operator: 'contains',
                          value: values?.email,
                      },
                      {
                          field: 'createdAt',
                          operator: 'gt',
                          value: values?.dateRange[0]?.format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                      },
                      {
                          field: 'createdAt',
                          operator: 'lt',
                          value: values?.dateRange[1]?.format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                      },
                  ]
                : [
                      {
                          field: 'email',
                          operator: 'contains',
                          value: values?.email,
                      },
                  ];
        },
    });

    const columns: ColumnsType<any> = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'title',
            dataIndex: 'title',
        },
        {
            title: 'status',
            dataIndex: 'status',
        },
        {
            title: 'type',
            dataIndex: 'type',
        },
        {
            title: 'amount',
            dataIndex: 'amount',
        },
        {
            title: 'currency',
            dataIndex: 'currency',
        },
        {
            title: 'by',
            dataIndex: 'by',
        },
        {
            title: 'description',
            dataIndex: 'description',
        },
        {
            title: 'user',
            dataIndex: 'user',
        },
    ];

    const formattedTableProps = {
        ...tableProps,
        scroll: { x: 1600 },
        columns,
        rowKey: 'id',
    };

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
                        <FilterTags searchFormProps={searchFormProps} />
                    </div>
                    <Table {...formattedTableProps} />
                    <hr className="my-8" />
                </Card>
            </Col>
        </Row>
    );
};

export default index;
