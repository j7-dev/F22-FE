import { Form, Input, InputNumber, Switch, Modal, ModalProps } from 'antd';
import { modalShowAtom } from './atom';
import { useAtom } from 'jotai';

const ModalForm: React.FC<{ modalProps: ModalProps }> = ({ modalProps }) => {
    const form = Form.useFormInstance();
    const [modalShow, setModalShow] = useAtom(modalShowAtom);

    return (
        <Modal {...modalProps} open={modalShow} onCancel={() => setModalShow(false)}>
            <Form form={form} layout="vertical">
                <div className="grid grid-cols-2 gap-6">
                    <Form.Item
                        name="label"
                        label="Label"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a value',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="order"
                        label="Level"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a value',
                            },
                        ]}
                    >
                        <InputNumber min={0} className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="upgrade_award"
                        label="Vip Upgrade Reward"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a value',
                            },
                        ]}
                    >
                        <InputNumber min={0} className="w-full" />
                    </Form.Item>
                    <Form.Item name="activated" valuePropName="checked" label="Activated" initialValue={true}>
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        name="deposit_upgrade_threshold"
                        label="Upgrade - Deposit Amount"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a value',
                            },
                        ]}
                    >
                        <InputNumber min={0} className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="valid_bet_amount_upgrade_threshold"
                        label="Upgrade - Valid Bet"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a value',
                            },
                        ]}
                    >
                        <InputNumber min={0} className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="deposit_downgrade_threshold"
                        label="Retain - Deposit Amount"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a value',
                            },
                        ]}
                    >
                        <InputNumber min={0} className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="valid_bet_amount_downgrade_threshold"
                        label="Retain - Valid Bet"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a value',
                            },
                        ]}
                    >
                        <InputNumber min={0} className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="upgrade_evaluation_interval"
                        label="Upgrade Evaluation Interval"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a value',
                            },
                        ]}
                    >
                        <InputNumber min={0} className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="vip_duration"
                        label="VIP Duration"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a value',
                            },
                        ]}
                    >
                        <InputNumber min={0} className="w-full" />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default ModalForm;
