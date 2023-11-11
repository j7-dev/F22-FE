import { Form, Input, InputNumber, Switch, Modal, ModalProps } from 'antd';
import { modalShowAtom } from './atom';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import AmountInput from '@/components/form/AmountInput';

const ModalForm: React.FC<{ modalProps: ModalProps }> = ({ modalProps }) => {
    const form = Form.useFormInstance();
    const [modalShow, setModalShow] = useAtom(modalShowAtom);
    const { t } = useTranslation();

    return (
        <Modal {...modalProps} open={modalShow} onCancel={() => setModalShow(false)}>
            <Form form={form} layout="vertical">
                <AmountInput amountProps={{ hide: true }} />
                <div className="grid grid-cols-2 gap-6">
                    <Form.Item
                        name="label"
                        label={t('Label')}
                        rules={[
                            {
                                required: true,
                                message: t('Please input a value'),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="order"
                        label={t('Level')}
                        rules={[
                            {
                                required: true,
                                message: t('Please input a value'),
                            },
                        ]}
                    >
                        <InputNumber min={0} className="w-full" />
                    </Form.Item>

                    <Form.Item name="activated" valuePropName="checked" label={t('Activated')} initialValue={true}>
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        name="deposit_upgrade_threshold"
                        label={t('Upgrade - Deposit Amount')}
                        rules={[
                            {
                                required: true,
                                message: t('Please input a value'),
                            },
                        ]}
                    >
                        <InputNumber min={0} className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="valid_bet_amount_upgrade_threshold"
                        label={t('Upgrade - Valid Bet')}
                        rules={[
                            {
                                required: true,
                                message: t('Please input a value'),
                            },
                        ]}
                    >
                        <InputNumber min={0} className="w-full" />
                    </Form.Item>

                    <Form.Item
                        name="turnover_rate"
                        label={t('Turnover rate')}
                        rules={[
                            {
                                required: true,
                                message: t('Please input a value'),
                            },
                        ]}
                    >
                        <InputNumber min={0} className="w-full" addonAfter="%" />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default ModalForm;
