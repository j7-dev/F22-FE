import { Form, Input, Select, FormProps, InputNumber, ButtonProps, Button } from 'antd';
import { useUserSelect, useGetSiteSetting } from '@/hooks';
import { useCustom, useApiUrl, useResource } from '@refinedev/core';
import { TBalance } from '@/types';
import { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import { useTranslation } from 'react-i18next';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    saveButtonProps: ButtonProps;
}> = ({ formProps, handler, saveButtonProps }) => {
    const { t } = useTranslation();
    const form = formProps.form;
    const apiUrl = useApiUrl();
    const watchUser = Form.useWatch(['user_id'], form);
    const watchCurrency = Form.useWatch(['currency'], form);
    const watchAmountType = Form.useWatch(['amount_type'], form);
    const { action, id, identifier } = useResource();
    const { default_currency, default_amount_type } = useGetSiteSetting();
    // 判斷是否在 User Show 畫面
    const isUserAdjustment = action === 'show' && identifier === 'members-list';

    useEffect(() => {
        // User Show 畫面自動帶入當前 user
        const timer = setTimeout(() => {
            if (action === 'show' && identifier === 'members-list' && form) {
                form.setFieldValue(['user_id'], Number(id));
            }
        }, 0);

        return () => {
            clearTimeout(timer);
        };
    }, [action, id, identifier, form]);

    const { data, isFetching } = useCustom({
        url: `${apiUrl}/wallet-api/balance/get`,
        method: 'get',
        config: {
            query: {
                user_id: watchUser,
                currency: watchCurrency,
                amount_type: watchAmountType,
            },
        },
        queryOptions: {
            queryKey: ['wallet-api', 'balance', 'get'],
            enabled: !!watchUser && !!watchCurrency && !!watchAmountType,
        },
    });
    const balances = (data?.data?.data || []) as TBalance[];
    const findBalance = balances.find((balance: TBalance) => balance.currency === watchCurrency && balance.amount_type === watchAmountType);
    const currencyBalanceAmount = findBalance?.amount || '0';

    const { selectProps: userSelectProps } = useUserSelect({
        roleType: 'authenticated',
    });

    return (
        <Form {...formProps} onFinish={handler} layout="vertical">
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

                <Form.Item name={['user_id']} label={t('User')} initialValue={Number(id)} hidden={isUserAdjustment}>
                    <Select size="small" {...userSelectProps} allowClear />
                </Form.Item>

                <div>
                    <p className="mb-2">{t("User's balance")}</p>
                    {watchUser && !isFetching && <SimpleAmount amount={Number(currencyBalanceAmount)} />}
                    {isFetching && <LoadingOutlined />}
                </div>
                <Form.Item name={['type']} label={t('Type')} initialValue="MANUAL" hidden={isUserAdjustment}>
                    {/* <Select options={['DEPOSIT', 'MANUAL'].map((type) => ({ label: type, value: type }))} /> */}
                    <Input size="small" />
                </Form.Item>
                <div>
                    <Form.Item className="w-full" label={t('Amount')} name={['amount']} rules={[{ required: true, message: 'amount is required' }]}>
                        <InputNumber size="small" precision={0} className="w-full relative -top-[1px]" />
                    </Form.Item>
                </div>

                <Form.Item hidden name={['currency']} initialValue={default_currency}>
                    <Input size="small" />
                </Form.Item>
                <Form.Item hidden name={['amount_type']} initialValue={default_amount_type}>
                    <Input size="small" />
                </Form.Item>

                <Form.Item name={['description']} label={t('description')} hidden={isUserAdjustment}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="&nbsp;">
                    <Button size="small" type="primary" {...saveButtonProps} />
                </Form.Item>
            </div>
        </Form>
    );
};

export default FormComponent;
