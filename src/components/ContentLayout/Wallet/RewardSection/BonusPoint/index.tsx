import React, { useState } from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import SelectGame from '@/components/ContentLayout/Wallet/CashSection/TransactionSection/Mybalance/SelectGame';
import SendButton from '@/components/ContentLayout/Wallet/CashSection/TransactionSection/Mybalance/SendButton';
import CompBonus from './CompBonus';
import RollingBonus from './RollingBonus';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const [selectedSection, setSelectedSection] = useState('CompBonus');

    const handleSelectSection = (section: string) => {
        setSelectedSection(section);
    };
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="bonusPointTitle h-10 text-sm font-bold text-[#2B3240] flex items-center">{t('Bonus Point')}</div>
            <div className="BPSwichButton flex gap-1 ">
                <div className={`${selectedSection === 'CompBonus' ? 'bg-[#F9A318] text-white' : ''} CompBonusButton w-full flex justify-center items-center h-[45px] rounded-lg font-bold bg-[#F3F3F4] hover:bg-[#F9A318] hover:text-white cursor-pointer`} onClick={() => handleSelectSection('CompBonus')}>
                    {t('Comp Bonus')}
                </div>
                <div className={`${selectedSection === 'RollingBonus' ? 'bg-[#F9A318] text-white' : ''} RollingBonusButton w-full flex justify-center items-center h-[45px] rounded-lg font-bold bg-[#F3F3F4] hover:bg-[#F9A318] hover:text-white cursor-pointer`} onClick={() => handleSelectSection('RollingBonus')}>
                    {t('Rolling Bonus')}
                </div>
            </div>
            <div className="tableHeader h-10 w-full items-center flex flex-row bg-[#2B3240] text-white p-2 font-bold text-[13px] text-center">
                <div className="w-1/3"> {t('Remaining Bonus')}</div>
                <div className="w-1/3"> {t('Used Bonus')} </div>
                <div className="w-1/3">{t('Total Bonus')}</div>
            </div>
            <div className="tableContent h-10 w-full text-center flex flex-row font-bold py-2 px-4 border-0 border-solid border-b border-[#F3F3F4]">
                <div className="w-1/3">0</div>
                <div className="w-1/3">0</div>
                <div className="w-1/3">0</div>
            </div>
            <div className="usePointForm">
                <Form form={form} initialValues={{ amount: '0' }} className="w-full flex gap-2 flex-col md:flex-row justify-between items-center py-3 px-5 bg-[#F3F3F4]">
                    <SelectGame className="w-full md:w-2/5 my-0" />
                    <Form.Item name={['amount']} className="w-full md:w-2/5 mb-0">
                        <InputNumber />
                    </Form.Item>
                    <SendButton label={t('Use Point')} className="w-auto md:w-1/5 mb-0" />
                    {/* TODO: 這個組件是否可以沿用? */}
                </Form>
            </div>
            {selectedSection === 'CompBonus' ? <CompBonus /> : ''}
            {selectedSection === 'RollingBonus' ? <RollingBonus /> : ''}
        </div>
    );
};

export default index;
