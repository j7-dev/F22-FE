import { Table, Row, Col, Card, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable, List, EditButton, DeleteButton } from '@refinedev/antd';
import { DateTime } from '@/components/PureComponents';
import { DataType } from './types';
import { POST_TYPE, RESOURCE } from '../constants';

const index = () => {
    const { tableProps } = useTable({
        resource: RESOURCE,
        filters: {
            permanent: [
                {
                    field: 'post_type',
                    operator: 'eq',
                    value: POST_TYPE,
                },
            ],
        },
        sorters: {
            initial: [
                {
                    field: 'createdAt',
                    order: 'desc',
                },
            ],
        },
    });

    const columns: ColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'title',
            dataIndex: 'title',
        },
        {
            title: 'content',
            dataIndex: 'content',
        },
        {
            title: 'send_to_user_ids',
            dataIndex: 'send_to_user_ids',
        },
        {
            title: 'date',
            dataIndex: 'createdAt',
            render: (createdAt: string) => <DateTime value={createdAt} />,
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

    return (
        <List resource={RESOURCE} canCreate>
            <Row gutter={[16, 16]}>
                <Col lg={24} xs={24}>
                    <Card bordered={false}>
                        <Table {...formattedTableProps} />
                        <hr className="my-8" />
                    </Card>
                </Col>
            </Row>
        </List>
    );
};

export default index;