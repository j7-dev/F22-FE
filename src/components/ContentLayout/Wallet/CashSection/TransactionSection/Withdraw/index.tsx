import React from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import AmountInput from '../Mybalance/AmountInput';
import SendButton from '../Mybalance/SendButton';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <Form form={form} initialValues={{ amount: '0' }}>
                <AmountInput
                    label={t('Amount to transfer')}
                    itemName="amount"
                />

                <SendButton label={t('Withdraw')} className="mt-5" />
            </Form>
        </div>
    );
};

export default index;
