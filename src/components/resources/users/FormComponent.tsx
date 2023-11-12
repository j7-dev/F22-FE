import { useEffect, useState } from 'react';
import { Form, Input, Switch, Radio, DatePicker, Select, FormProps, Checkbox, Typography } from 'antd';
import { TRole, TRoleType, TUser, TVip, BANK_ACCOUNT_FIELDS, TCommission } from '@/types';
import dayjs, { Dayjs } from 'dayjs';
import { isString, isObject } from 'lodash-es';
import { useUserSelect, useGetSiteSetting } from '@/hooks';
import { useSelect } from '@refinedev/antd';
import { DefaultOptionType } from 'rc-select/lib/Select';
import { keyToWord } from '@/utils';
import { BankOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import CommissionTable from '@/components/Admin/CommissionTable';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    defaultRoleType?: TRoleType;
    formLoading?: boolean;
}> = ({ formType, formProps, handler, defaultRoleType = 'authenticated', formLoading }) => {
    const form = formProps.form;
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [userRole, setUserRole] = useState('Auntenticated');

    const siteSetting = useGetSiteSetting();
    const rolesMapping = siteSetting?.roles || {};
    const roleSelectProps = {
        options: Object.keys(rolesMapping)
            .filter((k) => k === 'agent')
            .map((key) => {
                return {
                    label: key,
                    value: rolesMapping?.[key],
                };
            }) as DefaultOptionType[],
    };

    const watchRole = Form.useWatch('role', form);
    const watchRoleType = Object.keys(rolesMapping).find((key) => rolesMapping?.[key] === watchRole);

    const { selectProps: vipSelectProps } = useSelect({
        resource: 'vips',
        optionLabel: 'label',
        optionValue: 'id',
    });

    const { selectProps: agentSelectProps } = useUserSelect({
        roleType: 'agent',
    });

    const support_payments = siteSetting?.support_payments || [];
    const support_game_providers = siteSetting?.support_game_providers || [];

    useEffect(() => {
        if (!formLoading && formProps.initialValues) {
            if (isObject(formProps.initialValues.role as number | TRole)) {
                setUserRole(formProps.initialValues.role.type);
                formProps.initialValues.role = formProps.initialValues.role.id;
            }
            if (isObject(formProps.initialValues.vip as number | TVip)) {
                formProps.initialValues.vip = formProps.initialValues.vip.id;
            }
            if (isObject(formProps.initialValues.agent as number | TUser)) {
                formProps.initialValues.agent = formProps.initialValues.agent.id;
            }

            if (isString(formProps.initialValues?.birthday as string | Dayjs)) {
                formProps.initialValues.birthday = dayjs(formProps.initialValues?.birthday, 'YYYY-MM-DD');
            }
        }
    }, [formLoading]);

    // useEffect(() => {
    //     console.log('⭐  formProps.initialValues:', formProps.initialValues);
    //     if (formType === 'create') {
    //         // formProps?.initialValues?.support_payments = support_payments;
    //         form?.setFieldValue('allow_payments', support_payments);
    //         form?.setFieldValue('allow_game_providers', support_game_providers);
    //     }
    // }, [support_game_providers.length, support_payments.length]);

    // const watch = Form.useWatch('allow_payments', form);

    const handleChangePassword = (checked: boolean) => {
        setIsEditing(checked);
    };

    return (
        <Form {...formProps} onFinish={handler} layout="vertical">
            <div className="grid grid-cols-2 gap-6">
                <Form.Item
                    name="username"
                    label={t('username')}
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
                    name="phone"
                    label={t('phone')}
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="gender" label={t('gender')} initialValue="MALE" hidden>
                    <Radio.Group
                        options={[
                            { label: 'Male', value: 'MALE' },
                            { label: 'Female', value: 'FEMALE' },
                        ]}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Form.Item>

                <Form.Item name="birthday" label={t('birthday')} hidden>
                    {!isString(formProps.initialValues?.birthday) && formProps.initialValues?.birthday ? <DatePicker className="w-full" /> : <Input />}
                </Form.Item>

                <Form.Item name="confirmed" valuePropName="checked" label={t('status')} initialValue={formType === 'create' ? true : undefined}>
                    <Switch />
                </Form.Item>

                <Form.Item name="allow_payments" label={t('Allow Payments')} initialValue={formType === 'create' ? support_payments : undefined}>
                    <Checkbox.Group options={support_payments} />
                </Form.Item>

                <Form.Item name="allow_game_providers" label={t('Allow Game Providers')} initialValue={formType === 'create' ? support_game_providers : undefined}>
                    <Checkbox.Group options={support_game_providers} />
                </Form.Item>

                <Form.Item hidden={watchRoleType !== 'agent'} name="role" label={t('role')} initialValue={formType === 'create' ? rolesMapping?.[defaultRoleType] : undefined}>
                    {watchRoleType !== 'agent' ? <Input /> : <Select {...roleSelectProps} />}
                </Form.Item>
                {watchRoleType === 'authenticated' && (
                    <Form.Item name="vip" label={t('vip')}>
                        <Select {...vipSelectProps} />
                    </Form.Item>
                )}

                {watchRoleType === 'authenticated' && (
                    <Form.Item name="agent" label={t('Agent')}>
                        <Select {...agentSelectProps} />
                    </Form.Item>
                )}
            </div>

            {userRole === 'agent' && (
                <div className="bg-blue-50 rounded-xl p-6 mt-16">
                    <Title level={5}>
                        <MoneyCollectOutlined className="mr-2" /> {t('Commission')}
                    </Title>
                    <CommissionTable commission={formProps.initialValues?.commission as TCommission} />
                </div>
            )}

            <div className="bg-yellow-50 rounded-xl p-6 mt-16">
                <Title level={5}>
                    <BankOutlined className="mr-2" /> {t('Bank Account')}
                </Title>
                <div className="grid grid-cols-2 gap-6">
                    {BANK_ACCOUNT_FIELDS.map((field) => (
                        <Form.Item key={field} label={keyToWord(field)} name={['bank_account', field]}>
                            <Input />
                        </Form.Item>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mt-16">
                <Title level={5}>
                    <BankOutlined className="mr-2" /> {t('Deposit Account for User')}
                </Title>
                <div className="grid grid-cols-2 gap-6">
                    {BANK_ACCOUNT_FIELDS.map((field) => (
                        <Form.Item key={field} label={keyToWord(field)} name={['deposit_account_for_user', field]}>
                            <Input />
                        </Form.Item>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-16">
                <div>
                    <p className="mb-2">
                        {t('change password')} <Switch size="small" onChange={handleChangePassword} className="ml-4" />
                    </p>

                    <Form.Item name="password" className="mt-4">
                        <Input.Password disabled={!isEditing} />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default FormComponent;
