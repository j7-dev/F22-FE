import { useEffect } from 'react';
import { Form, FormProps, InputNumber, Checkbox, Input, Select } from 'antd';
import { useGetSiteSetting } from '@/hooks';
import ResourceSelect from '@/components/form/ResourceSelect';
import { isObject } from 'lodash-es';
import { TVip } from '@/types';
import { CloseOutlined } from '@ant-design/icons';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    formLoading?: boolean;
}> = ({ formType, formProps, handler, formLoading }) => {
    const form = formProps.form;
    const { default_currency, default_amount_type, support_game_providers, support_currencies, support_amount_types } = useGetSiteSetting();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (default_currency && default_amount_type && form) {
                // 設定表單預設值
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
        // 編輯時重組資料
        if (!formLoading && formProps.initialValues && formType === 'edit') {
            if (Array.isArray(formProps?.initialValues?.vips as number[] | TVip[]) && formProps?.initialValues?.vips.every((v: number | TVip) => isObject(v))) {
                formProps.initialValues.vips = (formProps?.initialValues?.vips || []).map((v: TVip) => v.id);
            }
        }
    }, [formLoading]);

    return (
        <Form {...formProps} onFinish={handler} layout="vertical">
            <div className="grid grid-cols-3 gap-6">
                <Form.Item className="w-full" label="Label" name={['label']} rules={[{ required: true, message: 'value is required' }]}>
                    <Input className="w-full" />
                </Form.Item>
                <Form.Item className="w-full" label="Bonus Rate" name={['bonus_rate']} rules={[{ required: true, message: 'value is required' }]}>
                    <InputNumber min={0} addonAfter="%" className="w-full" />
                </Form.Item>
                <Form.Item className="w-full" label="Rolling Percentage" name={['rolling_percentage']}>
                    <InputNumber min={0} addonAfter="%" className="w-full" />
                </Form.Item>
                <Form.Item className="w-full" label="Min Deposit Amount" name={['min_deposit_amount']}>
                    <InputNumber min={0} precision={0} className="w-full" />
                </Form.Item>
                <Form.Item className="w-full" label="Max Bonus Amount" name={['max_bonus_amount']}>
                    <InputNumber min={0} precision={0} className="w-full" />
                </Form.Item>
                <Form.Item hidden name={['deposit_type']} initialValue="NORMAL">
                    <Input className="w-full" />
                </Form.Item>

                <ResourceSelect formItemProps={{ label: 'VIPS', name: ['vips'] }} fetchProps={{ resource: 'vips', optionLabel: 'label', optionValue: 'id' }} selectProps={{ allowClear: true, mode: 'multiple' }} />

                <Form.Item name="allow_game_providers" label="Allow Game Providers" initialValue={formType === 'create' ? support_game_providers : undefined}>
                    <Checkbox.Group options={support_game_providers} />
                </Form.Item>

                <div className="bg-gray-100 p-4 rounded-xl mb-4 hidden">
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
                </div>
            </div>
        </Form>
    );
};

export default FormComponent;
