import React from 'react';
import { useTranslation } from 'react-i18next';
import Withdraw from '@/components/ContentLayout/Wallet/CashSection/TransactionSection/Withdraw';

const index: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="h-full w-full px-[32px] py-[42px] flex flex-col gap-4 rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] ">
            <span className="text-black font-bold text-2xl">{t('Withdraw')}</span>
            <div className="min-h-[180px] flex flex-col items-center justify-between">
                <Withdraw />
            </div>
        </div>
    );
};

export default index;
