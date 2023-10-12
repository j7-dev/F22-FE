import { useEffect, useState } from 'react';
import { Form, Button, Select, FormProps, InputNumber, Input } from 'antd';
import { useGetSiteSetting } from '@/hooks';
import { CloseOutlined } from '@ant-design/icons';
import ResourceSelect from '@/components/form/ResourceSelect';
import { isObject } from 'lodash-es';
import { TVip } from '@/types';

type TDefaultValues = {
    live: number | null;
    slot: number | null;
};

const RATIO_TYPES = ['live', 'slot'] as const;

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    formLoading?: boolean;
}> = ({ formType, formProps, handler, formLoading }) => {
    const form = formProps.form;
    const siteSetting = useGetSiteSetting();
    const defaultCurrency = siteSetting?.default_currency || 'KRW';
    const supportCurrencies = siteSetting?.support_currencies || ['KRW'];
    const defaultAmountType = siteSetting?.default_amount_type || 'CASH';
    const supportAmountTypes = siteSetting?.support_amount_types || ['CASH'];
    const support_game_providers = siteSetting?.support_game_providers || [];

    const [defaultValues, setDefaultValues] = useState<TDefaultValues>({
        live: null,
        slot: null,
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (defaultCurrency && defaultAmountType && form) {
                // 設定表單預設值
                form?.setFieldsValue({
                    currency: defaultCurrency,
                    amount_type: 'DEPOSIT_BONUS',
                });
            }
        }, 0);

        return () => {
            clearTimeout(timeout);
        };
    }, [defaultCurrency, defaultAmountType, form]);

    useEffect(() => {
        // 編輯時重組資料
        if (!formLoading && formProps.initialValues && formType === 'edit') {
            if (Array.isArray(formProps?.initialValues?.vips as number[] | TVip[]) && formProps?.initialValues?.vips.every((v: number | TVip) => isObject(v))) {
                formProps.initialValues.vips = (formProps?.initialValues?.vips || []).map((v: TVip) => v.id);
            }
        }
    }, [formLoading]);

    const handleChange = (key: keyof typeof defaultValues) => (value: number | null) => {
        setDefaultValues({
            ...defaultValues,
            [key]: value,
        });
    };

    const handleApplyAll = () => {
        const values = form?.getFieldsValue();
        const newRatio = support_game_providers.map((gameProvider) => {
            const newItem = {
                gameProvider,
                ...defaultValues,
            };
            return newItem;
        });

        form?.setFieldsValue({
            ...values,
            extra_ratio: newRatio,
        });
    };

    return (
        <Form {...formProps} onFinish={handler} layout="vertical">
            <div className="grid grid-cols-3 gap-6">
                <Form.Item className="w-full" label="Label" name={['label']} rules={[{ required: true, message: 'value is required' }]}>
                    <InputNumber min={0} precision={0} className="w-full" />
                </Form.Item>
                <Form.Item className="w-full" label="Bonus Rate" name={['bonus_rate']} rules={[{ required: true, message: 'value is required' }]}>
                    <InputNumber min={0} addonAfter="%" className="w-full" />
                </Form.Item>
                <Form.Item className="w-full" label="Min Deposit Amount" name={['min_deposit_amount']} rules={[{ required: true, message: 'value is required' }]}>
                    <InputNumber min={0} precision={0} className="w-full" />
                </Form.Item>
                <Form.Item className="w-full" label="Max Bonus Amount" name={['max_bonus_amount']} rules={[{ required: true, message: 'value is required' }]}>
                    <InputNumber min={0} precision={0} className="w-full" />
                </Form.Item>

                <ResourceSelect formItemProps={{ label: 'VIPS', name: ['vips'] }} fetchProps={{ resource: 'vips', optionLabel: 'label', optionValue: 'id' }} selectProps={{ allowClear: true, mode: 'multiple' }} />
            </div>

            <div className="bg-gray-100 p-4 rounded-xl mb-4 hidden">
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
                <div className="flex items-end">
                    <Button type="default" onClick={handleApplyAll}>
                        Click to Apply ALL
                    </Button>
                </div>
                <div>
                    <p className="mb-2">live</p>
                    <InputNumber value={defaultValues.live} onChange={handleChange('live')} min={0} className="w-full" addonAfter="%" />
                </div>
                <div>
                    <p className="mb-2">slot</p>
                    <InputNumber value={defaultValues.slot} onChange={handleChange('slot')} min={0} className="w-full" addonAfter="%" />
                </div>
            </div>

            {support_game_providers.map((gameProvider, index) => {
                return (
                    <div key={gameProvider} className="grid grid-cols-3 gap-x-6 gap-y-2 bg-gray-100 p-4 rounded-xl mb-4">
                        <div>
                            <Form.Item hidden name={['extra_ratio', index, 'gameProvider']} initialValue={gameProvider}>
                                <Input />
                            </Form.Item>
                            <div className="flex items-center">{gameProvider}</div>
                        </div>
                        {RATIO_TYPES.map((key) => {
                            return (
                                <Form.Item className="w-full m-0" label={key} name={['extra_ratio', index, key]} rules={[{ required: true, message: 'value is required' }]}>
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
