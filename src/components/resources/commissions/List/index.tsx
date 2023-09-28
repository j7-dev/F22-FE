import { Table, Row, Col, Card, TablePaginationConfig, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable, List, EditButton, DeleteButton } from '@refinedev/antd';
import { DateTime, BooleanIndicator } from '@/components/PureComponents';
import { DataType } from './types';
import { selectedRecordsAtom } from './atom';
import { useSetAtom } from 'jotai';

const index = () => {
    const setSelectedRecords = useSetAtom(selectedRecordsAtom);

    const { tableProps } = useTable({
        resource: 'commissions',
        meta: {
            populate: {
                agents: {
                    fields: ['id', 'display_name'],
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
            title: 'enabled',
            dataIndex: 'enabled',
            render: (enabled: boolean) => <BooleanIndicator enabled={enabled} />,
        },
        {
            title: 'label',
            dataIndex: 'label',
        },
        {
            title: 'description',
            dataIndex: 'description',
        },
        {
            title: 'type',
            dataIndex: 'type',
        },
        {
            title: 'currency',
            dataIndex: 'currency',
        },
        {
            title: 'Amount Type',
            dataIndex: 'amount_type',
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
        pagination: {
            showSizeChanger: true,
            total: (tableProps?.pagination as TablePaginationConfig)?.total,
        },
        rowSelection: {
            type: 'checkbox',
            onChange: (_: number[], records: DataType[]) => {
                setSelectedRecords(records);
            },
        },
    } as TableProps<DataType>;

    return (
        <List canCreate>
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
