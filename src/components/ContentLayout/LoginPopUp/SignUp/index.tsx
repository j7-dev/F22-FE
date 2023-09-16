//1.API URL https://be-dev.smtbet7.com/api/auth/local/register
//2.payload json 格式 帶入uuid(唯一值) email,username,password,confirmed": true,"blocked": false
//3.不用帶入token
import React from 'react';
import { useSetAtom } from 'jotai';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AiOutlineMail } from 'react-icons/ai';
import { useRegister } from '@refinedev/core';
import { popupIsOpenAtom } from '@/components/ContentLayout/LoginModule';

type LoginVariables = {
    email: string;
    password: string;
    redirectPath: string;
    username: string;
};
type SignUpProps = {
    formCarousel?: HTMLDivElement;
};
const index: React.FC<SignUpProps> = ({ formCarousel }) => {
    const { mutate: register } = useRegister<LoginVariables>();
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const [form] = Form.useForm();

    const handleSignUp = (values: { email: string; userName: string; userPas: string }) => {
        const { email, userPas, userName } = values;

        register(
            { email: email, username: userName, password: userPas, redirectPath: '/wallet' },
            {
                onSuccess: (data) => {
                    if (!data.success) {
                        // handle error
                        // console.log('錯誤訊息', data.error); //TODO 不會進這邊why?
                    }
                    // handle success
                    setPopupIsOpen(false);
                },
                onError: (error) => {
                    console.log('錯誤訊息', error);
                },
            },
        );
    };
    const handleToLogin = () => {
        if (!formCarousel) return;
        formCarousel.style.transform = 'translateX(0%)';
    };
    return (
        <div className="loginFrom text-center flex flex-col gap-2.5 w-full">
            <span>Available After SignUp.</span>
            <Form form={form} onFinish={handleSignUp}>
                <Form.Item name="email">
                    <Input addonBefore={<AiOutlineMail />} placeholder="User Email" />
                </Form.Item>
                <Form.Item name="userName">
                    <Input addonBefore={<UserOutlined />} placeholder="User Name" />
                </Form.Item>
                <Form.Item name="userPas">
                    <Input addonBefore={<LockOutlined />} placeholder="User Password" />
                </Form.Item>
                <Form.Item>
                    <Button className="flex w-full h-10 items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 justify-center" htmlType="submit">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
            <p className="font-bold text-sm text-[#999999] flex flex-col">
                have an account?
                <span className="text-black cursor-pointer" onClick={handleToLogin}>
                    Log In
                </span>
            </p>
        </div>
    );
};

export default index;
