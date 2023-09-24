import { useEffect } from 'react';
import { Form, Input, Switch, Select, FormProps, InputNumber, Button } from 'antd';
import { commissionTypes } from '@/types';
import { useGetSiteSetting, useUserSelect } from '@/hooks';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
}> = ({ formType, formProps, handler }) => {
    const form = formProps.form;
    const siteSetting = useGetSiteSetting();

    const defaultCurrency = siteSetting?.default_currency || 'KRW';
    const supportCurrencies = siteSetting?.support_currencies || ['KRW'];

    const defaultAmountType = siteSetting?.defaut_amount_type || 'CASH';
    const supportAmountTypes = siteSetting?.support_amount_types || ['CASH'];

    const { selectProps: agentSelectProps } = useUserSelect({
        roleType: 'agent',
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
                <Form.Item
                    name={['label']}
                    label="label"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name={['type']} label="type" initialValue={formType === 'create' ? commissionTypes[0] : undefined}>
                    <Select
                        options={commissionTypes.map((type) => ({
                            label: type,
                            value: type,
                        }))}
                        disabled={commissionTypes.length < 2}
                    />
                </Form.Item>
                <Form.Item name={['enabled']} valuePropName="checked" label="enabled" initialValue={formType === 'create' ? true : undefined}>
                    <Switch />
                </Form.Item>
            </div>
            <Form.Item name={['agents']} label="Agents">
                <Select {...agentSelectProps} mode="multiple" />
            </Form.Item>
            <Form.Item name={['description']} label="description">
                <Input.TextArea />
            </Form.Item>

            <div className="bg-gray-100 p-4 rounded-xl">
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

                <Form.List name="formula">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="flex items-center">
                                    <Form.Item {...restField} label="Thresholds" className="mr-6 w-full" name={[name, 'gt']} rules={[{ required: true, message: 'thresholds is required' }]}>
                                        <InputNumber min={0} precision={0} className="w-full" placeholder="First Name" />
                                    </Form.Item>
                                    <Form.Item {...restField} label="Commission Ratio (max 100%)" className="mr-6 w-full" name={[name, 'ratio']} rules={[{ required: true, message: 'commission ratio is required' }]}>
                                        <InputNumber min={0} max={100} precision={2} className="w-full" addonAfter="%" />
                                    </Form.Item>

                                    <CloseOutlined className="mt-2 text-rose-500" onClick={() => remove(name)} />
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </div>
        </Form>
    );
};

export default FormComponent;
