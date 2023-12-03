import { Table, Row, Col, Card } from 'antd';
import { TUser } from '@/types';
import UserLink from '@/components/Admin/UserLink';
import { ColumnsType, TableProps } from 'antd/es/table';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import { useTranslation } from 'react-i18next';
import { useTable } from '@refinedev/antd';
import FilterTags from '@/components/Admin/FilterTags';
import Filter from './Filter';
import { CrudFilters } from '@refinedev/core';
import { TSearchProps } from './types';

type TData = {
    game_provider: string;
    debit: number;
    credit: number;
    winLoss: number;
};

type DataType = {
    user: TUser;
    data: TData[];
};

const index = () => {
    const { t } = useTranslation();

    const { tableProps, searchFormProps } = useTable<DataType>({
        resource: 'utility/statistic/member-betting-records',
        pagination: {
            pageSize: 20,
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
                    field: 'username',
                    operator: 'contains',
                    value: values?.username,
                },
            ];

            return filters as CrudFilters;
        },
    });

    const gpColumns: ColumnsType<DataType> =
        tableProps?.dataSource?.[0]?.data?.map((item) => {
            const game_provider = item?.game_provider;
            return {
                align: 'center',
                title: t(game_provider),
                children: [
                    {
                        align: 'center',
                        title: t('Debit'),
                        dataIndex: 'data',
                        key: `${game_provider}_debit`,
                        render: (v: TData[]) => {
                            const findItem = v.find((d) => d.game_provider === game_provider);
                            return <SimpleAmount amount={findItem?.debit || 0} />;
                        },
                    },
                    {
                        align: 'center',
                        title: t('Credit'),
                        dataIndex: 'data',
                        key: `${game_provider}_credit`,
                        render: (v: TData[]) => {
                            const findItem = v.find((d) => d.game_provider === game_provider);
                            return <SimpleAmount amount={findItem?.credit || 0} />;
                        },
                    },
                    {
                        align: 'center',
                        title: t('WinLoss'),
                        dataIndex: 'data',
                        key: `${game_provider}_winLoss`,
                        render: (v: TData[]) => {
                            const findItem = v.find((d) => d.game_provider === game_provider);
                            return <SimpleAmount amount={findItem?.winLoss || 0} />;
                        },
                    },
                ],
            };
        }) || [];

    const columns: ColumnsType<DataType> = [
        {
            align: 'center',
            title: t('User'),
            dataIndex: 'user',
            render: (user: TUser) => <UserLink user={user} />,
        },
        ...gpColumns,
    ];

    const formattedTableProps = {
        ...tableProps,
        scroll: { x: 1400 },
        columns,
        rowKey: 'user_id',
        size: 'small',
        bordered: true,
        pagination: {
            ...tableProps?.pagination,
            showSizeChanger: true,
            pageSizeOptions: ['20', '50', '100', '500', '1000'],
        },
    } as TableProps<DataType>;
    const filterTagsKey = JSON.stringify(searchFormProps?.form?.getFieldsValue());

    return (
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
                </Card>
            </Col>
        </Row>
    );
};

export default index;
