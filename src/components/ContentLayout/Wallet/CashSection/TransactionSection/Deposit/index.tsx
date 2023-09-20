import React from 'react';
import { Form, Input, notification, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import AmountInput from '../Mybalance/AmountInput';
import SendButton from '../Mybalance/SendButton';
import { LockOutlined } from '@ant-design/icons';
import { useGetIdentity, useCustomMutation, useApiUrl } from '@refinedev/core';
import { TUser } from '@/types';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { data: identity } = useGetIdentity<TUser>();
    const userId = identity?.id;
    const { mutate: deposit, isLoading } = useCustomMutation();
    const apiUrl = useApiUrl();

    const handleDeposit = () => {
        form.validateFields()
            .then((values) => {
                deposit(
                    {
                        url: `${apiUrl}/codepay/deposit`,
                        method: 'post',
                        values,
                    },
                    {
                        onSuccess: () => {
                            notification.success({
                                message: `Deposit $${values.amount} Success`,
                            });
                        },
                    },
                );
            })
            .catch((errorInfo) => {
                console.log('errorInfo', errorInfo);
            });
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <Form form={form} initialValues={{ amount: '0' }} layout="vertical">
                <AmountInput label={t('Amount to transfer')} itemName={['amount']} />

                <div className="mt-8">
                    <Form.Item
                        name={['simpleAddressFrom']}
                        label={t('Your CodePay Simple Address')}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your simple address!',
                            },
                        ]}
                    >
                        <Input prefix="¥" style={{ textAlign: 'right' }} />
                    </Form.Item>

                    <Form.Item
                        name={['sendPassword']}
                        label={t('Your CodePay Send Password')}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} style={{ textAlign: 'right' }} />
                    </Form.Item>
                    <Form.Item name={['currency']} hidden initialValue="KRW">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user_id']} hidden initialValue={userId}>
                        <Input />
                    </Form.Item>
                </div>

                <Alert
                    message={<span className="font-semibold">{t("Don't have Code Pay account?")}</span>}
                    description={
                        <div>
                            <a href="http://www.codepay.co.kr/" target="_blank">
                                <img className="w-[100px] my-2" src="http://www.codepay.co.kr/img/logo.png" />
                            </a>
                            <p>
                                go to{' '}
                                <a href="http://www.codepay.co.kr/" target="_blank">
                                    http://www.codepay.co.kr/
                                </a>{' '}
                                to register an account.
                            </p>
                        </div>
                    }
                    type="warning"
                    showIcon
                />

                <SendButton loading={isLoading} label={t('Deposit')} className="mt-5 w-full" onClick={handleDeposit} />
            </Form>
        </div>
    );
};

export default index;
