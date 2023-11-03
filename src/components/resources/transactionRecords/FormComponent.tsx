import { Form, Input, Select, FormProps } from 'antd';
import { useUserSelect } from '@/hooks';
import AmountInput from '@/components/form/AmountInput';
import { useCustom, useApiUrl, useResource } from '@refinedev/core';
import { TBalance } from '@/types';
import { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
}> = ({ formProps, handler }) => {
    const form = formProps.form;
    const apiUrl = useApiUrl();
    const watchUser = Form.useWatch(['user_id'], form);
    const watchCurrency = Form.useWatch(['currency'], form);
    const watchAmountType = Form.useWatch(['amount_type'], form);
    const { action, id, identifier } = useResource();
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
                    label="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                    className="col-span-2 lg:col-span-1"
                >
                    <Input />
                </Form.Item>

                <Form.Item name={['user_id']} label="User" initialValue={Number(id)} className="col-span-2 lg:col-span-1" hidden={isUserAdjustment}>
                    <Select {...userSelectProps} allowClear />
                </Form.Item>

                <div className="col-span-2 lg:col-span-1">
                    <p className="mb-2">User's balance</p>
                    {watchUser && !isFetching && Number(currencyBalanceAmount || 0).toLocaleString()}
                    {isFetching && <LoadingOutlined />}
                </div>
                <Form.Item name={['type']} label="Type" className="col-span-2 lg:col-span-1" initialValue="MANUAL" hidden={isUserAdjustment}>
                    {/* <Select options={['DEPOSIT', 'MANUAL'].map((type) => ({ label: type, value: type }))} /> */}
                    <Input />
                </Form.Item>
                <div className="col-span-4 md:col-span-2">
                    <AmountInput />
                </div>
                <Form.Item name={['description']} label="description" className="col-span-4 md:col-span-2" hidden={isUserAdjustment}>
                    <Input.TextArea />
                </Form.Item>
            </div>
        </Form>
    );
};

export default FormComponent;
