import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, Form } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="ChangePasswordTitle h-10 text-sm font-bold text-[#2B3240] flex items-center">
                {t('Change Password')}
            </div>
            <Form form={form}>
                <Form.Item name="NewPas">
                    <Input
                        addonBefore={<LockOutlined />}
                        placeholder="New Password"
                    />
                </Form.Item>
                <Form.Item name="CheckPas">
                    <Input
                        addonBefore={<LockOutlined />}
                        placeholder="Check Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        className="flex w-full h-10 items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 justify-center"
                        htmlType="submit"
                    >
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default index;
