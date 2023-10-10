import { useEffect } from 'react';
import { Form, Switch, Select, FormProps, InputNumber } from 'antd';
import { useGetSiteSetting } from '@/hooks';
import { CloseOutlined } from '@ant-design/icons';
import { useSelect } from '@refinedev/antd';
import { ratio } from './ratio';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
}> = ({ formType, formProps, handler }) => {
    console.log('⭐  formType:', formType);
    const form = formProps.form;
    const siteSetting = useGetSiteSetting();

    const defaultCurrency = siteSetting?.default_currency || 'KRW';
    const supportCurrencies = siteSetting?.support_currencies || ['KRW'];

    const defaultAmountType = siteSetting?.default_amount_type || 'CASH';
    const supportAmountTypes = siteSetting?.support_amount_types || ['CASH'];

    const { selectProps: vipSelectProps } = useSelect({
        resource: 'vips',
        optionLabel: 'label',
        optionValue: 'id',
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (defaultCurrency && defaultAmountType && form) {
                form?.setFieldsValue({
                    currency: defaultCurrency,
                    amount_type: defaultAmountType,
                });
            }
        }, 0);

        return () => {
            clearTimeout(timeout);
        };
    }, [defaultCurrency, defaultAmountType, form]);

    return (
        <Form {...formProps} onFinish={handler} layout="vertical">
            <div className="grid grid-cols-3 gap-6">
                <Form.Item className="w-full" label="valid_bet_amount_threshold" name={['valid_bet_amount_threshold']} rules={[{ required: true, message: 'value is required' }]}>
                    <InputNumber min={0} precision={0} className="w-full" />
                </Form.Item>
                <Form.Item className="w-full" label="discount_limit" name={['discount_limit']} rules={[{ required: true, message: 'value is required' }]}>
                    <InputNumber min={0} precision={0} className="w-full" />
                </Form.Item>

                <Form.Item label="VIPS" name={['vips']}>
                    <Select {...vipSelectProps} allowClear mode="multiple" />
                </Form.Item>
            </div>

            <div className="bg-gray-100 p-4 rounded-xl mb-4">
                <div className="flex items-center">
                    <Form.Item className="mr-6 w-full" label="Currency" name={['currency']}>
                        <Select
                            options={supportCurrencies.map((currency: string) => ({
                                label: currency,
                                value: currency,
                            }))}
                            disabled={supportCurrencies.length < 2}
                        />
                    </Form.Item>
                    <Form.Item className="mr-6 w-full" label="Amount Type" name={['amount_type']}>
                        <Select
                            options={supportAmountTypes.map((amountType: string) => ({
                                label: amountType,
                                value: amountType,
                            }))}
                            disabled={supportAmountTypes.length < 2}
                        />
                    </Form.Item>
                    <CloseOutlined className="opacity-0" />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-x-6 gap-y-2 bg-yellow-50 p-4 rounded-xl mb-4">
                <div className="flex items-center">
                    Apply All <Switch className="ml-4" />
                </div>
                <div>
                    <p className="mb-2">live</p>
                    <InputNumber min={0} className="w-full" addonAfter="%" />
                </div>
                <div>
                    <p className="mb-2">slot</p>
                    <InputNumber min={0} className="w-full" addonAfter="%" />
                </div>
            </div>

            {ratio.map((item, index) => {
                return (
                    <div key={item.gameProvider} className="grid grid-cols-3 gap-x-6 gap-y-2 bg-gray-100 p-4 rounded-xl mb-4">
                        {Object.keys(item).map((key) => {
                            if (key === 'gameProvider') return <div className="flex items-center">{item?.[key]}</div>;
                            return (
                                <Form.Item className="w-full m-0" label={key} name={['ratio', index, key]} rules={[{ required: true, message: 'value is required' }]}>
                                    <InputNumber min={0} className="w-full" addonAfter="%" />
                                </Form.Item>
                            );
                        })}
                    </div>
                );
            })}
        </Form>
    );
};

export default FormComponent;
