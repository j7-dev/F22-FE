//1.API URL https://be-dev.smtbet7.com/api/auth/local/register
//2.payload json 格式 帶入uuid(唯一值) email,username,password,confirmed": true,"blocked": false
//3.不用帶入token
import React, { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AiOutlineMail } from 'react-icons/ai';
import { useRegister } from '@refinedev/core';
import { popupIsOpenAtom, loginOrSignUpAtom } from '@/components/ContentLayout/LoginModule';
import HCaptcha from '@hcaptcha/react-hcaptcha';

type LoginVariables = {
    email: string;
    password: string;
    redirectPath: string;
    username: string;
};

const index: React.FC = () => {
    const { mutate: register } = useRegister<LoginVariables>();
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const setLoginOrSignUp = useSetAtom(loginOrSignUpAtom); //true:login false:signUp
    const [form] = Form.useForm();
    const [verify, setVerify] = useState(false);
    const [verifyError, setVerifyError] = useState('');
    const [submittable, setSubmittable] = useState(false);

    const handleSignUp = (values: { email: string; userName: string; userPas: string }) => {
        if (!verify) {
            setVerifyError('You must verify the captcha');
            return;
        }
        const { email, userPas, userName } = values;
        register(
            { email: email, username: userName, password: userPas, redirectPath: '/wallet' },
            {
                onSuccess: (data) => {
                    if (!data.success) {
                        // handle error
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
        setLoginOrSignUp(true);
    };

    const handleVerificationSuccess = () => {
        //TODO 正常會帶token跟ekey這兩個參數,但暫時用不到
        // console.log('token', token);
        // console.log('ekey', ekey);
        setVerifyError('');
        setVerify(true);
    };

    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);
    return (
        <div className="loginFrom text-center flex flex-col gap-2.5 w-full">
            <span>Available After SignUp.</span>
            {/* 錯誤訊息 */}
            {verifyError && <p className="text-danger text-red-600 font-bold">{verifyError}</p>}
            <Form form={form} onFinish={handleSignUp}>
                <Form.Item name="email" hasFeedback rules={[{ required: true, message: 'Please input your Email' }]}>
                    <Input addonBefore={<AiOutlineMail />} placeholder="User Email" />
                </Form.Item>
                <Form.Item name="userName" hasFeedback rules={[{ required: true, message: 'Please input your Name' }]}>
                    <Input addonBefore={<UserOutlined />} placeholder="User Name" />
                </Form.Item>
                <Form.Item name="userPas" hasFeedback rules={[{ required: true, message: 'Please input your Password' }]}>
                    <Input addonBefore={<LockOutlined />} placeholder="User Password" />
                </Form.Item>
                <HCaptcha sitekey="8a2b9bf5-aaeb-415f-b9a0-3243eefd798f" onVerify={() => handleVerificationSuccess()} />
                <Form.Item>
                    <Button disabled={!submittable} className="flex w-full h-10 items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 justify-center" htmlType="submit">
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
