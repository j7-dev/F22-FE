import React from 'react';
import { useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { useGetTransactionRecords } from '@/hooks/useGetTransactionRecords';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';

const { Column } = Table;
const index: React.FC<{ userID: number; pageSize?: number; pagination?: false | undefined }> = ({ userID, pageSize = 10, pagination = undefined }) => {
    const { t } = useTranslation();

    //設定activeMenuAtom的值
    const setSection = useSetAtom(activeMenuAtom);
    const handleClick = () => {
        setSection('cashHistory');
    };
    //點擊Read More按鈕=>如果傳入pagination代表在myPage頁面則顯示按鈕
    const ShowBtn = () => {
        if (pagination === false) {
            return (
                <button onClick={handleClick} className="cursor-pointer font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">
                    {t('Read More')}
                </button>
            );
        } else return <></>;
    };
    //取得資料
    const { data, isLoading } = useGetTransactionRecords({ type: ['DEPOSIT', 'WITHDRAW'], userID, pageSize });
    //轉換資料加上日期格式
    const fxnData =
        data?.data.map((item) => {
            return {
                key: item.id,
                fxnCreatedAt: dayjs(item.createdAt).format('MMMM DD,YYYY') as string,
                ...item,
            };
        }) || [];

    return (
        <div className="h-full w-full py-[42px] flex flex-col gap-4 rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] sm:px-[32px]">
            <div className="text-black font-bold text-2xl flex gap-2">
                <span>{t('Cash History')}</span>
                <ShowBtn />
            </div>
            <Table loading={isLoading} dataSource={fxnData} pagination={pagination}>
                <Column title="Date" dataIndex="fxnCreatedAt" key="fxnCreatedAt" className="text-sm text-[#0F172A] font-medium" />
                <Column title="Cash For" dataIndex="type" key="type" className="text-sm text-[#0F172A] font-medium" />
                <Column title="Cash Amount" dataIndex="amount" key="amount" className="text-sm text-[#0F172A] font-medium" />
                <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    className="text-sm text-[#0F172A] font-medium"
                    render={(value) => {
                        let color = '#EB5757';
                        if (value === 'PENDING') color = '#BDBDBD';
                        if (value === 'SUCCESS') color = '#22C55E';
                        return (
                            <Tag color={color} className="rounded-2xl">
                                {value}
                            </Tag>
                        );
                    }}
                />
            </Table>
        </div>
    );
};

export default index;
