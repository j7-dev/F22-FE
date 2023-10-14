import { Form, Input, Select, FormProps } from 'antd';
import { useUserSelect } from '@/hooks';
import AmountInput from '@/components/form/AmountInput';
import Amount from '@/components/Admin/Amount';
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
    const userFieldIsDisabled = action === 'show' && identifier === 'members-list';

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
            <div className="grid grid-cols-2 gap-6">
                <Form.Item
                    name={['title']}
                    label="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name={['user_id']} label="User">
                    <Select {...userSelectProps} allowClear disabled={userFieldIsDisabled} />
                </Form.Item>
                <AmountInput />
                <div>
                    <p className="mb-2">User's balance</p>
                    {watchUser && !isFetching && <Amount amount={Number(currencyBalanceAmount)} currency={watchCurrency} symbol />}
                    {isFetching && <LoadingOutlined />}
                </div>
            </div>

            <Form.Item name={['description']} label="description">
                <Input.TextArea />
            </Form.Item>
        </Form>
    );
};

export default FormComponent;
