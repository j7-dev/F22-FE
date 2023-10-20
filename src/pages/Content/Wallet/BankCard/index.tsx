import React from 'react';
import { useTranslation } from 'react-i18next';
import { TBankAccount } from '@/types';
import { Empty } from 'antd';
const index: React.FC<{ bankInfo?: TBankAccount }> = ({ bankInfo }) => {
    const { t } = useTranslation();
    if (!bankInfo)
        return (
            <div className="h-full w-full py-[42px] userBank flex flex-col gap-4 rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] sm:px-[32px]">
                <Empty description={<span>Not Data</span>} />
            </div>
        );

    return (
        <div className="bg-white h-full w-full py-6 px-4 gap-3 userBank flex flex-col rounded-2xl sm:py-[42px] sm:px-[32px] sm:gap-4 shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
            <span className="text-black font-bold sm:text-2xl text-sm">{t('Bank Information')}</span>
            <div className="BankCard flex items-center justify-center w-full  flex-col relative sm:min-h-[200px] sm:aspect-[240/200] min-h-[90px] aspect-[130-90]">
                <div className="BankCardBg relative h-full w-full p-4 sm:p-8 sm:rounded-[30px] rounded-2xl bg-cover bg-no-repeat bg-center">
                    <div className="relative flex flex-col h-full w-full items-start justify-start">
                        <div className=" w-full text-white flex flex-col">
                            <span className="text-xl leading-tight font-semibold">{bankInfo?.bank_name}</span>
                            <span className="text-sm font-medium leading-3 opacity-50">{bankInfo?.owner_real_name}</span>
                        </div>
                        {/* <span className="absolute bottom-0 left-1/2 -translate-x-2/4 ml-1 text-sm font-medium text-white">{bankInfo?.bank_account_number.slice(-5)}</span> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
