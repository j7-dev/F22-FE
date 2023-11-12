import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetAtom, useAtom } from 'jotai';
import { Form, Input, Button, Modal } from 'antd';
import { useLogin, useIsAuthenticated, useGetLocale } from '@refinedev/core';
import ReCAPTCHA from 'react-google-recaptcha';
import { verifyErrorAtom, signInAtom, signUpAtom } from '@/components/ContentLayout/Header/LoginModule';
import passwordIcon from '@/assets/images/loginFrom/password.svg';
import userNameIcon from '@/assets/images/loginFrom/userName.svg';
import { AiFillCloseCircle } from 'react-icons/ai';
import { RECAPTCHA_SITE_KEY } from '@/utils/env';
// import { useShowPc } from '@/hooks/useShowPc';

type LoginVariables = {
    userName: string;
    password: string;
    redirectPath: string;
};

const index: React.FC = () => {
    const locale = useGetLocale()(); //取得語系
    const { t } = useTranslation();
    const [signIn, setSignIn] = useAtom(signInAtom);
    const setSignUp = useSetAtom(signUpAtom);
    const { mutate: login, isLoading } = useLogin<LoginVariables>();
    const { data: isAuthenticated } = useIsAuthenticated(); //取得登入狀態
    const [form] = Form.useForm();
    const [verifyError, setVerifyError] = useAtom(verifyErrorAtom);
    const [submittable, setSubmittable] = useState(false);
    //Google驗證
    const reCaptchaRef = useRef<ReCAPTCHA>(null);
    const [reCaptcha, setReCaptcha] = useState<null | string>(null);
    //成功回調
    const onChange = (value: string | null) => {
        setVerifyError('');
        setReCaptcha(value);
    };
    //錯誤回調
    const onErrored = () => {
        setVerifyError('Verification Failed');
        setReCaptcha(null);
    };
    //過期回調
    const onExpired = () => {
        setVerifyError('Verification Expired');
        setReCaptcha(null);
    };
    //登入事件
    const handleLogin = async (values: { userName: string; userPas: string }) => {
        const { userName, userPas } = values;
        login(
            { userName: userName, password: userPas, redirectPath: '/wallet' },
            {
                onSuccess: (data) => {
                    if (!data.success) {
                        // handle error
                    }
                    setSignIn(false);
                },
                onError: (error) => {
                    console.log('錯誤訊息', error);
                },
            },
        );
    };

    //點擊註冊按鈕，關閉登入彈窗，打開註冊彈窗
    const handleToSignUp = () => {
        setSignIn(false);
        setSignUp(true);
    };

    // Watch all values
    const values = Form.useWatch([], form);
    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                //驗證成功才能點擊送出
                if (reCaptcha !== null) return setSubmittable(true);
                setSubmittable(false);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values, reCaptcha]);

    //登出後重置表單
    useEffect(() => {
        form.resetFields();
    }, [isAuthenticated?.authenticated]);

    return (
        <>
            <Modal
                open={signIn}
                onCancel={() => setSignIn(false)}
                centered
                closeIcon={<AiFillCloseCircle color="#FFFFFF" size={30} />}
                footer={null}
                className="formWrap md:w-[600px] md:h-auto w-screen max-w-none"
                classNames={{
                    mask: 'md:bg-[#000000d9] blur-sm ',
                    content: 'bg-gradient-to-b from-[#BAA8FF] to-[#5932EA] shadow-[0px_0px_10px_4px_#D4C9FF33] md:px-[100px] py-[50px] px-[45px]',
                }}
            >
                {/* <MobileCloseBtn /> */}
                <div className="loginFromSection text-center flex flex-col gap-2.5 w-full">
                    <span className="text-[30px] text-center font-semibold text-white mb-9">{t('Sign In')}</span>
                    {/* 錯誤訊息 */}
                    {verifyError && <p className="text-danger text-red-600 font-bold">{verifyError}</p>}
                    <Form form={form} onFinish={handleLogin} className="login">
                        <Form.Item name="userName" rules={[{ required: true, message: t('Please input your Name') }]}>
                            <Input placeholder={t('User Name')} prefix={<img src={userNameIcon} />} bordered={false} />
                        </Form.Item>
                        <Form.Item name="userPas" rules={[{ required: true, message: t('Please input your Password') }]}>
                            <Input.Password placeholder={t('User Password')} prefix={<img src={passwordIcon} />} bordered={false} />
                        </Form.Item>
                        <ReCAPTCHA ref={reCaptchaRef} hl={locale} onChange={(token: string | null) => onChange(token)} onErrored={() => onErrored()} onExpired={() => onExpired()} className="flex justify-center" sitekey={RECAPTCHA_SITE_KEY} />
                        <Form.Item className="mb-0">
                            <Button loading={isLoading} disabled={!submittable} className="border-0 mt-6 flex w-[200px] m-auto h-10 items-center rounded-2xl text-xl font-semibold bg-white text-[#5932EA] justify-center shadow-[2px_4px_4px_0px_#4F2AEA2B]" htmlType="submit">
                                {t('Sign In')}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="text-white flex justify-center gap-1">
                        <span className="font-normal text-sm"> {t("Don't have an account yet?")}</span>
                        <span className="underline text-sm font-bold cursor-pointer" onClick={handleToSignUp}>
                            {t('Sign Up')}
                        </span>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default index;
