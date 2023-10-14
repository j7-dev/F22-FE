import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { useGetTransactionRecords } from '@/hooks/useGetTransactionRecords';

const { Column } = Table;
const index: React.FC<{ userID: number }> = ({ userID }) => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetTransactionRecords({ type: ['DEPOSIT', 'WITHDRAW'], userID });
    // console.log('🚀 ~ data:', data);

    const fxnData =
        data?.data.slice(0, 3).map((item) => {
            return {
                key: item.id,
                fxnCreatedAt: dayjs(item.createdAt).format('MMMM DD,YYYY') as string,
                ...item,
            };
        }) || [];
    if (isLoading) return <div>loading...</div>;
    return (
        <div className="h-full w-full px-[32px] py-[42px] flex flex-col gap-4 rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] ">
            <div className="text-black font-bold text-2xl flex gap-2">
                <span>{t('Cash History')}</span>
                <button className="font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">{t('Read More')}</button>
            </div>
            <Table dataSource={fxnData} pagination={false}>
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
