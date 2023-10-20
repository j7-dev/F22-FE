import React from 'react';
import { Form, Select } from 'antd';

const index: React.FC = () => {
    const form = Form.useFormInstance();

    const watchAmount = Form.useWatch(['amount'], form);
    console.log('🚀 ~ watchAmount:', watchAmount);
    const watchChosenBonus = Form.useWatch(['chosen_bonus'], form);
    console.log('🚀 ~ watchChosenBonus:', watchChosenBonus);
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
                    placeholder="Select Deposit Bonus"
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
                <span className=" text-2xl font-bold text-black">Bonus Details</span>
            </div>
            <div className="w-full grid sm:grid-cols-3 py-12 place-items-center bg-[#F8F9FF] grid-cols-1">
                <div className="flex flex-col w-full items-center gap-3 ">
                    <span className="text-lg font-medium">Bonus Type</span>
                    <span className="text-[#9680EA] text-4xl font-bold">{watchChosenBonus || '-'}</span>
                </div>
                <div className="flex flex-col w-full items-center gap-3 border-0 sm:border sm:border-y-0 border-[#C6BBEE] border-solid">
                    <span className="text-lg font-medium">Deposit Bouns</span>
                    {/* TODO 這邊要接正確資料 */}
                    <span className="text-[#9680EA] text-4xl font-bold">{watchChosenBonus ? '5%' : '-'}</span>
                </div>
                <div className="flex flex-col w-full items-center gap-3 ">
                    <span className="text-lg font-medium">Rolling Percent into</span>
                    {/* TODO 這邊要接正確資料 */}
                    <span className="text-[#9680EA] text-4xl font-bold">{watchChosenBonus ? '300%' : '-'}</span>
                </div>
            </div>
        </div>
    );
};

export default index;
