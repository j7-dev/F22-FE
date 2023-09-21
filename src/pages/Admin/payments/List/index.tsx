import { Table, Row, Col, Card, TablePaginationConfig } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable, List } from '@refinedev/antd';
import Filter from './Filter';
import FilterTags from '@/components/FilterTags';
import { getStatusTag } from '@/utils';
import { TUser } from '@/types';
import UserLink from '@/components/Admin/UserLink';
import VipLink from '@/components/Admin/VipLink';
import Amount from '@/components/Admin/Amount';
import { CrudFilters } from '@refinedev/core';
import { DateTime } from '@/components/PureComponents';
import { nanoid } from 'nanoid';
import ApproveButton from './ApporveButton';
import { DataType, TSearchProps } from './types';
import { listTypeAtom, selectedRecordsAtom } from './atom';
import { useAtomValue, useSetAtom } from 'jotai';

const index = () => {
    const listType = useAtomValue(listTypeAtom);

    const setSelectedRecords = useSetAtom(selectedRecordsAtom);

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
                    value: listType,
                },
            ],
            initial:
                listType === 'WITHDRAW'
                    ? [
                          {
                              field: 'status',
                              operator: 'eq',
                              value: 'PENDING',
                          },
                      ]
                    : undefined,
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

    const columns: ColumnsType<DataType> = [
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
            title: 'amount',
            dataIndex: 'amount',
            render: (amount, record) => <Amount amount={amount} currency={record?.currency} symbol />,
        },
        {
            title: 'status',
            dataIndex: 'status',
            render: (status: string) => getStatusTag(status),
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
            title: 'vip',
            dataIndex: 'vip',
            render: (_, record) => <VipLink vip={record?.user?.vip} />,
        },
        {
            title: 'title',
            dataIndex: 'title',
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
        pagination: {
            showSizeChanger: true,
            total: (tableProps?.pagination as TablePaginationConfig)?.total,
        },
        rowSelection:
            listType === 'WITHDRAW'
                ? {
                      type: 'checkbox',
                      onChange: (_: number[], records: DataType[]) => {
                          setSelectedRecords(records);
                      },
                      getCheckboxProps: (record: DataType) => ({
                          disabled: record.status !== 'PENDING', // Column configuration not to be checked
                      }),
                  }
                : undefined,
    };

    const filterTagsKey = JSON.stringify(searchFormProps?.form?.getFieldsValue());

    return (
        <List>
            <Row gutter={[16, 16]}>
                <Col lg={6} xs={24}>
                    <Card title="Filters">
                        <Filter formProps={searchFormProps} />
                    </Card>
                </Col>
                <Col lg={18} xs={24}>
                    <Card title="Search Result">
                        <div className="mb-4">
                            <FilterTags key={filterTagsKey} form={searchFormProps.form} />
                        </div>
                        {listType === 'WITHDRAW' && (
                            <div className="mb-4">
                                <ApproveButton />
                            </div>
                        )}

                        <Table
                            {...formattedTableProps}
                            summary={(pageData) => {
                                const currencies = pageData.map((record) => record.currency);
                                const uniqueCurrencies = [...new Set(currencies)];

                                return (
                                    <Table.Summary fixed>
                                        <Table.Summary.Row>
                                            <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                                            <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                            <Table.Summary.Cell index={2}>
                                                {uniqueCurrencies.map((currency) => {
                                                    const totalByCurrency = pageData.filter((data) => data.currency === currency).reduce((sum, record) => sum + record.amount, 0);
                                                    return <Amount key={nanoid()} amount={totalByCurrency} currency={currency} symbol />;
                                                })}
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    </Table.Summary>
                                );
                            }}
                        />
                        <hr className="my-8" />
                    </Card>
                </Col>
            </Row>
        </List>
    );
};

export default index;
