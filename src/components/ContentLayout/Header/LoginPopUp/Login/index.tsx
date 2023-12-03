import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetAtom, useAtom } from 'jotai';
import { Form, Input, Button, Modal } from 'antd';
import { useLogin, useIsAuthenticated } from '@refinedev/core';
import { signInAtom, signUpAtom } from '@/components/ContentLayout/Header/LoginModule';
import passwordIcon from '@/assets/images/loginFrom/password.svg';
import userNameIcon from '@/assets/images/loginFrom/userName.svg';
import { AiFillCloseCircle } from 'react-icons/ai';
import SliderCaptcha, { ActionType } from 'rc-slider-captcha';

type LoginVariables = {
    userName: string;
    password: string;
    redirectPath: string;
};

const index: React.FC = () => {
    const { t } = useTranslation();
    const [signIn, setSignIn] = useAtom(signInAtom);
    const setSignUp = useSetAtom(signUpAtom);
    const { mutate: login, isLoading } = useLogin<LoginVariables>();
    const { data: isAuthenticated } = useIsAuthenticated(); //取得登入狀態
    const [form] = Form.useForm();
    const [submittable, setSubmittable] = useState(false);
    //滑塊驗證
    const actionRef = useRef<ActionType>();
    const [captchaState, setCaptchaState] = useState(false);
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
                if (captchaState) return setSubmittable(true);
                setSubmittable(false);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values, captchaState]);

    //登出後重置表單
    useEffect(() => {
        form.resetFields();
        //重置滑塊驗證
        actionRef.current?.refresh();
        setCaptchaState(false);
    }, [isAuthenticated?.authenticated]);

    //一個簡易的組件設定內距
    const TipText = ({ text }: { text: string }) => {
        return <span className="px-10">{t(text)}</span>;
    };
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
                    {/* {verifyError && <p className="text-danger text-red-600 font-bold">{verifyError}</p>} */}
                    <Form form={form} onFinish={handleLogin} className="login">
                        <Form.Item name="userName" rules={[{ required: true, message: t('Please input your Name') }]}>
                            <Input placeholder={t('User Name')} prefix={<img src={userNameIcon} />} bordered={false} />
                        </Form.Item>
                        <Form.Item name="userPas" rules={[{ required: true, message: t('Please input your Password') }]}>
                            <Input.Password placeholder={t('User Password')} prefix={<img src={passwordIcon} />} bordered={false} />
                        </Form.Item>
                        <div className="flex justify-center">
                            <SliderCaptcha
                                mode="slider"
                                tipText={{
                                    default: <TipText text="Please hold down the slider and drag it to the far right" />,
                                    moving: <TipText text="Please hold down the slider and drag it to the far right" />,
                                    error: <TipText text="Verification failed, please try again" />,
                                    success: <TipText text="Verification successful" />,
                                }}
                                errorHoldDuration={1000}
                                onVerify={(data) => {
                                    // console.log(data);
                                    // 默认背景图宽度 320 减去默认拼图宽度 60 所以滑轨宽度是 260
                                    if (data.x === 260) {
                                        setCaptchaState(true);
                                        return Promise.resolve();
                                    }
                                    setCaptchaState(false);
                                    return Promise.reject();
                                }}
                                actionRef={actionRef}
                            />
                        </div>
                        {/* <ReCAPTCHA ref={reCaptchaRef} hl={locale} onChange={(token: string | null) => onChange(token)} onErrored={() => onErrored()} onExpired={() => onExpired()} className="flex justify-center" sitekey={RECAPTCHA_SITE_KEY} /> */}
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
