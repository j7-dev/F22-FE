import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetAtom, useAtom } from 'jotai';
import { Form, Input, Button, Modal, Radio, notification } from 'antd';
import { useRegister } from '@refinedev/core';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { signInAtom, signUpAtom } from '@/components/ContentLayout/Header/LoginModule';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { TRegisterPayload } from '@/types';
// import { useCheckUserName } from '@/hooks/resources/useCheckUserName';
import password from '@/assets/images/loginFrom/password.svg';
import userName from '@/assets/images/loginFrom/userName.svg';
import phoneNumber from '@/assets/images/loginFrom/phoneNumber.svg';
import bankNumber from '@/assets/images/loginFrom/bankNumber.svg';
import bankName from '@/assets/images/loginFrom/bankName.svg';
import bankCode from '@/assets/images/loginFrom/bankCode.svg';
import { AiFillCloseCircle } from 'react-icons/ai';

const index: React.FC = () => {
    const { t } = useTranslation();
    //判斷Modal是否打開
    const [signUp, setSignUp] = useAtom(signUpAtom);
    const setSignIn = useSetAtom(signInAtom);
    //取得檢查用戶名是否已存在方法
    // const { checkUserName } = useCheckUserName();
    const captchaSignUpRef = useRef<HCaptcha>(null);
    const { mutate: register, isLoading } = useRegister<TRegisterPayload>();
    const [form] = Form.useForm();
    const [verifyError, setVerifyError] = useState('');
    const [submitTable, setSubmitTable] = useState(false);

    //點擊註冊會員
    const handleSignUp = (values: TRegisterPayload) => {
        if (captchaSignUpRef?.current) {
            captchaSignUpRef.current
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
                            setSignUp(false);
                        },
                        onError: (error: any) => {
                            const message = error?.response?.data?.error || 'Something went wrong';
                            notification.error({
                                key: 'register',
                                message,
                            });
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
        setSignUp(false);
        setSignIn(true);
    };
    //自定義驗證規則=>用戶名，只能輸入英文與數字，並且長度大於等於3，且不能重複註冊
    const userNameValidateFunction = (_: object, value: string) => {
        // console.log('userNameValidateFunction', value);
        if (value.length < 3) {
            return Promise.reject('The length of user name must be greater than or equal to 3');
        }
        if (!/^[A-Za-z0-9]+$/.test(value)) {
            return Promise.reject('User name can only enter English and numbers');
        }
        //FIXME 如何檢查用戶名是否已存在
        // const { isExist } = checkUserName(value);
        // if (isExist) {
        //     return Promise.reject('User name already exists');
        // }
        return Promise.resolve();
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
        <Modal
            open={signUp}
            onCancel={() => setSignUp(false)}
            centered
            closeIcon={<AiFillCloseCircle color="#FFFFFF" size={30} />}
            footer={null}
            className="formWrap sm:w-[600px] sm:h-auto w-screen max-w-none"
            classNames={{
                mask: 'bg-[#000000d9] blur-sm',
                content: 'bg-gradient-to-b from-[#BAA8FF] to-[#5932EA] shadow-[0px_0px_10px_4px_#D4C9FF33] py-[50px] sm:px-[100px] px-[45px]',
            }}
        >
            <div className="signUpFromSection text-center flex flex-col sm:gap-2.5 w-full h-full">
                <span className="text-[30px] text-center font-semibold text-white sm:mb-9 mb-8">{t('User Sign Up')}</span>
                {/* 錯誤訊息 */}
                {verifyError && <p className="text-danger text-red-600 font-bold">{verifyError}</p>}
                <Form form={form} onFinish={handleSignUp} className="signUp">
                    <Form.Item hidden name="userEmail" />
                    <Form.Item name="userName" rules={[{ required: true, message: 'Please input your Name' }, { validator: userNameValidateFunction }]}>
                        <Input placeholder={t('User Name')} prefix={<img src={userName} />} bordered={false} />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password' }]}>
                        <Input.Password placeholder={t('User Password')} prefix={<img src={password} />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} bordered={false} />
                    </Form.Item>
                    <Form.Item name="confirmPassword" rules={[{ required: true, message: 'Please input your Password' }, { validator: validateFunction }]}>
                        <Input.Password placeholder={t('Confirm Password')} prefix={<img src={password} />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} bordered={false} />
                    </Form.Item>
                    <Form.Item name="userPhone" rules={[{ required: true, message: 'Please input your Phone' }]}>
                        <Input placeholder={t('Phone Number')} prefix={<img src={phoneNumber} />} bordered={false} />
                    </Form.Item>
                    <Form.Item name={['bank_account', 'owner_real_name']} rules={[{ required: true, message: 'Please input your Phone' }]}>
                        <Input placeholder={t('Full Name')} prefix={<img src={bankName} />} bordered={false} />
                    </Form.Item>
                    <Form.Item name={['bank_account', 'bank_code']} rules={[{ required: true, message: 'Please input your Phone' }]}>
                        <Input placeholder={t('Bank Code')} prefix={<img src={bankCode} />} bordered={false} />
                    </Form.Item>
                    <Form.Item name={['bank_account', 'bank_account_number']} rules={[{ required: true, message: 'Please input your Phone' }]}>
                        <Input.Password placeholder={t('Bank Account Number')} prefix={<img src={bankNumber} />} bordered={false} />
                    </Form.Item>
                    <Form.Item name="privacy" rules={[{ required: true, message: 'Please agree the Terms' }]}>
                        <Radio.Group>
                            <Radio value="yes" className="">
                                {t('I agree with all the Terms and Conditions & Privacy Policy and I am over 18 years old')}
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <HCaptcha id='id="signUpHCaptcha"' size="invisible" ref={captchaSignUpRef} sitekey="8a2b9bf5-aaeb-415f-b9a0-3243eefd798f" />
                    <Form.Item className="mb-0">
                        <Button loading={isLoading} disabled={!submitTable} className="border-0 mt-6 flex w-[200px] m-auto h-10 items-center rounded-2xl text-xl font-semibold bg-white text-[#5932EA] justify-center shadow-[2px_4px_4px_0px_#4F2AEA2B]" htmlType="submit">
                            {t('Sign Up')}
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-white flex justify-center gap-1">
                    <span className="font-normal text-sm">{t('have an account?')}</span>
                    <span className="underline text-sm font-bold cursor-pointer" onClick={handleToLogin}>
                        {t('Log In')}
                    </span>
                </div>
            </div>
        </Modal>
    );
};

export default index;
