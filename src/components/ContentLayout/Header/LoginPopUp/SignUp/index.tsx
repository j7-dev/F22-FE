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
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { TRegisterPayload } from '@/types';
import password from '@/assets/images/loginFrom/password.svg';
import userName from '@/assets/images/loginFrom/userName.svg';
import phoneNumber from '@/assets/images/loginFrom/phoneNumber.svg';
import bankNumber from '@/assets/images/loginFrom/bankNumber.svg';
import bankName from '@/assets/images/loginFrom/bankName.svg';
import bankCode from '@/assets/images/loginFrom/bankCode.svg';

const index: React.FC = () => {
    const { t } = useTranslation();
    const captchaSignUpRef = useRef<HCaptcha>(null);
    const { mutate: register, isLoading } = useRegister<TRegisterPayload>();
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const setLoginOrSignUp = useSetAtom(loginOrSignUpAtom); //true:login false:signUp
    const [form] = Form.useForm();
    const [verifyError, setVerifyError] = useState('');
    const [submitTable, setSubmitTable] = useState(false);
    const handleSignUp = async (values: TRegisterPayload) => {
        if (captchaSignUpRef?.current) {
            await captchaSignUpRef.current
                ?.execute({ async: true })
                .then((_token) => {
                    // console.log('SignUpValues', values);
                    const sendValues = {
                        ...values,
                        redirectPath: '/wallet',
                    };
                    register(sendValues, {
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
                    });
                })
                .catch((err) => {
                    console.error(err);
                    setVerifyError('Verification failed');
                    return;
                });
        } else {
            console.error('captchaSignUpRef.current is null');
            return;
        }
    };

    const handleToLogin = () => {
        setLoginOrSignUp(true);
    };

    //自定義驗證規則=>確認密碼
    const validateFunction = (_: object, value: string) => {
        if (value !== form.getFieldValue('password')) {
            return Promise.reject('The two passwords that you entered do not match!');
        }
        return Promise.resolve();
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
        <div className="signUpFromSection overflow-y-scroll text-center flex flex-col gap-2.5 w-full">
            <span className="text-4xl text-center font-semibold text-white mb-9">{t('USER SIGN UP')}</span>
            {/* 錯誤訊息 */}
            {verifyError && <p className="text-danger text-red-600 font-bold">{verifyError}</p>}
            <Form form={form} onFinish={handleSignUp} className="signUp">
                <Form.Item hidden name="userEmail" />
                <Form.Item name="userName" rules={[{ required: true, message: 'Please input your Name' }]}>
                    <Input placeholder="User Name" prefix={<img src={userName} />} bordered={false} />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password' }]}>
                    <Input.Password placeholder="User Password" prefix={<img src={password} />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} bordered={false} />
                </Form.Item>
                <Form.Item name="confirmPassword" rules={[{ required: true, message: 'Please input your Password' }, { validator: validateFunction }]}>
                    <Input.Password placeholder="Confirm Password" prefix={<img src={password} />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} bordered={false} />
                </Form.Item>
                <Form.Item name="userPhone" rules={[{ required: true, message: 'Please input your Phone' }]}>
                    <Input placeholder="User Phone" prefix={<img src={phoneNumber} />} bordered={false} />
                </Form.Item>
                <Form.Item name={['bank_account', 'bank_name']} rules={[{ required: true, message: 'Please input your Phone' }]}>
                    <Input placeholder="Bank Name" prefix={<img src={bankName} />} bordered={false} />
                </Form.Item>
                <Form.Item name={['bank_account', 'bank_code']} rules={[{ required: true, message: 'Please input your Phone' }]}>
                    <Input placeholder="Bank Code" prefix={<img src={bankCode} />} bordered={false} />
                </Form.Item>
                <Form.Item name={['bank_account', 'bank_account_number']} rules={[{ required: true, message: 'Please input your Phone' }]}>
                    <Input.Password placeholder="Bank Account Number" prefix={<img src={bankNumber} />} bordered={false} />
                </Form.Item>
                <HCaptcha id='id="signUpHCaptcha"' size="invisible" ref={captchaSignUpRef} sitekey="8a2b9bf5-aaeb-415f-b9a0-3243eefd798f" />
                <Form.Item className="mb-0">
                    <Button loading={isLoading} disabled={!submitTable} className="mt-6 flex w-[200px] m-auto h-10 items-center rounded-2xl text-xl font-semibold bg-white text-[#5932EA] justify-center shadow-[2px_4px_4px_0px_#4F2AEA2B]" htmlType="submit">
                        {t('Sign Up')}
                    </Button>
                </Form.Item>
            </Form>
            <div className="text-white flex flex-col">
                <span className="font-normal text-sm">{t('have an account?')}</span>
                <span className="text-sm font-bold cursor-pointer" onClick={handleToLogin}>
                    {t('Log In')}
                </span>
            </div>
        </div>
    );
};

export default index;
