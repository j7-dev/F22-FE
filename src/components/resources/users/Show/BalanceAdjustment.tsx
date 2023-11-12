import { Form, Input, InputNumber, Button, notification } from 'antd';
import { useParams } from 'react-router-dom';
import AmountInput from '@/components/form/AmountInput';
import { useTranslation } from 'react-i18next';
import { TBalance } from '@/types';
import { useCustom, useApiUrl, useCustomMutation, useInvalidate } from '@refinedev/core';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import { LoadingOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';

type TValues = {
    currency: string;
    amount_type: string;
    title: string;
    amount: number;
};

type TType = 'balance' | 'coupon';

const BalanceAdjustment: React.FC<{ type: TType }> = ({ type }) => {
    const { id: user_id } = useParams();
    const { t } = useTranslation();
    const apiUrl = useApiUrl();
    const [form] = Form.useForm();
    const invalidate = useInvalidate();
    const queryClient = useQueryClient();
    const watchCurrency = Form.useWatch(['currency'], form);
    const watchAmountType = Form.useWatch(['amount_type'], form);

    const { data, isFetching } = useCustom({
        url: `${apiUrl}/wallet-api/balance/get`,
        method: 'get',
        config: {
            query: {
                user_id,
                currency: watchCurrency,
                amount_type: watchAmountType,
            },
        },
        queryOptions: {
            queryKey: ['wallet-api', 'balance', 'get'],
            enabled: !!user_id && !!watchCurrency && !!watchAmountType,
        },
    });
    const balances = (data?.data?.data || []) as TBalance[];
    const findBalance = balances.find((balance: TBalance) => balance.currency === watchCurrency && balance.amount_type === watchAmountType);
    const currencyBalanceAmount = findBalance?.amount || '0';

    const { mutate, isLoading } = useCustomMutation();

    const callback = {
        onSuccess: () => {
            form.resetFields();
            invalidate({
                resource: 'users',
                invalidates: ['all'],
            });
            queryClient.invalidateQueries(['wallet-api', 'balance', 'get']);
            notification.success({
                key: 'add balance',
                message: t('Balance Adjustment successfully'),
            });
        },
    };

    const handleAddWithoutRecord = (values: TValues) => {
        mutate(
            {
                url: `${apiUrl}/wallet-api/balance/add-without-record`,
                method: 'post',
                values: {
                    ...values,
                    user_id,
                    type: 'MANUAL',
                    by: 'ADMIN',
                },
            },
            callback,
        );
    };

    const handleSendCoupon = (values: TValues) => {
        mutate(
            {
                url: `${apiUrl}/coupon/add`,
                method: 'post',
                values: {
                    ...values,
                    user_id,
                },
            },
            callback,
        );
    };

    const getHandler = (theType: TType) => {
        switch (theType) {
            case 'balance':
                return handleAddWithoutRecord;
            case 'coupon':
                return handleSendCoupon;

            default:
                return handleAddWithoutRecord;
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={getHandler(type)}>
            <AmountInput amountProps={{ hide: true }} />
            <div className="grid grid-cols-4 gap-6">
                <Form.Item
                    name={['title']}
                    label={t('title')}
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                >
                    <Input size="small" />
                </Form.Item>
                <div>
                    <p className="mb-2">{t("User's balance")}</p>
                    {user_id && !isFetching && <SimpleAmount amount={Number(currencyBalanceAmount)} />}
                    {isFetching && <LoadingOutlined />}
                </div>
                <Form.Item className="w-full" label="Amount" name={['amount']} rules={[{ required: true, message: 'amount is required' }]}>
                    <InputNumber size="small" precision={0} className="w-full relative -top-[1px]" />
                </Form.Item>
                <Form.Item label="&nbsp;">
                    <Button size="small" type="primary" htmlType="submit" loading={isLoading}>
                        {t('Save')}
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default BalanceAdjustment;
