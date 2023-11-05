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

const index = () => {
    const { tableProps } = useTable<DataType, HttpError>({
        resource: 'vips',
    }) as {
        tableProps: TableProps<DataType>;
    };
    const [form] = Form.useForm();
    const modalProps = useAtomValue(modalPropsAtom);

    return (
        <>
            <List canCreate={false}>
                <Form form={form} layout="vertical">
                    <div className="mb-4">
                        <CreateButton />
                    </div>

                    <Table {...tableProps} rowKey="id">
                        <Table.Column dataIndex="order" title="level" />
                        <Table.Column dataIndex="label" title="label" />
                        <Table.Column dataIndex="turnover_rate" title="Turnover Rate" render={(v) => `${v || 0}%`} />

                        <Table.Column dataIndex="deposit_upgrade_threshold" title="Upgrade - Deposit Amount" />
                        <Table.Column dataIndex="valid_bet_amount_upgrade_threshold" title="Upgrade - Valid Bet" />
                        <Table.Column dataIndex="activated" title="status" render={(activated) => <Tag color={activated ? '#87d068' : '#ff4d4f'}>{activated ? 'Enable' : 'Disable'}</Tag>} />
                        <Table.Column dataIndex="upgrade_evaluation_interval" title="Interval" />
                        <Table.Column dataIndex="action" render={(_, record: DataType) => <EditButton record={record} />} />
                    </Table>

                    <ModalForm modalProps={modalProps} />
                </Form>
            </List>
        </>
    );
};

export default index;
