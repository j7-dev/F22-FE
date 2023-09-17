import { Form, Input, Switch, Radio, DatePicker, Select, FormProps } from 'antd';
import { TRole, TUser } from '@/types';
import { nanoid } from 'nanoid';
import { useCustom } from '@refinedev/core';
import { API_URL } from '@/utils';
import { useSelect } from '@refinedev/antd';

const FormComponent: React.FC<{
    formProps: FormProps;
    handler: () => void;
}> = ({ formProps, handler }) => {
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
        optionLabel: 'username',
        filters: [
            {
                field: 'role.id',
                operator: 'eq',
                value: angentRoleId,
            },
        ],
    });

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
                    <DatePicker className="w-full" />
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
                <Form.Item name="blocked" valuePropName="checked" label="blocked" initialValue={false}>
                    <Switch />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="role"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                >
                    <Select {...roleSelectProps} />
                </Form.Item>
                <Form.Item
                    name="vip"
                    label="vip"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                >
                    <Select {...vipSelectProps} />
                </Form.Item>
                <Form.Item
                    name="agent"
                    label="Agent"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                >
                    <Select {...agentSelectProps} />
                </Form.Item>
                <Form.Item name="uuid" label="uuid" hidden initialValue={nanoid()}>
                    <Input />
                </Form.Item>
            </div>
        </Form>
    );
};

export default FormComponent;
