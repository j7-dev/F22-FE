//1.API URL https://be-dev.smtbet7.com/api/auth/local/register
//2.payload json 格式 帶入uuid(唯一值) userEmail,username,password,confirmed": true,"blocked": false
//3.不用帶入token
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetAtom } from 'jotai';
import { Form, Input, Button } from 'antd';
import { useRegister } from '@refinedev/core';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { popupIsOpenAtom, loginOrSignUpAtom } from '@/components/ContentLayout/Header/LoginModule';

type LoginVariables = {
    userEmail: string;
    password: string;
    redirectPath: string;
    userName: string;
    userPhone: number;
};

const index: React.FC = () => {
    const { t } = useTranslation();
    const captchaRef = useRef<HCaptcha>(null);
    const { mutate: register } = useRegister<LoginVariables>();
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const setLoginOrSignUp = useSetAtom(loginOrSignUpAtom); //true:login false:signUp
    const [form] = Form.useForm();
    const [verifyError, setVerifyError] = useState('');
    const [submitTable, setSubmitTable] = useState(false);
    const handleSignUp = async (values: { userEmail: string; userName: string; userPas: string; userPhone: number }) => {
        if (captchaRef?.current) {
            await captchaRef.current
                ?.execute({ async: true })
                .then((_token) => {
                    const { userEmail, userPas, userName, userPhone } = values;
                    // console.log('SignUpValues', values);
                    register(
                        { userEmail: userEmail, userName: userName, password: userPas, userPhone: userPhone, redirectPath: '/wallet' },
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

    const handleToLogin = () => {
        setLoginOrSignUp(true);
    };
    // Watch all values
    const values = Form.useWatch([], form);
    // console.log('values', values);
    useEffect(() => {
        //動態賦予userEmail
        form.setFieldsValue({ userEmail: `${values?.userName}@smtbet7.com` });
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmitTable(true);
            },
            () => {
                setSubmitTable(false);
            },
        );
    }, [values]);

    return (
        <div className="loginFrom text-center flex flex-col gap-2.5 w-full">
            <span className="text-4xl text-center font-semibold text-white mb-9">{t('USER SIGN UP')}</span>
            {/* 錯誤訊息 */}
            {verifyError && <p className="text-danger text-red-600 font-bold">{verifyError}</p>}
            <Form form={form} onFinish={handleSignUp}>
                <Form.Item hidden name="userEmail" />
                <Form.Item name="userName" rules={[{ required: true, message: 'Please input your Name' }]}>
                    <Input placeholder="User Name" bordered={false} className="text-center bg-[#ffffffcc] h-[50px] rounded-2xl text-base font-normal placeholder:text-[#9680EA]" />
                </Form.Item>
                <Form.Item name="userPas" rules={[{ required: true, message: 'Please input your Password' }]}>
                    <Input placeholder="User Password" bordered={false} className="text-center bg-[#ffffffcc] h-[50px] rounded-2xl text-base font-normal placeholder:text-[#9680EA]" />
                </Form.Item>
                <Form.Item name="userPhone" rules={[{ required: true, message: 'Please input your Phone' }]}>
                    <Input placeholder="User Phone" bordered={false} className="text-center bg-[#ffffffcc] h-[50px] rounded-2xl text-base font-normal placeholder:text-[#9680EA]" />
                </Form.Item>
                <HCaptcha size="invisible" ref={captchaRef} sitekey="8a2b9bf5-aaeb-415f-b9a0-3243eefd798f" />
                <Form.Item className="mb-0">
                    <Button disabled={!submitTable} className="mt-6 flex w-[200px] m-auto h-10 items-center rounded-2xl text-xl font-semibold bg-white text-[#5932EA] justify-center shadow-[2px_4px_4px_0px_#4F2AEA2B]" htmlType="submit">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
            <div className="text-white flex flex-col">
                <span className="font-normal text-sm">{t('have an account?')}</span>
                <span className="text-sm font-bold cursor-pointer" onClick={handleToLogin}>
                    Log In
                </span>
            </div>
        </div>
    );
};

export default index;
