import React from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import SelectGame from './SelectGame';
import AmountInput from './AmountInput';
import SendButton from './SendButton';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <Form form={form} initialValues={{ amount: '0' }}>
                <SelectGame
                    label={t('Select the game source of money')}
                    itemName="sourceGame"
                />
                <AmountInput
                    label={t('Amount to transfer')}
                    itemName="amount"
                />
                <SelectGame
                    label={t('Select the game to receive the money')}
                    itemName="reciiveGame"
                />
                <SendButton label={t('Money Transfer')} />
            </Form>
        </div>
    );
};
export default index;
