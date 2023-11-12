import { Table, Row, Col, Card, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable, List, EditButton, DeleteButton } from '@refinedev/antd';
import { DateTime } from '@/components/PureComponents';
import { DataType } from './types';
import { TVip } from '@/types';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import { useTranslation } from 'react-i18next';

const index = () => {
    const { t } = useTranslation();
    const { tableProps } = useTable({
        resource: 'deposit-bonuses',
        pagination: {
            pageSize: 20,
        },
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
            title: t('#'),
            dataIndex: 'id',
        },
        {
            title: t('Label'),
            dataIndex: 'label',
        },
        {
            title: t('Bonus Rate'),
            dataIndex: 'bonus_rate',
        },
        {
            title: t('Min Deposit Amount'),
            dataIndex: 'min_deposit_amount',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Max Bonus Amount'),
            dataIndex: 'max_bonus_amount',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Rolling Percentage'),
            dataIndex: 'rolling_percentage',
            render: (v: number) => `${v}%`,
        },
        {
            title: t('Allow Game Categories'),
            dataIndex: 'allow_game_categories',
            render: (v: string[]) => (Array.isArray(v) ? v.join(', ') : ''),
        },
        {
            title: t('VIPS'),
            dataIndex: 'vips',
            render: (v: TVip[]) => (v || [])?.map((vip: any) => vip?.label).join(', '),
        },
        {
            title: t('Date'),
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
            ...tableProps?.pagination,
            showSizeChanger: true,
            pageSizeOptions: ['20', '50', '100', '500', '1000'],
        },
    } as TableProps<DataType>;

    return (
        <List
            title={t('Deposit Bonuses')}
            resource="deposit-bonuses"
            canCreate
            createButtonProps={{
                children: t('Create'),
            }}
        >
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
