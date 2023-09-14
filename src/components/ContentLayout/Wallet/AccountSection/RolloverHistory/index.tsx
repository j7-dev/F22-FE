import React from 'react';
import { useTranslation } from 'react-i18next';
import { rolloverHistoryTitle, rolloverHistory } from '../../AccountSection/RolloverHistory/fakeData';
import { nanoid } from 'nanoid';

const index: React.FC = () => {
    const { t } = useTranslation();
    const rolloverData = rolloverHistory || [];
    const rolloverTitle = rolloverHistoryTitle || [];
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="couponHistoryTitle h-10 text-sm font-bold text-[#2B3240] flex items-center">{t('Rollover History')}</div>
            <div className="tableWrap md:overflow-hidden overflow-x-scroll">
                <div className="tableHeader h-10 w-full items-center flex flex-row text-white bg-[#2B3240] md:pl-5 px-0 font-bold text-[13px] text-start">
                    {rolloverTitle.map((item) => (
                        <div key={nanoid()} className={`bg-[#2B3240] h-full flex items-center px-1.5 ${window.innerWidth < 810 ? 'whitespace-nowrap min-w-[115px] max-w-[115px]' : 'w-1/4'}`}>
                            {' '}
                            {t(item.label)}
                        </div>
                    ))}
                </div>
                {rolloverData.length > 0 ? (
                    rolloverData.map((item) => (
                        <div key={nanoid()} className="tableContent h-10 w-full items-center flex flex-row  md:pl-5 px-0 font-bold text-[13px] text-start border-0 border-solid border-b border-[#F3F3F4]">
                            {rolloverTitle.map((title) => (
                                <div key={nanoid()} className={`h-full flex items-center px-1.5 ${window.innerWidth < 810 ? 'whitespace-nowrap min-w-[115px] max-w-[115px]' : 'w-1/4 '}`}>
                                    {item[title.value]}
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
