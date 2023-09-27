import React from 'react';
import { useTranslation } from 'react-i18next';
// import { rolloverHistoryTitle, rolloverHistory } from '../../AccountSection/RolloverHistory/fakeData';
import { nanoid } from 'nanoid';
import { useGetTransactionRecords } from '@/hooks/useGetTransactionRecords';

const index: React.FC = () => {
    const { t } = useTranslation();
    const rolloverTitle = [
        { label: 'Rollove Date', value: 'rolloveDate' },
        { label: 'Rollove Game', value: 'rolloveGame' },
        { label: 'Rollove Amount', value: 'rolloveAmount' },
        { label: 'Status', value: 'status' },
    ];
    const { data, isLoading } = useGetTransactionRecords({ type: ['BET'] });
    const txnData =
        data?.data.map((item) => {
            //TODO 時區轉換問題會+1天，待修正
            // 將日期字符串轉換為Date物件
            const dateString = item.createdAt;
            const dateObj = new Date(dateString);
            // 提取年、月和日
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // 月份是從0開始計數的，所以需要加1
            const day = String(dateObj.getDate()).padStart(2, '0');
            // 組合成年月日格式的字符串
            const simplifiedDate = `${year}-${month}-${day}`;
            return {
                rolloveDate: simplifiedDate,
                rolloveGame: item.by,
                rolloveAmount: item.amount,
                status: item.status,
            };
        }) || [];
    // console.log('txnData', txnData);
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
                {isLoading ? (
                    'isLoading'
                ) : txnData ? (
                    txnData.map((item) => (
                        //TODO 這邊這麼寫是因為有很長的手機版客製化代碼會很長，所以用rolloverTitle來循環設定key值取得資料
                        <div key={nanoid()} className="tableContent h-10 w-full items-center flex flex-row  md:pl-5 px-0 font-bold text-[13px] text-start border-0 border-solid border-b border-[#F3F3F4]">
                            {rolloverTitle.map((title) => (
                                <div key={nanoid()} className={`h-full flex items-center px-1.5 ${window.innerWidth < 810 ? 'whitespace-nowrap min-w-[115px] max-w-[115px]' : 'w-1/4 '}`}>
                                    {item?.[title.value as keyof typeof item]}
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
