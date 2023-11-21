import React, { useState } from 'react';
import { Form, Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useList } from '@refinedev/core';
import { nanoid } from 'nanoid';
import { TDepositBonus } from '@/types';
import { useGetDepositBonus } from '@/hooks/resources/useGetDepositBonus';

const index: React.FC = () => {
    const { t } = useTranslation();
    const { depositBonus } = useGetDepositBonus();
    //帶入選擇的Bonus內容
    const [chosenBonus, setChosenBonus] = useState<TDepositBonus>();

    //取得Bonus列表
    const { data: bonusList, isFetching } = useList<TDepositBonus>({
        resource: 'deposit-bonuses',
    });
    const fxnBonusList = depositBonus !== null ? bonusList?.data?.filter((bonus) => bonus.id === depositBonus) : bonusList?.data;
    return (
        <div className="bonusDetails my-8">
            <Spin spinning={isFetching}>
                <Form.Item name={['chosen_bonus']}>
                    <Select
                        onChange={(value) => {
                            setChosenBonus(bonusList?.data?.find((bonus) => bonus.id === value));
                        }}
                        bordered={false}
                        className="depositChosenBonus"
                        placeholder={t('Select Deposit Bonus')}
                        popupClassName="depositChosenBonusPopup"
                    >
                        {fxnBonusList?.map((bonus) => (
                            <Select.Option key={nanoid()} value={bonus.id} className="depositChosenBonusOption">
                                {bonus.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Spin>
            <div className="w-full my-4 text-center">
                <span className="text-sm md:text-2xl font-bold text-black">{t('Bonus Details')}</span>
            </div>
            <div className="w-full grid grid-cols-3 place-items-stretch md:py-12 py-4 rounded-2xl bg-[#F8F9FF]">
                <div className="flex flex-col w-full items-center gap-3 px-2">
                    <span className="text-[8px] md:text-xl font-medium ">{t('Bonus Type')}</span>
                </div>
                <div className="flex flex-col w-full items-center gap-3 border-0 md:border md:border-y-0 border-[#C6BBEE] border-solid">
                    <span className="text-[8px] md:text-xl font-medium">{t('Deposit Bonus')}</span>
                </div>
                <div className="flex flex-col w-full items-center gap-3 ">
                    <span className="text-[8px] md:text-xl font-medium">{t('Rolling Percent into')}</span>
                </div>
                <div className=" flex flex-col w-full justify-center items-center gap-3 px-2">
                    <span className="text-[#9680EA] text-base md:text-3xl font-bold text-center">{chosenBonus?.label ?? '-'}</span>
                </div>
                <div className=" flex flex-col w-full justify-center items-center gap-3 border-0 md:border md:border-y-0 border-[#C6BBEE] border-solid">
                    <span className="text-[#9680EA] text-base md:text-3xl font-bold">{chosenBonus ? `${chosenBonus?.bonus_rate}%` : '-'}</span>
                </div>
                <div className=" flex flex-col w-full justify-center items-center gap-3 ">
                    <span className="text-[#9680EA] text-base md:text-3xl font-bold">{chosenBonus ? `${chosenBonus?.rolling_percentage}%` : '-'}</span>
                </div>
            </div>
        </div>
    );
};

export default index;
