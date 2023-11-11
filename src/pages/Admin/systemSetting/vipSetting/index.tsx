import { List, useTable } from '@refinedev/antd';
import { Table, Tag, Form } from 'antd';
import { HttpError } from '@refinedev/core';
import { TableProps } from 'antd/lib/table';
import CreateButton from './CreateButton';
import EditButton from './EditButton';
import ModalForm from './ModalForm';
import { DataType } from './types';
import { modalPropsAtom } from './atom';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';

const index = () => {
    const { tableProps } = useTable<DataType, HttpError>({
        resource: 'vips',
        sorters: {
            initial: [
                {
                    field: 'order',
                    order: 'asc',
                },
                {
                    field: 'updated_at',
                    order: 'asc',
                },
            ],
        },
    }) as {
        tableProps: TableProps<DataType>;
    };
    const [form] = Form.useForm();
    const modalProps = useAtomValue(modalPropsAtom);
    const { t } = useTranslation();

    return (
        <>
            <List canCreate={false}>
                <Form form={form} layout="vertical">
                    <div className="mb-4">
                        <CreateButton />
                    </div>

                    <Table {...tableProps} rowKey="id">
                        <Table.Column dataIndex="order" title={t('level') as string} />
                        <Table.Column dataIndex="label" title={t('label') as string} />
                        <Table.Column dataIndex="turnover_rate" title={t('Turnover Rate') as string} render={(v) => `${v || 0}%`} />

                        <Table.Column dataIndex="deposit_upgrade_threshold" title={t('Upgrade - Deposit Amount') as string} />
                        <Table.Column dataIndex="valid_bet_amount_upgrade_threshold" title={t('Upgrade - Valid Bet') as string} />
                        <Table.Column dataIndex="activated" title={t('status') as string} render={(activated) => <Tag color={activated ? '#87d068' : '#ff4d4f'}>{activated ? 'Enable' : 'Disable'}</Tag>} />
                        <Table.Column dataIndex="action" render={(_, record: DataType) => <EditButton record={record} />} />
                    </Table>

                    <ModalForm modalProps={modalProps} />
                </Form>
            </List>
        </>
    );
};

export default index;
