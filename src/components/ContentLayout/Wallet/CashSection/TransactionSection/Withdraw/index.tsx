import React from 'react';
import { Form, Input, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import AmountInput from '../Mybalance/AmountInput';
import SendButton from '../Mybalance/SendButton';
import { useCustomMutation, useGetIdentity, useApiUrl } from '@refinedev/core';
import { TMe } from '@/types';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { data: identity } = useGetIdentity<TMe>();
    const userId = identity?.id;
    const { mutate: withdraw, isLoading } = useCustomMutation();
    const apiUrl = useApiUrl();
    const handleWithdraw = () => {
        form.validateFields()
            .then((values) => {
                withdraw(
                    {
                        url: `${apiUrl}/wallet-api/cash/withdraw`,
                        method: 'post',
                        values: { ...values, user_id: userId },
                    },
                    {
                        onSuccess: (data) => {
                            const txnId = data?.data?.data?.id;
                            notification.success({
                                key: 'withdraw',
                                message: `Submit $${values.amount} withdraw  Success #${txnId}`,
                                description: 'Please wait for the administrator to review, we will reply in 3 working days.',
                                duration: null,
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
            <Form form={form} initialValues={{ amount: '0' }}>
                <AmountInput label={t('Amount to transfer')} itemName="amount" />

                <Form.Item name={['currency']} hidden initialValue="KRW">
                    <Input />
                </Form.Item>
                <Form.Item name={['amount_type']} hidden initialValue="CASH">
                    <Input />
                </Form.Item>
                <Form.Item name={['user_id']} hidden>
                    <Input />
                </Form.Item>
                <SendButton loading={isLoading} label={t('Withdraw')} className="mt-5 w-full" onClick={handleWithdraw} />
            </Form>
        </div>
    );
};

export default index;
