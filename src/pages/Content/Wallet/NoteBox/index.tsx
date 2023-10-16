import React from 'react';
import { useTranslation } from 'react-i18next';
import { useList } from '@refinedev/core';
import { Table } from 'antd';
import dayjs from 'dayjs';
import { TSiteNotify } from '@/types';

const { Column } = Table;
const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TSiteNotify[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
const index: React.FC = () => {
    const { t } = useTranslation();
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
    });
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
                <span>{t('Note Box')}</span>
                <div className="flex justify-center items-center rounded-full bg-[#EB5757] aspect-square w-[30px] text-xl text-white font-bold">{data?.total}</div>
                <button className="font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">{t('Read More')}</button>
            </div>
            <Table
                dataSource={fxnData}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                pagination={false}
                loading={isFetching}
            >
                <Column title="Title" dataIndex="content" key="content" className="text-sm text-[#0F172A] font-medium" />
                <Column title="Date" dataIndex="fxnCreatedAt" key="fxnCreatedAt" className="text-sm text-[#0F172A] font-medium" />
            </Table>
        </div>
    );
};

export default index;
