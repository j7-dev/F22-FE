import React from 'react';
import { useTranslation } from 'react-i18next';

const index: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="couponHistoryTitle h-10 text-sm font-bold text-[#2B3240] flex items-center">
                {t('Coupon History')}
            </div>
            <div className="tableHeader h-10 w-full items-center flex flex-row bg-[#2B3240] text-white p-2 font-bold text-[13px] text-center">
                <div className="w-1/6"> {t('Coupon Code')}</div>
                <div className="w-1/6">{t('Coupon Name')}</div>
                <div className="w-1/6">{t('Coupon Amount')}</div>
                <div className="w-1/6">{t('Expiration Date')}</div>
                <div className="w-1/6">{t('Date of Use')}</div>
                <div className="w-1/6">{t('Request')}</div>
            </div>
            <div className="tableContent text-center font-bold py-2 px-4 border-0 border-solid border-b border-[#F3F3F4]">
                {t('NO DATA AVAILABLE')}
            </div>
        </div>
    );
};
export default index;
