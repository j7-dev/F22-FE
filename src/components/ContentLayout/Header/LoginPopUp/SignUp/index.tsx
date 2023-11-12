import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetAtom, useAtom } from 'jotai';
import { Form, Input, Button, Modal, Radio, notification } from 'antd';
import { useRegister, useGetLocale } from '@refinedev/core';
import ReCAPTCHA from 'react-google-recaptcha';
import { signInAtom, signUpAtom } from '@/components/ContentLayout/Header/LoginModule';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { TRegisterPayload } from '@/types';
import { useCheckUserName } from '@/hooks/resources/useCheckUserName';
import password from '@/assets/images/loginFrom/password.svg';
import userName from '@/assets/images/loginFrom/userName.svg';
import phoneNumber from '@/assets/images/loginFrom/phoneNumber.svg';
import bankNumber from '@/assets/images/loginFrom/bankNumber.svg';
import bankName from '@/assets/images/loginFrom/bankName.svg';
import bankCode from '@/assets/images/loginFrom/bankCode.svg';
import { AiFillCloseCircle } from 'react-icons/ai';
import { RECAPTCHA_SITE_KEY } from '@/utils/env';

const index: React.FC = () => {
    const locale = useGetLocale()(); //取得語系
    const { t } = useTranslation();
    //判斷Modal是否打開
    const [signUp, setSignUp] = useAtom(signUpAtom);
    const setSignIn = useSetAtom(signInAtom);
    //取得檢查用戶名是否已存在方法
    const { checkUserName } = useCheckUserName();

    const { mutate: register, isLoading } = useRegister<TRegisterPayload>();
    const [form] = Form.useForm();
    const [verifyError, setVerifyError] = useState('');
    const [submitTable, setSubmitTable] = useState(false);
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
    //點擊註冊會員
    const handleSignUp = (values: TRegisterPayload) => {
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
    };

    const handleToLogin = () => {
        setSignUp(false);
        setSignIn(true);
    };
    //自定義驗證規則=>用戶名，只能輸入英文與數字，並且長度大於等於3，且不能重複註冊
    const userNameValidateFunction = (_: object, value: string) => {
        // console.log('userNameValidateFunction', value);
        if (value.length < 3) {
            return Promise.reject(t('The length of user name must be greater than or equal to 3'));
        }
        if (!/^[A-Za-z0-9]+$/.test(value)) {
            return Promise.reject(t('User name can only enter English and numbers'));
        }
        return Promise.resolve();
    };
    //檢查用戶名是否已存在
    const handleCheckUserName = async (e: any) => {
        const checkUserNameData = await checkUserName(e.target.value);
        //{data:true/false , message:"available"/"registered, please try another one" , status:"200"}
        if (!checkUserNameData.data) {
            form.setFields([
                {
                    name: 'userName',
                    errors: ['이미 가입된 아이디 입니다,다시 입력해주세요'],
                },
            ]);
        }
    };
    //自訂驗證規則=>密碼長度大於6
    const passwordValidateFunction = (_: object, value: string) => {
        if (value?.length < 6) {
            return Promise.reject(t('The length of password must be greater than or equal to 6'));
        }
        return Promise.resolve();
    };
    //自定義驗證規則=>確認密碼
    const confirmPasswordValidator = (_: object, value: string) => {
        if (value !== form.getFieldValue('password')) {
            return Promise.reject(t('The two passwords that you entered do not match!'));
        }
        return Promise.resolve();
    };
    //驗證規則=>只能輸入數字
    const numberValidator = (_: object, value: string) => {
        const userPhoneValue = value;
        const pattern = /^[0-9]*$/;
        pattern.test(userPhoneValue);
        if (!pattern.test(userPhoneValue)) {
            return Promise.reject(t('Please input Number'));
        }
        return Promise.resolve();
    };
    // Watch all values
    const values = Form.useWatch([], form);
    useEffect(() => {
        //動態賦予userEmail
        form.setFieldsValue({ userEmail: `${values?.userName}@smtbet7.com` });
        form.validateFields({ validateOnly: true }).then(
            //成功回調
            () => {
                //判斷是否有錯誤訊息，沒有的話就可以提交表單
                if (form.getFieldsError(['userName'])[0].errors.length === 0 && reCaptcha !== null) return setSubmitTable(true);
                setSubmitTable(false);
            },
            //失敗回調
            () => {
                setSubmitTable(false);
            },
        );
    }, [values, reCaptcha]);

    return (
        <Modal
            open={signUp}
            onCancel={() => setSignUp(false)}
            centered
            closeIcon={<AiFillCloseCircle color="#FFFFFF" size={30} />}
            footer={null}
            className="formWrap w-[600px] md:h-auto max-w-none"
            classNames={{
                mask: 'bg-[#000000d9] blur-sm',
                content: 'bg-gradient-to-b from-[#BAA8FF] to-[#5932EA] shadow-[0px_0px_10px_4px_#D4C9FF33] py-[50px] md:px-[100px] px-[45px]',
            }}
        >
            <div className="signUpFromSection text-center flex flex-col md:gap-2.5 w-full h-full">
                <span className="text-[30px] text-center font-semibold text-white md:mb-9 mb-8">{t('User Sign Up')}</span>
                {/* 錯誤訊息 */}
                {verifyError && <p className="text-danger text-red-600 font-bold">{verifyError}</p>}
                <Form form={form} onFinish={handleSignUp} className="signUp">
                    <Form.Item hidden name="userEmail" />
                    <Form.Item name="userName" rules={[{ required: true, message: t('Please input your Name') }, { validator: userNameValidateFunction }]}>
                        <Input onBlur={handleCheckUserName} placeholder={t('User Name')} prefix={<img src={userName} />} bordered={false} />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: t('Please input your Password') }, { validator: passwordValidateFunction }]}>
                        <Input.Password placeholder={t('User Password')} prefix={<img src={password} />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} bordered={false} />
                    </Form.Item>
                    <Form.Item name="confirmPassword" rules={[{ required: true, message: t('Please input your Password') }, { validator: confirmPasswordValidator }]}>
                        <Input.Password placeholder={t('Confirm Password')} prefix={<img src={password} />} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} bordered={false} />
                    </Form.Item>
                    <Form.Item name="userPhone" rules={[{ required: true, message: t('Please input your Phone') }, { validator: numberValidator }]}>
                        <Input placeholder={t('Phone Number')} prefix={<img src={phoneNumber} />} bordered={false} pattern="/^[0-9]+$/" />
                    </Form.Item>
                    <Form.Item name={['bank_account', 'owner_real_name']} rules={[{ required: true, message: t('Please input your Owner Real Name') }]}>
                        <Input placeholder={t('Full Name')} prefix={<img src={bankName} />} bordered={false} />
                    </Form.Item>
                    <Form.Item name={['bank_account', 'bank_name']} rules={[{ required: true, message: t('Please input your Bank Name') }]}>
                        <Input placeholder={t('Bank Name')} prefix={<img src={bankCode} />} bordered={false} />
                    </Form.Item>
                    <Form.Item name={['bank_account', 'bank_account_number']} rules={[{ required: true, message: t('Please input your Bank Account Number') }]}>
                        <Input.Password placeholder={t('Bank Account Number')} prefix={<img src={bankNumber} />} bordered={false} />
                    </Form.Item>
                    <Form.Item name="privacy" rules={[{ required: true, message: t('Please agree the Terms') }]}>
                        <Radio.Group>
                            <Radio value="yes" className="">
                                {t('I agree with all the Terms and Conditions & Privacy Policy and I am over 18 years old')}
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <ReCAPTCHA ref={reCaptchaRef} hl={locale} onChange={(token: string | null) => onChange(token)} onErrored={() => onErrored()} onExpired={() => onExpired()} className="flex justify-center" sitekey={RECAPTCHA_SITE_KEY} />
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
