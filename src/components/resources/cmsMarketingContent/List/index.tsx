import { Table, Row, Col, Card, TableProps } from 'antd';
import { useTable, List } from '@refinedev/antd';
import { DataType, TPosition } from './types';
import { RESOURCE } from '../constants';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'lodash-es';
import { useColumns } from './hooks/useColumns';

const index = ({ position }: { position: TPosition }) => {
    const { t } = useTranslation();
    const { tableProps } = useTable({
        resource: RESOURCE,
        pagination: {
            pageSize: 20,
        },
        filters: {
            permanent: [
                {
                    field: 'position',
                    operator: 'eq',
                    value: position,
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
        meta: {
            populate: {
                feature_image: {
                    fields: ['formats', 'url'],
                },
                feature_image_mobile: {
                    fields: ['formats', 'url'],
                },
            },
        },
    });

    const columns = useColumns(position);

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
            resource={position}
            canCreate
            createButtonProps={{
                children: t('Create'),
            }}
            title={t(`${capitalize(position)} Management`)}
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
