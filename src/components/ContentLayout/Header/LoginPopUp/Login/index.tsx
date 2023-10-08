import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetAtom, useAtom } from 'jotai';
import { Form, Input, Button } from 'antd';
import { useLogin, useIsAuthenticated } from '@refinedev/core';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { popupIsOpenAtom, loginOrSignUpAtom, verifyAtom, verifyErrorAtom } from '@/components/ContentLayout/Header/LoginModule';

type LoginVariables = {
    userName: string;
    password: string;
    redirectPath: string;
};

const index: React.FC = () => {
    const { t } = useTranslation();
    const { mutate: login } = useLogin<LoginVariables>();
    const { data: isAuthenticated } = useIsAuthenticated();
    const captchaRef = useRef<HCaptcha>(null);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const setLoginOrSignUp = useSetAtom(loginOrSignUpAtom); //true:login false:signUp
    const [form] = Form.useForm();
    const [verify, setVerify] = useAtom(verifyAtom);
    const [verifyError, setVerifyError] = useAtom(verifyErrorAtom);
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

    // //判斷是否登出，並且重置驗證表單
    useEffect(() => {
        if (captchaRef.current !== null && isAuthenticated?.authenticated === false) {
            captchaRef.current.resetCaptcha();
        }
    }, [isAuthenticated?.authenticated]);
    return (
        <div className="loginFrom text-center flex flex-col gap-2.5 w-full">
            <span className="text-4xl text-center font-semibold text-white mb-9">{t('USER LOGIN')}</span>
            {/* 錯誤訊息 */}
            {verifyError && <p className="text-danger text-red-600 font-bold">{verifyError}</p>}
            <Form form={form} onFinish={handleLogin}>
                <Form.Item name="userName" rules={[{ required: true, message: 'Please input your Name' }]}>
                    <Input placeholder="User Name" bordered={false} className="text-center bg-[#ffffffcc] h-[50px] rounded-2xl text-base font-normal placeholder:text-[#9680EA]" />
                </Form.Item>
                <Form.Item name="userPas" rules={[{ required: true, message: 'Please input your Password' }]}>
                    <Input placeholder="User Password" bordered={false} className="text-center bg-[#ffffffcc] h-[50px] rounded-2xl text-base font-normal placeholder:text-[#9680EA]" />
                </Form.Item>
                <HCaptcha ref={captchaRef} sitekey="8a2b9bf5-aaeb-415f-b9a0-3243eefd798f" onVerify={() => handleVerificationSuccess()} />
                <Form.Item className="mb-0">
                    <Button disabled={!submittable} className="mt-6 flex w-[200px] m-auto h-10 items-center rounded-2xl text-xl font-semibold bg-white text-[#5932EA] justify-center shadow-[2px_4px_4px_0px_#4F2AEA2B]" htmlType="submit">
                        {t('LOGIN')}
                    </Button>
                </Form.Item>
            </Form>
            <div className="text-white flex flex-col">
                <span className="font-normal text-sm"> {t("Don't have an account yet?")}</span>
                <span className="text-sm font-bold cursor-pointer" onClick={handleToSignUp}>
                    Sign Up
                </span>
            </div>
        </div>
    );
};

export default index;
