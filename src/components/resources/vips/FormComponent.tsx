import { Form, FormProps, InputNumber, Switch, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import AmountInput from '@/components/form/AmountInput';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    formLoading?: boolean;
}> = ({ formType: _formType, formProps, handler, formLoading: _formLoading }) => {
    const { t } = useTranslation();

    return (
        <Form {...formProps} onFinish={handler} layout="vertical">
            <AmountInput amountProps={{ hide: true }} />

            <div className="grid grid-cols-3 gap-6">
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
    );
};

export default FormComponent;
