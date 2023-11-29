import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, Form } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useCustomMutation } from '@refinedev/core';
import { API_URL } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { signInAtom } from '@/components/ContentLayout/Header/LoginModule';
import { useSetAtom } from 'jotai';

//1.API URL https://be-dev.smtbet7.com/api/auth/change-password
//2.header Authorization: Bearer token(user token)
//3.payload json 格式
// {
//     "currentPassword":"123456",
//     "password": "1234567",
//     "passwordConfirmation": "1234567"
// }
const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { mutate } = useCustomMutation();
    const Navigate = useNavigate();
    const setSignIn = useSetAtom(signInAtom);

    const changePassword = (values: { newPas: string; currentPassword: string; checkPas: string }) => {
        const { newPas, currentPassword, checkPas } = values;
        const payload = {
            currentPassword: currentPassword,
            password: newPas,
            passwordConfirmation: checkPas,
        };
        mutate(
            {
                url: `${API_URL}/api/auth/change-password`,
                method: 'post',
                values: payload,
                config: {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('API_TOKEN')}`,
                    },
                },
            },
            {
                onSuccess: () => {
                    // 成功後登出帳號清除localStorage並且開啟登入視窗

                    sessionStorage.removeItem('API_TOKEN');
                    Navigate('/');
                    setSignIn(true);
                },
            },
        );
    };
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="ChangePasswordTitle h-10 text-sm font-bold text-[#2B3240] flex items-center">{t('Change Password')}</div>
            <Form form={form} onFinish={changePassword}>
                <Form.Item name="currentPassword">
                    <Input addonBefore={<LockOutlined />} placeholder="Current Password" />
                </Form.Item>
                <Form.Item name="newPas">
                    <Input addonBefore={<LockOutlined />} placeholder="New Password" />
                </Form.Item>
                <Form.Item name="checkPas">
                    <Input addonBefore={<LockOutlined />} placeholder="Check Password" />
                </Form.Item>
                <Form.Item>
                    <Button className="flex w-full h-10 items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 justify-center" htmlType="submit">
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default index;
