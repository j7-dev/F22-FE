import React, { useState, useEffect } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import QuickAmountInput from '@/components/form/QuickAmountInput';
import { useCustomMutation, useGetIdentity, useApiUrl } from '@refinedev/core';
import { TMe, TUser } from '@/types';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useGetSiteSetting } from '@/hooks';

const index: React.FC<{ userInfo?: TUser }> = ({ userInfo }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);
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
    //取得用戶餘額
    const balance = userInfo?.balances !== undefined ? userInfo?.balances.filter((item) => item.currency === default_currency && item.amount_type === 'CASH')[0].amount || 0 : 0;

    //監聽Form的值，都填寫完畢後，使Button可以點擊
    const values = Form.useWatch([], form);
    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setIsDisabled(false);
            },
            () => {
                setIsDisabled(true);
            },
        );
    }, [values]);
    //取得id = header的元素高度
    const header = document.getElementById('header');
    const headerHeight = header?.clientHeight;
    return (
        <div style={{ minHeight: `calc(100vh - ${headerHeight}px - 72px)` }} className="flex flex-col justify-between bg-white px-8 py-[42px] rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] ">
            <div className="min-h-[180px]">
                <span className="text-black font-bold text-2xl">{t('Withdraw')}</span>
                <Form form={form} initialValues={{ amount: '0' }} layout="vertical" className="w-full">
                    <div className="flex justify-between my-2 w-full">
                        <span className="text-sm text-[#828282] font-medium">{t('Amount to transfer')}</span>
                        <span className="text-sm text-[#828282] font-medium">餘額:{balance.toLocaleString()}/可提領額度:0</span>
                    </div>
                    <QuickAmountInput
                        formItemProps={{
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
                        //隱藏快速按鈕
                        quickButtonProps={{
                            className: 'hidden',
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
                </Form>
            </div>
            <Button disabled={isDisabled} onClick={handleWithdraw} type="primary" loading={isLoading} className={`${isDisabled ? 'bg-[#BDBDBD]' : ''} w-full h-10 sm:h-[65px] sm:text-xl text-base font-bold`}>
                {t('Withdraw')}
            </Button>
        </div>
    );
};

export default index;
