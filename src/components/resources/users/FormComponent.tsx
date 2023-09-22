import { useEffect } from 'react';
import { Form, Input, Switch, Radio, DatePicker, Select, FormProps } from 'antd';
import { TRole, TUser, TRoleType } from '@/types';
import { nanoid } from 'nanoid';
import { useCustom } from '@refinedev/core';
import { API_URL, getRoleId } from '@/utils';
import { useSelect } from '@refinedev/antd';
import dayjs from 'dayjs';
import { isString } from 'lodash-es';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    roleType?: TRoleType;
}> = ({ formType, formProps, handler, roleType = 'authenticated' }) => {
    const form = formProps.form;
    const { data: roleData, isLoading: roleIsLoading } = useCustom({
        url: `${API_URL}/api/users-permissions/roles`,
        method: 'get',
    });
    const roles = (roleData?.data?.roles || []) as TRole[];
    const roleSelectProps = {
        loading: roleIsLoading,
        options: roles
            .filter((role) => role.type !== 'public')
            .map((role) => ({
                label: role.name,
                value: role.id,
            })),
    };

    const { selectProps: vipSelectProps } = useSelect({
        resource: 'vips',
        optionLabel: 'label',
        optionValue: 'id',
    });

    const angentRoleId = roles.find((role) => role.type === 'agent')?.id;

    const { selectProps: agentSelectProps } = useSelect<TUser>({
        resource: 'users',
        optionLabel: 'display_name',
        filters: [
            {
                field: 'role.id',
                operator: 'eq',
                value: angentRoleId,
            },
        ],
    });

    const watchBirthday = Form.useWatch('birthday', form);

    useEffect(() => {
        if (isString(watchBirthday)) {
            form?.setFieldValue('birthday', dayjs(watchBirthday, 'YYYY-MM-DD'));
        }
    }, [watchBirthday]);

    useEffect(() => {
        if (formType === 'create') {
            console.log('⭐  useEffect  getRoleId(roleType)', getRoleId(roleType));
            form?.setFieldValue('role', getRoleId(roleType));
        }
    }, []);

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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                        {
                            type: 'email',
                            message: 'Please input a valid email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="password">
                    <Input.Password />
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

                <Form.Item name="birthday" label="birthday">
                    {!isString(watchBirthday) && watchBirthday ? <DatePicker className="w-full" /> : <Input />}
                </Form.Item>

                <Form.Item name="blocked" valuePropName="checked" label="blocked" initialValue={formType === 'create' ? false : undefined}>
                    <Switch />
                </Form.Item>
                <Form.Item hidden name="role" label="role" initialValue={formType === 'create' ? 1 : undefined}>
                    <Select {...roleSelectProps} />
                </Form.Item>
                <Form.Item name="vip" label="vip">
                    <Select {...vipSelectProps} />
                </Form.Item>
                <Form.Item name="agent" label="Agent">
                    <Select {...agentSelectProps} />
                </Form.Item>
                <Form.Item name="uuid" label="uuid" hidden initialValue={formType === 'create' ? nanoid() : undefined}>
                    <Input />
                </Form.Item>
            </div>
        </Form>
    );
};

export default FormComponent;
