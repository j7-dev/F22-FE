import React from 'react';
import { useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { TSiteNotify } from '@/types';
import { isShowDetailAtom, notifyDetailAtom } from '@/components/ContentLayout/Wallet/CashSection/SiteNotify';

type notifyListProps = {
    siteNotifyData: TSiteNotify[];
};
const index: React.FC<notifyListProps> = (props) => {
    const { siteNotifyData } = props;
    const { t } = useTranslation();
    const setIsShowContent = useSetAtom(isShowDetailAtom);
    const setNotifyDetail = useSetAtom(notifyDetailAtom);

    const handleClick = (data: TSiteNotify) => {
        setIsShowContent(true);
        setNotifyDetail(data);
    };

    return (
        <div className="pageContent w-full flex flex-col">
            <div className="tableHeader h-10 w-full items-center flex flex-row bg-[#2B3240] text-white p-2 font-bold text-[13px]">
                <div className="tableNo w-20 text-center">{t('No.')}</div>
                <div className="tableTitle w-8/12">{t('Title')}</div>
                <div className="tableDate w-48 text-center">{t('Date Created')}</div>
            </div>
            <div className="tableContent ">
                {siteNotifyData ? (
                    siteNotifyData.map((item) => {
                        const dateStringDayjs = dayjs(item.createdAt).format('YYYY-MM-DD');
                        return (
                            <div className="contentList min-h-[40px] w-full items-center flex flex-row  p-2 font-bold text-[13px]" key={nanoid()}>
                                <div className="tableNo w-20 text-center">{item.id}</div>
                                <div className="tableTitle w-8/12 hover:text-[#78D39D] cursor-pointer" onClick={() => handleClick(item)}>
                                    {t(item.title)}
                                </div>
                                <div className="tableDate w-48 text-center">{dateStringDayjs}</div>
                            </div>
                        );
                    })
                ) : (
                    <div className="tableContent text-center font-bold py-2 px-4 border-0 border-solid border-b border-[#F3F3F4]">{t('NO DATA AVAILABLE')}</div>
                )}
            </div>
        </div>
    );
};

export default index;
