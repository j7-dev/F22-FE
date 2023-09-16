import React from 'react';
import { useSetAtom } from 'jotai';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLogin } from '@refinedev/core';
import { popupIsOpenAtom } from '@/components/ContentLayout/LoginModule';

type LoginVariables = {
    email: string;
    password: string;
    redirectPath: string;
};
type LoginProps = {
    formCarousel?: HTMLDivElement;
};
const index: React.FC<LoginProps> = ({ formCarousel }) => {
    const { mutate: login } = useLogin<LoginVariables>();
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const [form] = Form.useForm();
    const handleLogin = (values: { Email: string; UserPas: string }) => {
        const { Email, UserPas } = values;

        login(
            { email: Email, password: UserPas, redirectPath: '/wallet' },
            {
                onSuccess: (data) => {
                    if (!data.success) {
                        // handle error
                        console.log('錯誤訊息', data.error); //TODO 不會進這邊why?
                    }
                    // handle success
                    // console.log('成功訊息', data);
                    setPopupIsOpen(false);
                },
            },
        );
    };
    const handleToSignUp = () => {
        if (!formCarousel) return;
        formCarousel.style.transform = 'translateX(-50%)';
    };
    return (
        <div className="loginFrom text-center flex flex-col gap-2.5 w-full">
            <span>Available After Login.</span>
            <Form form={form} onFinish={handleLogin}>
                <Form.Item name="Email">
                    <Input addonBefore={<UserOutlined />} placeholder="User Email" />
                </Form.Item>
                <Form.Item name="UserPas">
                    <Input addonBefore={<LockOutlined />} placeholder="User Password" />
                </Form.Item>
                <Form.Item>
                    <Button className="flex w-full h-10 items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 justify-center" htmlType="submit">
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
            <p className="font-bold text-sm text-[#999999] flex flex-col">
                Don't have an account yet?
                <span className="text-black cursor-pointer" onClick={handleToSignUp}>
                    Sign Up
                </span>
            </p>
        </div>
    );
};

export default index;
