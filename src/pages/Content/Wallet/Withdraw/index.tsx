import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import QuickAmountInput from '@/components/form/QuickAmountInput';
import { useCustomMutation, useApiUrl } from '@refinedev/core';
import { TMe } from '@/types';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useGetSiteSetting } from '@/hooks';
import { useShowPc } from '@/hooks/useShowPc';

const index: React.FC<{ userInfo?: TMe }> = ({ userInfo }) => {
    const isPc = useShowPc();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);
    const userId = userInfo?.id;
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
                        onSuccess: (_data) => {
                            // const txnId = data?.data?.data?.id;
                            Modal.success({
                                centered: true,
                                title: '출금신청',
                                content: (
                                    <div className="flex flex-col">
                                        <span>* 정상적으로 출금신청 되었습니다</span>
                                        <span>* 완료까지는 5~15분이 소요될 예정입니다</span>
                                    </div>
                                ),
                            });
                            // notification.success({
                            //     key: 'withdraw',
                            //     message: `Submit $${values.amount} withdraw  Success #${txnId}`,
                            //     description: 'Please wait for the administrator to review, we will reply in 3 working days.',
                            //     duration: null,
                            // });
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
    /**
     * 取得用戶可提款餘額
     * 如果用戶身上有deposit_bonus則判斷有效投注有沒有達到限制金額，如果沒有達到，禁用提款按鈕
     * 限制金額=rolling percentage * 當時存款金額
     * 否則，直接顯示可提款餘額balance
     */
    const LimitAmountFn = () => {
        //如果用戶身上有deposit_bonus及last_deposit
        if (userInfo?.last_deposit?.deposit_bonus) {
            //判斷有效投注有沒有達到限制金額
            if (userInfo?.validBetAmount > userInfo?.last_deposit?.amount * userInfo?.last_deposit?.deposit_bonus?.rolling_percentage)
                //有則顯示可提款餘額balance
                return balance;
            //否則為0，自然就禁用提款按鈕
            else return 0;
        }
        //如果沒有存款紅利限制，則可提款餘額為balance
        return balance;
    };
    const withdrawable = LimitAmountFn();

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
                        <span className="text-sm text-[#828282] font-medium">{isPc ? t('Amount to withdraw') : ''}</span>
                        {/* 暫時性隱藏
												<span className="text-sm text-[#828282] font-medium">{`${t('餘額')}:${balance.toLocaleString()} / ${t('可提領額度')}:${withdrawable.toLocaleString()}`}</span> */}
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
                            max: withdrawable,
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
