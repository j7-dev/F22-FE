import { Table, Row, Col, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable, ShowButton, EditButton } from '@refinedev/antd';
import { TRoleType, TVip } from '@/types';
import { Link } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { BooleanIndicator } from '@/components/PureComponents';
import { useCustom, CrudFilters } from '@refinedev/core';
import { API_URL } from '@/utils';
import Filter from './Filter';
import FilterTags from '@/components/FilterTags';
import { useGetSiteSetting } from '@/hooks';

type TSearchProps = {
    email?: string;
    dateRange?: [Dayjs, Dayjs] | undefined;
    [key: string]: any;
};

const DetailedInformation: React.FC<{
    roleType?: TRoleType | TRoleType[];
}> = ({ roleType = 'authenticated' }) => {
    const siteSetting = useGetSiteSetting();
    const rolesMapping = siteSetting?.roles || {};

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

    const user_ids = tableProps?.dataSource?.map((user) => user.id) || [];
    const unique_user_ids = [...new Set(user_ids)];
    const { data: _balance } = useCustom({
        url: `${API_URL}/api/wallet-api/balance/get`,
        method: 'get',
        queryOptions: {
            enabled: unique_user_ids.length > 0,
        },
    });

    const columns: ColumnsType<any> = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Risk Management',
            dataIndex: 'memberAccount ',
        },
        {
            title: 'Account',
            dataIndex: 'username',
        },
        {
            title: 'Display Name',
            dataIndex: 'display_name',
            render: (text, record) => text || record?.username,
        },
        {
            title: 'Agent',
            dataIndex: 'agentId',
        },
        {
            title: 'birthday',
            dataIndex: 'birthday',
        },
        {
            title: 'Account Balance',
            dataIndex: 'balances',
            render: (_balances) => <></>,
        },
        {
            title: 'phone',
            dataIndex: 'phone',
        },
        {
            title: 'vip',
            dataIndex: 'vip',
            render: (vip: TVip) => <Link to="/refine/system-setting/vips">{vip?.label}</Link>,
        },
        {
            title: 'blocked',
            dataIndex: 'blocked',
            align: 'center',
            render: (blocked) => (
                <BooleanIndicator
                    enabled={!blocked}
                    tooltipProps={{
                        title: blocked ? 'Blocked' : 'Unblocked',
                        enabled: true,
                    }}
                />
            ),
        },
        {
            title: 'AnyTimeDiscount',
            dataIndex: 'anyTimeDiscount',
        },
        {
            title: 'Total Deposits',
            dataIndex: 'totalDeposits',
        },
        {
            title: 'Total Withdrawal',
            dataIndex: 'totalWithdrawal',
        },
        {
            title: 'DP-WD',
            dataIndex: 'dp-wd',
        },
        {
            title: 'Join Date',
            dataIndex: 'createdAt',
            render: (createdAt) => dayjs(createdAt).format('YYYY-MM-DD'),
        },
        {
            title: 'Last Bettime',
            dataIndex: 'lastBettime ',
        },
        {
            title: '',
            fixed: 'right',
            dataIndex: 'action',
            render: (_, record) => (
                <p className="m-0 whitespace-nowrap">
                    <ShowButton size="small" type="primary" shape="circle" recordItemId={record.id} hideText className="mr-2" />
                    <EditButton size="small" type="primary" shape="circle" recordItemId={record.id} hideText />
                </p>
            ),
        },
    ];

    const formattedTableProps = {
        ...tableProps,
        scroll: { x: 1600 },
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
                <Card title="Search Result">
                    <div className="mb-4">
                        <FilterTags form={searchFormProps?.form} />
                    </div>
                    <Table {...formattedTableProps} />
                    <hr className="my-8" />
                </Card>
            </Col>
        </Row>
    );
};

export default DetailedInformation;
