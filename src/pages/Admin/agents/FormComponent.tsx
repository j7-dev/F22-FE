import { useState } from 'react';
import { Form, Input, Switch, InputNumber, FormProps } from 'antd';
import { useTranslation } from 'react-i18next';
import ReferralLink from '@/components/general/ReferralLink';
import { useApiUrl } from '@refinedev/core';

type TValidateStatus = 'success' | 'warning' | 'error' | 'validating' | undefined;

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    formLoading?: boolean;
}> = ({ formType, formProps, handler }) => {
    const form = formProps?.form;
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [validateStatus, setValidateStatus] = useState<TValidateStatus>(undefined);
    const [help, setHelp] = useState<string | undefined>(undefined);
    const apiUrl = useApiUrl();

    const handleChangePassword = (checked: boolean) => {
        setIsEditing(checked);
    };

    const handleCheck = async () => {
        setHelp(undefined);
        setValidateStatus('validating');
        const username = form?.getFieldValue(['username']);
        if (!username) return;

        const res = await fetch(`${apiUrl}/utility/users/can-register?username=${username}&email=${username}@smtbet7.com`);

        const data = await res.json();
        const canRegister = data?.data;
        setValidateStatus(canRegister ? 'success' : 'error');

        const message = data?.message;
        setHelp(message);
    };

    return (
        <Form {...formProps} onFinish={handler} layout="vertical">
            <div className="grid grid-cols-4 gap-6">
                <Form.Item
                    name={['username']}
                    label={t('username')}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                    validateStatus={validateStatus}
                    help={help}
                >
                    <Input disabled={formType === 'edit'} onBlur={handleCheck} />
                </Form.Item>

                <Form.Item
                    name={['display_name']}
                    label={t('Real name')}
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                >
                    <Input disabled={formType === 'edit'} />
                </Form.Item>

                <Form.Item
                    name={['commission_rate']}
                    label={t('Commission Rate')}
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                >
                    <InputNumber addonAfter="%" />
                </Form.Item>

                <Form.Item name="confirmed" valuePropName="checked" label={t('status')} initialValue={formType === 'create' ? true : undefined}>
                    <Switch />
                </Form.Item>
            </div>
            {formType === 'edit' && <ReferralLink uuid={formProps?.initialValues?.username} />}

            <div className="grid grid-cols-2 gap-6 mt-16">
                {formType === 'edit' && (
                    <div>
                        <p className="mb-2">
                            {t('change password')} <Switch size="small" onChange={handleChangePassword} className="ml-4" />
                        </p>

                        <Form.Item name="password" className="mt-4">
                            <Input.Password disabled={!isEditing} />
                        </Form.Item>
                    </div>
                )}

                {formType === 'create' && (
                    <Form.Item
                        name="password"
                        className="mt-4"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a value',
                            },
                            {
                                min: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                )}
            </div>
        </Form>
    );
};

export default FormComponent;
