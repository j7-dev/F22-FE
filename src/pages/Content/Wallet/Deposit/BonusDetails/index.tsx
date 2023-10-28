import React from 'react';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

const index: React.FC = () => {
    const { t } = useTranslation();
    const form = Form.useFormInstance();

    // const watchAmount = Form.useWatch(['amount'], form);
    // console.log('🚀 ~ watchAmount:', watchAmount);
    const watchChosenBonus = Form.useWatch(['chosen_bonus'], form);
    // console.log('🚀 ~ watchChosenBonus:', watchChosenBonus);
    return (
        <div className="bonusDetails my-8">
            <Form.Item
                name={['chosen_bonus']}
                rules={[
                    {
                        required: true,
                        min: 1,
                        message: 'Please Select Bonus Type!',
                    },
                ]}
            >
                <Select
                    bordered={false}
                    className="depositChosenBonus"
                    placeholder={t('Select Deposit Bonus')}
                    options={[
                        { value: 'Casino', label: 'Casino' }, //FIXME 有沒有辦法Value首字為小寫，但是watchChosenBonus取得是取label
                        { value: 'Sports', label: 'Sports' },
                        { value: 'Slot', label: 'Slot' },
                        { value: 'Games', label: 'Games' },
                    ]}
                    popupClassName="depositChosenBonusPopup"
                />
            </Form.Item>
            <div className="w-full my-4 text-center">
                <span className="text-sm sm:text-2xl font-bold text-black">{t('Bonus Details')}</span>
            </div>
            <div className="w-full grid grid-cols-3 sm:py-12 py-4 place-items-center rounded-2xl bg-[#F8F9FF]">
                <div className="flex flex-col w-full items-center gap-3 ">
                    <span className="text-[8px] sm:text-lg font-medium">{t('Bonus Type')}</span>
                    <span className="text-[#9680EA] text-base sm:text-4xl font-bold">{watchChosenBonus || '-'}</span>
                </div>
                <div className="flex flex-col w-full items-center gap-3 border-0 sm:border sm:border-y-0 border-[#C6BBEE] border-solid">
                    <span className="text-[8px] sm:text-lg font-medium">{t('Deposit Bonus')}</span>
                    {/* TODO 這邊要接正確資料 */}
                    <span className="text-[#9680EA] text-base sm:text-4xl font-bold">{watchChosenBonus ? '5%' : '-'}</span>
                </div>
                <div className="flex flex-col w-full items-center gap-3 ">
                    <span className="text-[8px] sm:text-lg font-medium">{t('Rolling Percent into')}</span>
                    {/* TODO 這邊要接正確資料 */}
                    <span className="text-[#9680EA] text-base sm:text-4xl font-bold">{watchChosenBonus ? '300%' : '-'}</span>
                </div>
            </div>
        </div>
    );
};

export default index;
