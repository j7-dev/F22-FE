import React from 'react';
import { useTranslation } from 'react-i18next';
import { TBankAccount } from '@/types';

const index: React.FC<{ bankInfo?: TBankAccount }> = ({ bankInfo }) => {
    const { t } = useTranslation();
    if (!bankInfo) return <div>not BankAccount...</div>;

    return (
        <div className="h-full w-full py-[42px] userBank flex flex-col gap-4 rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] sm:px-[32px]">
            <span className="text-black font-bold text-2xl">{t('Bank Information')}</span>
            <div className="BankCard flex items-center justify-center w-full h-full flex-col relative min-h-[180px]">
                <div className="relative h-full w-full px-8 py-8 bg-gradient-to-tl from-indigo-500 to-purple-500 rounded-[30px] ">
                    <div className="flex flex-col h-full w-full items-start justify-between">
                        <div className="text-xl font-semibold leading-tight text-white flex flex-col">
                            {bankInfo?.bank_name}
                            <span className="text-sm font-medium leading-3 text-white opacity-50">{bankInfo?.bank_code}</span>
                        </div>
                        <p className="text-sm font-medium text-white mt-4">{bankInfo?.bank_account_number}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
