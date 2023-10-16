import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetAtom, useAtom } from 'jotai';
import { Form, Input, Button } from 'antd';
import { useLogin, useIsAuthenticated } from '@refinedev/core';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { popupIsOpenAtom, loginOrSignUpAtom, verifyErrorAtom } from '@/components/ContentLayout/Header/LoginModule';
import passwordIcon from '@/assets/images/loginFrom/password.svg';
import userNameIcon from '@/assets/images/loginFrom/userName.svg';

type LoginVariables = {
    userName: string;
    password: string;
    redirectPath: string;
};

const index: React.FC = () => {
    const { t } = useTranslation();
    const { mutate: login, isLoading } = useLogin<LoginVariables>();
    const { data: isAuthenticated } = useIsAuthenticated();
    // console.log('🚀 ~ isAuthenticated:', isAuthenticated);
    const captchaRef = useRef<HCaptcha>(null);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const setLoginOrSignUp = useSetAtom(loginOrSignUpAtom); //true:login false:signUp
    const [form] = Form.useForm();
    const [verifyError, setVerifyError] = useAtom(verifyErrorAtom);
    const [submittable, setSubmittable] = useState(false);

    const handleLogin = async (values: { userName: string; userPas: string }) => {
        //先進行驗證後登入
        if (captchaRef?.current) {
            await captchaRef.current
                ?.execute({ async: true })
                .then((_token) => {
                    const { userName, userPas } = values;
                    login(
                        { userName: userName, password: userPas, redirectPath: '/wallet' },
                        {
                            onSuccess: (data) => {
                                if (!data.success) {
                                    // handle error
                                }
                                setPopupIsOpen(false);
                            },
                            onError: (error) => {
                                console.log('錯誤訊息', error);
                            },
                        },
                    );
                })
                .catch((err) => {
                    console.error(err);
                    setVerifyError('Verification failed');
                    return;
                });
        } else {
            console.error('captchaRef.current is null');
            return;
        }
    };
    const handleToSignUp = () => {
        setLoginOrSignUp(false);
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

    // //判斷是否登出，並且重置表單及驗證表單
    useEffect(() => {
        if (captchaRef.current && isAuthenticated?.authenticated === false) {
            captchaRef.current.resetCaptcha();
            form.resetFields();
        }
    }, [isAuthenticated?.authenticated]);
    return (
        <div className="loginFromSection text-center flex flex-col gap-2.5 w-full">
            <span className="text-4xl text-center font-semibold text-white mb-9">{t('USER LOGIN')}</span>
            {/* 錯誤訊息 */}
            {verifyError && <p className="text-danger text-red-600 font-bold">{verifyError}</p>}
            <Form form={form} onFinish={handleLogin} className="login">
                <Form.Item name="userName" rules={[{ required: true, message: 'Please input your Name' }]}>
                    <Input placeholder="User Name" prefix={<img src={userNameIcon} />} bordered={false} />
                </Form.Item>
                <Form.Item name="userPas" rules={[{ required: true, message: 'Please input your Password' }]}>
                    <Input.Password placeholder="User Password" prefix={<img src={passwordIcon} />} bordered={false} />
                </Form.Item>
                <HCaptcha id="loginHCaptcha" size="invisible" ref={captchaRef} sitekey="8a2b9bf5-aaeb-415f-b9a0-3243eefd798f" />
                <Form.Item className="mb-0">
                    <Button loading={isLoading} disabled={!submittable} className="mt-6 flex w-[200px] m-auto h-10 items-center rounded-2xl text-xl font-semibold bg-white text-[#5932EA] justify-center shadow-[2px_4px_4px_0px_#4F2AEA2B]" htmlType="submit">
                        {t('LOGIN')}
                    </Button>
                </Form.Item>
            </Form>
            <div className="text-white flex flex-col">
                <span className="font-normal text-sm"> {t("Don't have an account yet?")}</span>
                <span className="text-sm font-bold cursor-pointer" onClick={handleToSignUp}>
                    {t('Sign Up')}
                </span>
            </div>
        </div>
    );
};

export default index;
