import { useEffect } from 'react';
import { Form, Space, Select, InputNumber } from 'antd';
import { useGetSiteSetting } from '@/hooks';

const index: React.FC<{
    hideAmount?: boolean;
}> = ({ hideAmount = false }) => {
    const form = Form.useFormInstance();
    const siteSetting = useGetSiteSetting();

    const defaultCurrency = siteSetting?.default_currency || 'KRW';
    const supportCurrencies = siteSetting?.support_currencies || ['KRW'];

    const defaultAmountType = siteSetting?.defaut_amount_type || 'CASH';
    const supportAmountTypes = siteSetting?.support_amount_types || ['CASH'];

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (defaultCurrency && defaultAmountType && form) {
                form?.setFieldsValue({
                    currency: defaultCurrency,
                    amount_type: defaultAmountType,
                });
            }
        }, 0);

        return () => {
            clearTimeout(timeout);
        };
    }, [defaultCurrency, defaultAmountType, form]);

    return (
        <Space.Compact block className="w-full">
            {!hideAmount && (
                <Form.Item className="w-full" label="Amount" name={['amount']} rules={[{ required: true, message: 'amount is required' }]}>
                    <InputNumber min={0} precision={0} className="w-full relative -top-[1px]" />
                </Form.Item>
            )}

            <Form.Item className="min-w-[5rem]" label="&nbsp;" name={['currency']}>
                <Select
                    options={supportCurrencies.map((currency: string) => ({
                        label: currency,
                        value: currency,
                    }))}
                    disabled={supportCurrencies.length < 2}
                />
            </Form.Item>
            <Form.Item className="min-w-[7rem]" label="&nbsp;" name={['amount_type']}>
                <Select
                    options={supportAmountTypes.map((amountType: string) => ({
                        label: amountType,
                        value: amountType,
                    }))}
                    disabled={supportAmountTypes.length < 2}
                />
            </Form.Item>
        </Space.Compact>
    );
};

export default index;
