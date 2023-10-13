import { Table, Row, Col, Card, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable, List, EditButton, DeleteButton } from '@refinedev/antd';
import { DateTime } from '@/components/PureComponents';
import { DataType } from './types';

import Amount from '@/components/Admin/Amount';
import { TVip } from '@/types';

const index = () => {
    const { tableProps } = useTable({
        resource: 'discounts',
        meta: {
            populate: {
                vips: {
                    fields: ['id', 'label'],
                },
            },
        },
    });

    const columns: ColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'valid_bet_amount_threshold',
            dataIndex: 'valid_bet_amount_threshold',
            render: (v: number, record) => <Amount amount={v} currency={record?.currency} />,
        },
        {
            title: 'discount_limit',
            dataIndex: 'discount_limit',
            render: (v: number, record) => <Amount amount={v} currency={record?.currency} />,
        },
        {
            title: 'amount_type',
            dataIndex: 'amount_type',
        },
        {
            title: 'vips',
            dataIndex: 'vips',
            render: (v: TVip[]) => (v || [])?.map((vip: any) => vip?.label).join(', '),
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
        <List resource="discounts" canCreate>
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
