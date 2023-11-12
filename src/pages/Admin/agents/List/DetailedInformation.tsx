import { Table, Row, Col, Card, TableProps } from 'antd';
import { useTable } from '@refinedev/antd';
import { CrudFilters } from '@refinedev/core';
import Filter from './Filter';
import FilterTags from '@/components/Admin/FilterTags';
import { useGetSiteSetting } from '@/hooks';
import useColumns from './hooks/useColumns';
import { DataType, TSearchProps } from './types';

const DetailedInformation = () => {
    const siteSetting = useGetSiteSetting();
    const rolesMapping = siteSetting?.roles || {};
    const columns = useColumns();

    const { tableProps, searchFormProps } = useTable({
        resource: 'users',
        pagination: {
            pageSize: 20,
        },
        meta: {
            populate: {
                role: {
                    fields: ['type'],
                },
            },
        },
        filters: {
            permanent: [
                {
                    field: 'role.id',
                    operator: 'eq',
                    value: rolesMapping?.['agent'],
                },
            ],
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
                    field: 'display_name',
                    operator: 'contains',
                    value: values?.display_name,
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

    // const user_ids = tableProps?.dataSource?.map((user) => user?.id);

    const formattedTableProps = {
        ...tableProps,
        dataSource: tableProps?.dataSource?.map((user) => {
            return {
                ...user,
            };
        }),
        tableLayout: 'fixed',
        size: 'small',
        columns,
        rowKey: 'userId',
        pagination: {
            ...tableProps?.pagination,
            showSizeChanger: true,
            pageSizeOptions: ['20', '50', '100', '500', '1000'],
        },
    } as TableProps<DataType>;

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
                    </div>
                    <Table {...formattedTableProps} />
                    <hr className="my-8" />
                </Card>
            </Col>
        </Row>
    );
};

export default DetailedInformation;
