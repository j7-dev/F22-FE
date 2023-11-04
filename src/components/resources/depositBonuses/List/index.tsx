import { Table, Row, Col, Card, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable, List, EditButton, DeleteButton } from '@refinedev/antd';
import { DateTime } from '@/components/PureComponents';
import { DataType } from './types';
import { TVip } from '@/types';

const index = () => {
    const { tableProps } = useTable({
        resource: 'deposit-bonuses',
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
            title: 'Label',
            dataIndex: 'label',
        },
        {
            title: 'Bonus Rate',
            dataIndex: 'bonus_rate',
        },
        {
            title: 'Min Deposit Amount',
            dataIndex: 'min_deposit_amount',
            render: (v: number) => (v || 0).toLocaleString(),
        },
        {
            title: 'Max Bonus Amount',
            dataIndex: 'max_bonus_amount',
            render: (v: number) => (v || 0).toLocaleString(),
        },
        {
            title: 'Rolling Percentage',
            dataIndex: 'rolling_percentage',
            render: (v: number) => `${v}%`,
        },
        {
            title: 'Allow Game Categories',
            dataIndex: 'allow_game_categories',
            render: (v: string[]) => (Array.isArray(v) ? v.join(', ') : ''),
        },
        {
            title: 'VIPS',
            dataIndex: 'vips',
            render: (v: TVip[]) => (v || [])?.map((vip: any) => vip?.label).join(', '),
        },
        {
            title: 'Date',
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
        <List resource="deposit-bonuses" canCreate>
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
