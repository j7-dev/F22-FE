import { useEffect } from 'react';
import { Form, FormProps, InputNumber, Checkbox, Input } from 'antd';
import ResourceSelect from '@/components/form/ResourceSelect';
import { isObject } from 'lodash-es';
import { TVip } from '@/types';
import { gameCategories } from '@/utils/GameCategory';
import { useTranslation } from 'react-i18next';
import AmountInput from '@/components/form/AmountInput';
import PeriodInput from '@/components/Admin/Period/Input';
import dayjs from 'dayjs';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    formLoading?: boolean;
}> = ({ formType, formProps, handler, formLoading }) => {
    const { t } = useTranslation();
    const game_categories = gameCategories.map((category) => category.value);

    useEffect(() => {
        console.log('⭐  formProps.initialValues', formProps.initialValues);

        // 編輯時重組資料
        if (!formLoading && formProps.initialValues && formType === 'edit') {
            if (Array.isArray(formProps?.initialValues?.vips as number[] | TVip[]) && formProps?.initialValues?.vips.every((v: number | TVip) => isObject(v))) {
                formProps.initialValues.vips = (formProps?.initialValues?.vips || []).map((v: TVip) => v.id);
            }
            if (formProps?.initialValues?.period?.start_datetime) {
                formProps.initialValues.period.start_datetime = dayjs(formProps?.initialValues?.period?.start_datetime);
            }
            if (formProps?.initialValues?.period?.end_datetime) {
                formProps.initialValues.period.end_datetime = dayjs(formProps?.initialValues?.period?.end_datetime);
            }
        }
    }, [formLoading]);

    return (
        <Form {...formProps} onFinish={handler} layout="vertical">
            <AmountInput amountProps={{ hide: true }} />

            <div className="grid grid-cols-3 gap-6">
                <Form.Item className="w-full" label={t('Title')} name={['title']} rules={[{ required: true, message: 'value is required' }]}>
                    <Input className="w-full" />
                </Form.Item>

                <ResourceSelect formItemProps={{ label: t('User'), name: ['user'] }} fetchProps={{ resource: 'users', optionLabel: 'display_name', optionValue: 'id' }} selectProps={{ allowClear: true, size: 'small' }} />

                <Form.Item className="w-full" label={t('Amount')} name={['coupon_amount']} rules={[{ required: true, message: 'value is required' }]}>
                    <InputNumber min={0} className="w-full" />
                </Form.Item>

                <Form.Item name="allow_game_categories" label={t('Allow Game Categories')} initialValue={formType === 'create' ? game_categories : undefined}>
                    <Checkbox.Group options={game_categories} />
                </Form.Item>

                <Form.Item className="w-full" label={t('Description')} name={['description']}>
                    <Input.TextArea className="w-full" />
                </Form.Item>

                <PeriodInput />
            </div>
        </Form>
    );
};

export default FormComponent;
