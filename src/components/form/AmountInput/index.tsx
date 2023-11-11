import { useEffect } from 'react';
import { Form, Space, Select, InputNumber } from 'antd';
import { useGetSiteSetting } from '@/hooks';

const index: React.FC<{
    amountProps?: {
        hide?: boolean;
        name?: string | string[];
        label?: string;
    };
}> = ({ amountProps }) => {
    const hide = amountProps?.hide || false;
    const name = amountProps?.name || ['amount'];
    const label = amountProps?.label || 'Amount';
    const form = Form.useFormInstance();

    const { default_currency, default_amount_type, support_currencies, support_amount_types } = useGetSiteSetting();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (default_currency && default_amount_type && form) {
                form?.setFieldsValue({
                    currency: default_currency,
                    amount_type: default_amount_type,
                });
            }
        }, 0);

        return () => {
            clearTimeout(timeout);
        };
    }, [default_currency, default_amount_type, form]);

    return (
        <Space.Compact block className="w-full">
            {!hide && (
                <Form.Item className="w-full" label={label} name={name} rules={[{ required: true, message: 'amount is required' }]}>
                    <InputNumber precision={0} className="w-full relative -top-[1px]" />
                </Form.Item>
            )}

            <Form.Item hidden={hide} className="min-w-[5rem]" label="&nbsp;" name={['currency']} initialValue={default_currency}>
                <Select
                    options={support_currencies.map((currency: string) => ({
                        label: currency,
                        value: currency,
                    }))}
                    disabled={support_currencies.length < 2}
                />
            </Form.Item>
            <Form.Item hidden={hide} className="min-w-[10rem]" label="&nbsp;" name={['amount_type']} initialValue={default_amount_type}>
                <Select
                    options={support_amount_types.map((amountType: string) => ({
                        label: amountType,
                        value: amountType,
                    }))}
                    disabled={support_amount_types.length < 2}
                />
            </Form.Item>
        </Space.Compact>
    );
};

export default index;
