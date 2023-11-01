import { Table, Row, Col, Card, TablePaginationConfig, TableProps } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useTable, List } from '@refinedev/antd';
import Filter from './Filter';
import FilterTags from '@/components/Admin/FilterTags';
import { getStatusTag } from '@/utils';
import { TUser, TTransactionType, TDepositBonus } from '@/types';
import UserLink from '@/components/Admin/UserLink';
import VipLink from '@/components/Admin/VipLink';
import Amount from '@/components/Admin/Amount';
import { CrudFilters } from '@refinedev/core';
import { DateTime } from '@/components/PureComponents';
import { nanoid } from 'nanoid';
import ApproveButton from './ApporveButton';
import { DataType, TSearchProps, TParams } from './types';
import { selectedRecordsAtom } from './atom';
import { useSetAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { useGetSiteSetting } from '@/hooks';
import UserSummary from '@/components/Admin/UserSummary';
import BankAccount from '@/components/Admin/BankAccount';
import DepositBonusAmount from '@/components/Admin/DepositBonusAmount';

const index = () => {
    const { type: listTypeLowerCase, roleType } = useParams<TParams>();
    const siteSetting = useGetSiteSetting();
    const rolesMapping = siteSetting?.roles || {};

    const listType = (listTypeLowerCase || '')?.toUpperCase() as TTransactionType & 'ALL';

    const setSelectedRecords = useSetAtom(selectedRecordsAtom);

    const getPermanentFilters = (): CrudFilters => {
        const typeFilter =
            listType === 'ALL'
                ? []
                : [
                      {
                          field: 'type',
                          operator: 'eq',
                          value: listType,
                      },
                  ];
        const roleFilter = roleType
            ? [
                  {
                      field: 'user.role.id',
                      operator: 'eq',
                      value: rolesMapping?.[roleType],
                  },
              ]
            : [];

        const combinedFilter = [...typeFilter, ...roleFilter];

        const filters = (
            combinedFilter.length > 1
                ? [
                      {
                          operator: 'and',
                          value: combinedFilter,
                      },
                  ]
                : combinedFilter
        ) as CrudFilters;

        return filters;
    };

    const permanentFilters = getPermanentFilters();

    const { tableProps, searchFormProps } = useTable({
        resource: 'transaction-records',
        meta: {
            populate: {
                user: {
                    fields: ['id', 'display_name', 'username', 'bank_account'],
                    populate: {
                        vip: {
                            fields: ['label'],
                        },
                        role: {
                            fields: ['id'],
                        },
                    },
                },
            },
        },
        filters: {
            permanent: permanentFilters,
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
                    value: values?.dateRange ? values?.dateRange[0]?.startOf('day').format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
                },
                {
                    field: 'createdAt',
                    operator: 'lt',
                    value: values?.dateRange ? values?.dateRange[1]?.endOf('day').format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined,
                },
                {
                    field: 'type',
                    operator: 'eq',
                    value: values?.type,
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

    const columns: ColumnType<DataType>[] = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (createdAt: string) => <DateTime value={createdAt} />,
        },
        {
            title: 'Update Date',
            dataIndex: 'updatedAt',
            render: (updatedAt: string, record: DataType) => (record?.createdAt === updatedAt ? '' : <DateTime value={updatedAt} />),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            render: (amount, record) => <Amount amount={amount} currency={record?.currency} symbol />,
        },
        {
            title: 'Deposit Bonus',
            dataIndex: 'deposit_bonus',
            render: (deposit_bonus: TDepositBonus, record) => {
                return <DepositBonusAmount deposit_bonus={deposit_bonus} deposit_amount={record?.amount} />;
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: string) => getStatusTag(status),
        },
        {
            title: 'user',
            dataIndex: 'user',
            render: (user: TUser) => <UserLink user={user} />,
        },
        {
            title: 'Agent',
            dataIndex: 'agent',
        },
        {
            title: 'Vip',
            dataIndex: 'vip',
            render: (_, record) => <VipLink vip={record?.user?.vip} />,
        },

        {
            title: 'Bank Account',
            dataIndex: 'bankAccount',
            render: (_, record) => <BankAccount bank_account={record?.user?.bank_account} display="flex" />,
        },
        {
            title: 'Note',
            dataIndex: 'title',
        },
    ];

    const depositColumns = columns.filter((column) => column.dataIndex !== 'bankAccount');

    const formattedTableProps = {
        ...tableProps,
        scroll: { x: 1600 },
        columns: listType === 'DEPOSIT' ? depositColumns : columns,
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
            getCheckboxProps: (record: DataType) => ({
                disabled: record.status !== 'PENDING', // Column configuration not to be checked
            }),
        },
    } as TableProps<DataType>;

    const filterTagsKey = JSON.stringify(searchFormProps?.form?.getFieldsValue());

    return (
        <List>
            <Row gutter={[16, 16]}>
                <Col lg={24} xs={24}>
                    <Filter formProps={searchFormProps} />
                </Col>
                <Col lg={24} xs={24}>
                    <Card bordered={false}>
                        <div className="mb-4">
                            <FilterTags key={filterTagsKey} form={searchFormProps.form} />
                        </div>
                        <div className="mb-4">
                            <ApproveButton />
                        </div>

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
                            expandable={{
                                expandedRowRender: (record) => <UserSummary user={record?.user} />,
                                rowExpandable: (record) => record.type === 'WITHDRAW',
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
