import { Table, Row, Col, Card } from 'antd';
import { useTable } from '@refinedev/antd';
import { TRoleType } from '@/types';
import { Dayjs } from 'dayjs';
import { CrudFilters } from '@refinedev/core';
import Filter from './Filter';
import FilterTags from '@/components/Admin/FilterTags';
import { useGetSiteSetting } from '@/hooks';
import useColumns from './hooks/useColumns';

type TSearchProps = {
    email?: string;
    dateRange?: [Dayjs, Dayjs] | undefined;
    [key: string]: any;
};

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
                    fields: ['display_name'],
                },
                top_agent: {
                    fields: ['display_name'],
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
        onSearch: (values: TSearchProps) => {
            return values?.dateRange
                ? [
                      {
                          field: 'email',
                          operator: 'contains',
                          value: values?.email,
                      },
                      {
                          field: 'createdAt',
                          operator: 'gt',
                          value: values?.dateRange[0]?.format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                      },
                      {
                          field: 'createdAt',
                          operator: 'lt',
                          value: values?.dateRange[1]?.format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                      },
                  ]
                : [
                      {
                          field: 'email',
                          operator: 'contains',
                          value: values?.email,
                      },
                  ];
        },
    });

    const formattedTableProps = {
        ...tableProps,

        scroll: { x: 3200 },
        columns,
        rowKey: 'userId',
    };

    return (
        <Row gutter={[16, 16]}>
            <Col lg={6} xs={24}>
                <Card title="Filters">
                    <Filter formProps={searchFormProps} />
                </Card>
            </Col>
            <Col lg={18} xs={24}>
                <Card bordered={false} title="Search Result">
                    <div className="mb-4">
                        <FilterTags form={searchFormProps?.form} />
                    </div>
                    <Table<any> {...formattedTableProps} />
                    <hr className="my-8" />
                </Card>
            </Col>
        </Row>
    );
};

export default DetailedInformation;
