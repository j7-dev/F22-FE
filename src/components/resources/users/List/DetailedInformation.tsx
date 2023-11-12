import { useState } from 'react';
import { Table, Row, Col, Card, Switch, TableProps, Tooltip } from 'antd';
import { useTable } from '@refinedev/antd';
import { TRoleType, TUser } from '@/types';
import { CrudFilters } from '@refinedev/core';
import Filter from './Filter';
import FilterTags from '@/components/Admin/FilterTags';
import { useGetSiteSetting } from '@/hooks';
import useColumns from './hooks/useColumns';
import { DataType, TSearchProps } from './types';
import useDpWdUserInfo from './hooks/useDpWdUserInfo';

const DetailedInformation: React.FC<{
    roleType?: TRoleType | TRoleType[];
}> = ({ roleType = 'authenticated' }) => {
    const siteSetting = useGetSiteSetting();
    const currency = siteSetting?.default_currency || 'KRW';
    const amount_type = siteSetting?.default_amount_type || 'CASH';
    const rolesMapping = siteSetting?.roles || {};
    const columns = useColumns();

    const filters: CrudFilters = Array.isArray(roleType)
        ? [
              {
                  operator: 'or',
                  value: roleType.map((r) => ({
                      field: 'role.id',
                      operator: 'eq',
                      value: rolesMapping?.[r],
                  })),
              },
          ]
        : [
              {
                  field: 'role.id',
                  operator: 'eq',
                  value: rolesMapping?.[roleType],
              },
          ];

    const { tableProps, searchFormProps } = useTable({
        resource: 'users',
        meta: {
            populate: {
                vip: {
                    fields: ['label'],
                },
                role: {
                    fields: ['type'],
                },
                agent: {
                    fields: ['display_name', 'username'],
                },
                balances: {
                    fields: ['amount', 'currency', 'amount_type'],
                },
                transaction_records: {
                    fields: ['type', 'amount', 'currency', 'amount_type', 'status', 'createdAt'],
                    filters: {
                        $or: [
                            {
                                type: 'DEPOSIT',
                                status: 'SUCCESS',
                                currency,
                                amount_type,
                            },
                            {
                                type: 'WITHDRAW',
                                status: 'SUCCESS',
                                currency,
                                amount_type,
                            },
                            {
                                $and: [
                                    {
                                        type: 'BET',
                                        status: 'SUCCESS',
                                        currency,
                                        amount_type,
                                    },
                                ],
                            },
                        ],
                    },
                    sort: 'createdAt:desc',
                },
            },
        },
        filters: {
            permanent: filters,
        },
        sorters: {
            initial: [
                {
                    field: 'createdAt',
                    order: 'desc',
                },
            ],
        },
        onSearch: (values: TSearchProps) => {
            const start = values?.dateRange ? values?.dateRange[0]?.startOf('day').format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined;
            const end = values?.dateRange ? values?.dateRange[1]?.endOf('day').format('YYYY-MM-DD HH:mm:ss.SSSSSS') : undefined;

            const defaultFilters = [
                {
                    field: 'createdAt',
                    operator: 'gt',
                    value: start,
                },
                {
                    field: 'createdAt',
                    operator: 'lt',
                    value: end,
                },
                {
                    field: 'id',
                    operator: 'contains',
                    value: values?.id,
                },
                {
                    field: 'username',
                    operator: 'contains',
                    value: values?.username,
                },
                {
                    field: 'phone',
                    operator: 'contains',
                    value: values?.phone,
                },
                {
                    field: 'display_name',
                    operator: 'contains',
                    value: values?.display_name,
                },
                {
                    field: 'vip.id',
                    operator: 'eq',
                    value: values?.vip,
                },
                {
                    field: 'agent.id',
                    operator: 'eq',
                    value: values?.agent,
                },
                {
                    field: 'top_agent.id',
                    operator: 'eq',
                    value: values?.top_agent,
                },
                {
                    field: 'blocked',
                    operator: 'eq',
                    value: values?.blocked,
                },
                {
                    field: 'confirmed',
                    operator: 'eq',
                    value: values?.confirmed,
                },
            ];
            return defaultFilters as CrudFilters;
        },
    });

    const [extendTableProps, setExtendTableProps] = useState<TableProps<DataType>>({});

    const user_ids = ((tableProps?.dataSource || []) as TUser[])?.map((user) => user?.id) || [];
    const { data: dpWdUserInfoData } = useDpWdUserInfo({ user_ids });
    const dpWdUserInfos = dpWdUserInfoData?.data?.data || [];

    const formattedTableProps = {
        ...tableProps,
        ...extendTableProps,
        dataSource: tableProps?.dataSource?.map((user) => {
            const { user_id: _user_id, ...dpWdUserInfo } = dpWdUserInfos.find((item) => item?.user_id === user?.id) || {};
            return {
                ...user,
                ...dpWdUserInfo,
            };
        }),
        tableLayout: 'fixed',
        size: 'small',
        columns,
        rowKey: 'userId',
    } as TableProps<DataType>;

    const handleExpand = (checked: boolean) => {
        if (checked) {
            setExtendTableProps({
                scroll: { x: 3200 },
            });
        } else {
            setExtendTableProps({});
        }
    };

    return (
        <Row gutter={[16, 16]}>
            <Col lg={24} xs={24}>
                <Filter formProps={searchFormProps} />
            </Col>
            <Col lg={24} xs={24}>
                <Card bordered={false}>
                    <div className="mb-4 flex justify-between">
                        <div>
                            <FilterTags form={searchFormProps?.form} />
                        </div>
                        <Tooltip title="click to expand table">
                            <Switch size="small" onChange={handleExpand} />
                        </Tooltip>
                    </div>
                    <Table {...formattedTableProps} />
                    <hr className="my-8" />
                </Card>
            </Col>
        </Row>
    );
};
// TODO
// function dataSourceFormatter(dataSource: any) {
//     console.log('⭐  dataSourceFormatter  dataSource', dataSource);

//     return dataSource;
// }

export default DetailedInformation;
