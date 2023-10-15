import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import QuickAmountInput from '@/components/form/QuickAmountInput';
import { useCustomMutation, useGetIdentity, useApiUrl } from '@refinedev/core';
import { TMe } from '@/types';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useGetSiteSetting } from '@/hooks';

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

    const { default_currency } = useGetSiteSetting();
    const symbol = getSymbolFromCurrency(default_currency.toUpperCase());

    return (
        <div className="px-8 py-[42px] rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] ">
            <span className="text-black font-bold text-2xl">{t('Withdraw')}</span>
            <div className="min-h-[180px]">
                <Form form={form} initialValues={{ amount: '0' }} layout="vertical" className="w-full">
                    <QuickAmountInput
                        formItemProps={{
                            label: t('Amount to transfer'),
                            name: ['amount'],
                            rules: [
                                {
                                    type: 'number',
                                    min: 1,
                                    message: 'Please input amount greater than 0 !',
                                },
                            ],
                        }}
                        inputNumberProps={{
                            prefix: symbol,
                        }}
                    />

                    <Form.Item name={['currency']} hidden initialValue="KRW">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['amount_type']} hidden initialValue="CASH">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user_id']} hidden>
                        <Input />
                    </Form.Item>
                    <Button type="primary" loading={isLoading} className="mt-5 w-full font-bold" onClick={handleWithdraw}>
                        {t('Withdraw')}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default index;
