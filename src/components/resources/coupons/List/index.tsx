import { Table, Row, Col, Card, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable, List, EditButton, DeleteButton } from '@refinedev/antd';
import { DataType } from './types';
import { TUser } from '@/types';
import { useTranslation } from 'react-i18next';
import UserLink from '@/components/Admin/UserLink';

const index = () => {
    const { t } = useTranslation();
    const { tableProps } = useTable({
        resource: 'coupons',
        meta: {
            populate: {
                user: {
                    fields: ['id', 'display_name'],
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
            render: (period: any) => {
                console.log('⭐  period:', period);
                return <></>;
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
