import { useEffect, useState } from 'react';
import { Form, Input, Switch, Radio, DatePicker, Select, FormProps } from 'antd';
import { TRole, TRoleType, TUser, TVip } from '@/types';
import dayjs, { Dayjs } from 'dayjs';
import { isString, isObject } from 'lodash-es';
import { useUserSelect, useGetSiteSetting } from '@/hooks';
import { useSelect } from '@refinedev/antd';
import { DefaultOptionType } from 'rc-select/lib/Select';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    defaultRoleType?: TRoleType;
    formLoading?: boolean;
}> = ({ formType, formProps, handler, defaultRoleType = 'authenticated', formLoading }) => {
    const form = formProps.form;
    const [isEditing, setIsEditing] = useState(false);
    const siteSetting = useGetSiteSetting();
    const rolesMapping = siteSetting?.roles || {};
    const roleSelectProps = {
        options: Object.keys(rolesMapping)
            .filter((k) => k === 'agent' || k === 'top_agent')
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

    const { selectProps: topAgentSelectProps } = useUserSelect({
        roleType: 'top_agent',
    });

    const { selectProps: agentSelectProps } = useUserSelect({
        roleType: 'agent',
    });

    useEffect(() => {
        if (!formLoading && formProps.initialValues) {
            if (isObject(formProps.initialValues.role as number | TRole)) {
                formProps.initialValues.role = formProps.initialValues.role.id;
            }
            if (isObject(formProps.initialValues.vip as number | TVip)) {
                formProps.initialValues.vip = formProps.initialValues.vip.id;
            }
            if (isObject(formProps.initialValues.agent as number | TUser)) {
                formProps.initialValues.agent = formProps.initialValues.agent.id;
            }
            if (isObject(formProps.initialValues.top_agent as number | TUser)) {
                formProps.initialValues.top_agent = formProps.initialValues.top_agent.id;
            }
            if (isString(formProps.initialValues?.birthday as string | Dayjs)) {
                formProps.initialValues.birthday = dayjs(formProps.initialValues?.birthday, 'YYYY-MM-DD');
            }
        }
    }, [formLoading]);

    const handleChangePassword = (checked: boolean) => {
        setIsEditing(checked);
    };

    return (
        <Form {...formProps} onFinish={handler} layout="vertical">
            <div className="grid grid-cols-2 gap-6">
                <Form.Item
                    name="username"
                    label="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item name="display_name" label="display name">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="gender" label="gender">
                    <Radio.Group
                        options={[
                            { label: 'Male', value: 'MALE' },
                            { label: 'Female', value: 'FEMALE' },
                        ]}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Form.Item>

                <Form.Item name="birthday" label="birthday" hidden>
                    {!isString(formProps.initialValues?.birthday) && formProps.initialValues?.birthday ? <DatePicker className="w-full" /> : <Input />}
                </Form.Item>

                <Form.Item name="confirmed" valuePropName="checked" label="confirmed" initialValue={formType === 'create' ? true : undefined}>
                    <Switch />
                </Form.Item>

                <Form.Item name="blocked" valuePropName="checked" label="blocked" initialValue={formType === 'create' ? false : undefined}>
                    <Switch />
                </Form.Item>

                <Form.Item hidden={watchRoleType !== 'agent' && watchRoleType !== 'top_agent'} name="role" label="role" initialValue={formType === 'create' ? rolesMapping?.[defaultRoleType] : undefined}>
                    {watchRoleType !== 'agent' && watchRoleType !== 'top_agent' ? <Input /> : <Select {...roleSelectProps} />}
                </Form.Item>
                {watchRoleType === 'authenticated' && (
                    <Form.Item name="vip" label="vip">
                        <Select {...vipSelectProps} />
                    </Form.Item>
                )}

                {watchRoleType === 'agent' && (
                    <Form.Item name="top_agent" label="Top Agent">
                        <Select {...topAgentSelectProps} />
                    </Form.Item>
                )}

                {watchRoleType === 'authenticated' && (
                    <Form.Item name="agent" label="Agent">
                        <Select {...agentSelectProps} />
                    </Form.Item>
                )}
            </div>
            <div className="grid grid-cols-2 gap-6 mt-16">
                <div>
                    <p className="mb-2">
                        change password <Switch size="small" onChange={handleChangePassword} className="ml-4" />
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
