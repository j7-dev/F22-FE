import React from 'react';
import { useTranslation } from 'react-i18next';
import { fakeCouponHistory, CouponHistoryTitle } from './fakeData';
import { nanoid } from 'nanoid';

const index: React.FC = () => {
    const { t } = useTranslation();
    const CouponHistory = fakeCouponHistory || [];
    const CouponTitle = CouponHistoryTitle || [];
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="couponHistoryTitle h-10 text-sm font-bold text-[#2B3240] flex items-center">{t('Coupon History')}</div>
            <div className="tableWrap md:overflow-hidden overflow-x-scroll">
                <div className="tableHeader h-10 w-full items-center flex flex-row text-white bg-[#2B3240] md:pl-5 px-0 font-bold text-[13px] text-start">
                    {CouponTitle.map((item) => (
                        <div key={nanoid()} className={`bg-[#2B3240] h-full flex items-center px-1.5 ${window.innerWidth < 810 ? 'whitespace-nowrap min-w-[115px] max-w-[115px]' : 'w-1/5 '}`}>
                            {' '}
                            {t(item)}
                        </div>
                    ))}
                </div>
                {/* TODO 資料結構找時間補=首字不要大寫 */}
                {CouponHistory.length > 0 ? (
                    CouponHistory.map((item) => (
                        <div key={nanoid()} className="tableContent h-10 w-full items-center flex flex-row  md:pl-5 px-0 font-bold text-[13px] text-start border-0 border-solid border-b border-[#F3F3F4]">
                            {CouponTitle.map((title) => (
                                <div key={nanoid()} className={`h-full flex items-center px-1.5 ${window.innerWidth < 810 ? 'whitespace-nowrap min-w-[115px] max-w-[115px]' : 'w-1/5 '}`}>
                                    {item[title.replace(/\s/g, '')]}
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="tableContent text-center font-bold py-2 px-4 border-0 border-solid border-b border-[#F3F3F4]">{t('NO DATA AVAILABLE')}</div>
                )}
            </div>
        </div>
    );
};
export default index;
