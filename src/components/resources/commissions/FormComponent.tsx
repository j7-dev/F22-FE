import { useEffect } from 'react';
import { Form, Input, Switch, Select, FormProps, InputNumber, Button } from 'antd';
import { commissionTypes, TUser } from '@/types';
import { useGetSiteSetting, useUserSelect } from '@/hooks';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    formLoading?: boolean;
}> = ({ formType, formProps, handler, formLoading }) => {
    const form = formProps.form;
    const { default_currency, default_amount_type, support_currencies, support_amount_types } = useGetSiteSetting();

    const { selectProps: agentSelectProps } = useUserSelect({
        roleType: 'agent',
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (default_currency && default_amount_type && form) {
                form?.setFieldsValue({
                    currency: default_currency,
                    amount_type: default_amount_type,
                });
            }
        }, 0);

        return () => {
            clearTimeout(timeout);
        };
    }, [default_currency, default_amount_type, form]);

    useEffect(() => {
        if (!formLoading && formProps.initialValues) {
            if (Array.isArray(formProps?.initialValues?.agents as TUser[])) {
                const agent_ids = ((formProps?.initialValues?.agents || []) as TUser[]).map((item) => item.id);
                formProps.initialValues.agents = agent_ids;
            }
        }
    }, [formLoading]);

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
                            options={support_currencies.map((currency: string) => ({
                                label: currency,
                                value: currency,
                            }))}
                            disabled={support_currencies.length < 2}
                        />
                    </Form.Item>
                    <Form.Item className="mr-6 w-full" label="Amount Type" name={['amount_type']}>
                        <Select
                            options={support_amount_types.map((amountType: string) => ({
                                label: amountType,
                                value: amountType,
                            }))}
                            disabled={support_amount_types.length < 2}
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
                                        <InputNumber min={0} precision={0} className="w-full" />
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
