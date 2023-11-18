import { useEffect } from 'react';
import { Form, FormProps, InputNumber, Checkbox, Input } from 'antd';
import ResourceSelect from '@/components/form/ResourceSelect';
import { isObject } from 'lodash-es';
import { TVip } from '@/types';
import { gameCategories } from '@/utils/GameCategory';
import { useTranslation } from 'react-i18next';
import AmountInput from '@/components/form/AmountInput';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    formLoading?: boolean;
}> = ({ formType, formProps, handler, formLoading }) => {
    const { t } = useTranslation();

    const game_categories = gameCategories.map((category) => category.value);

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
            <AmountInput amountProps={{ hide: true }} />

            <div className="grid grid-cols-3 gap-6">
                <Form.Item className="w-full" label={t('Label')} name={['label']} rules={[{ required: true, message: 'value is required' }]}>
                    <Input className="w-full" />
                </Form.Item>
                <Form.Item className="w-full" label={t('Bonus Rate')} name={['bonus_rate']} rules={[{ required: true, message: 'value is required' }]}>
                    <InputNumber min={0} addonAfter="%" className="w-full" />
                </Form.Item>
                <Form.Item className="w-full" label={t('Rolling Percentage')} name={['rolling_percentage']}>
                    <InputNumber min={0} addonAfter="%" className="w-full" />
                </Form.Item>
                <Form.Item className="w-full" label={t('Min Deposit Amount')} name={['min_deposit_amount']}>
                    <InputNumber min={0} precision={0} className="w-full" />
                </Form.Item>
                <Form.Item className="w-full" label={t('Max Bonus Amount')} name={['max_bonus_amount']}>
                    <InputNumber min={0} precision={0} className="w-full" />
                </Form.Item>
                <Form.Item hidden name={['deposit_type']} initialValue="NORMAL">
                    <Input className="w-full" />
                </Form.Item>

                <ResourceSelect formItemProps={{ label: t('VIPS'), name: ['vips'] }} fetchProps={{ resource: 'vips', optionLabel: 'label', optionValue: 'id' }} selectProps={{ allowClear: true, mode: 'multiple' }} />

                <Form.Item name="allow_game_categories" label={t('Allow Game Categories')} initialValue={formType === 'create' ? game_categories : undefined}>
                    <Checkbox.Group
                        options={game_categories.map((item) => ({
                            label: t(item),
                            value: item,
                        }))}
                    />
                </Form.Item>
            </div>
        </Form>
    );
};

export default FormComponent;
