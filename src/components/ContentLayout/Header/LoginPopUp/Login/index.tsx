import React, { useState, useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { Form, Input, Button } from 'antd';
import { useLogin } from '@refinedev/core';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { popupIsOpenAtom, loginOrSignUpAtom } from '@/components/ContentLayout/Header/LoginModule';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

type LoginVariables = {
    userName: string;
    password: string;
    redirectPath: string;
};

const index: React.FC = () => {
    const { mutate: login } = useLogin<LoginVariables>();
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const setLoginOrSignUp = useSetAtom(loginOrSignUpAtom); //true:login false:signUp
    const [form] = Form.useForm();
    const [verify, setVerify] = useState(false);
    const [verifyError, setVerifyError] = useState('');
    const [submittable, setSubmittable] = useState(false);

    const handleLogin = (values: { userName: string; userPas: string }) => {
        if (!verify) {
            setVerifyError('You must verify the captcha');
            return;
        }
        const { userName, userPas } = values;
        login(
            { userName: userName, password: userPas, redirectPath: '/wallet' },
            {
                onSuccess: (data) => {
                    if (!data.success) {
                        // handle error
                    }
                    // handle success
                    setVerify(false);
                    setPopupIsOpen(false);
                },
                onError: (error) => {
                    console.log('錯誤訊息', error);
                },
            },
        );
    };
    const handleToSignUp = () => {
        setLoginOrSignUp(false);
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
            <span>Available After Login.</span>
            {/* 錯誤訊息 */}
            {verifyError && <p className="text-danger text-red-600 font-bold">{verifyError}</p>}

            <Form form={form} onFinish={handleLogin}>
                <Form.Item name="userName" hasFeedback rules={[{ required: true, message: 'Please input your Email' }]}>
                    <Input addonBefore={<UserOutlined />} placeholder="User Email" />
                </Form.Item>
                <Form.Item name="userPas" hasFeedback rules={[{ required: true, message: 'Please input your Password' }]}>
                    <Input addonBefore={<LockOutlined />} placeholder="User Password" />
                </Form.Item>
                <HCaptcha sitekey="8a2b9bf5-aaeb-415f-b9a0-3243eefd798f" onVerify={() => handleVerificationSuccess()} />
                <Form.Item>
                    <Button disabled={!submittable} className="flex w-full h-10 items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 justify-center" htmlType="submit">
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
