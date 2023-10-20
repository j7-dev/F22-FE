import React from 'react';
import { useTranslation } from 'react-i18next';
import { useList } from '@refinedev/core';
import { useSetAtom } from 'jotai';
import { Table } from 'antd';
import dayjs from 'dayjs';
import { TSiteNotify } from '@/types';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';

const { Column } = Table;
const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TSiteNotify[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
const index: React.FC<{ pageSize?: number; pagination?: false | undefined }> = ({ pageSize = 10, pagination = undefined }) => {
    const { t } = useTranslation();

    //設定activeMenuAtom的值
    const setSection = useSetAtom(activeMenuAtom);
    const handleClick = () => {
        setSection('siteNotify');
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
    const { data, isFetching } = useList<TSiteNotify>({
        resource: 'cms-posts',
        meta: {
            populate: '*',
        },
        filters: [
            {
                field: 'post_type',
                operator: 'eq',
                value: 'siteNotify',
            },
        ],
        pagination: {
            pageSize: pageSize,
        },
    });
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
        <div className="bg-white h-full w-full py-6 px-4 gap-3 userBank flex flex-col rounded-2xl sm:py-[42px] sm:px-[32px] sm:gap-4 shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
            <div className="flex gap-2">
                <span className="text-black font-bold sm:text-2xl text-sm">{t('Note Box')}</span>
                <div className="flex justify-center items-center rounded-full bg-[#EB5757] aspect-square w-[30px] text-xl text-white font-bold">{data?.total}</div>
                <ShowBtn />
            </div>
            <Table
                dataSource={fxnData}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                loading={isFetching}
                pagination={pagination}
            >
                <Column title="Title" dataIndex="content" key="content" className="text-sm text-[#0F172A] font-medium" />
                <Column title="Date" dataIndex="fxnCreatedAt" key="fxnCreatedAt" className="text-sm text-[#0F172A] font-medium" />
            </Table>
        </div>
    );
};

export default index;
