import React from 'react';
import { useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { List } from '@refinedev/antd';
import { useGetTransactionRecords } from '@/hooks/useGetTransactionRecords';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import type { TablePaginationConfig } from 'antd/es/table/interface';
import { BiSolidTimeFive } from 'react-icons/bi';
import { BsFillCaretLeftFill } from 'react-icons/bs';
/**
 * 取得CashHistory資料
 * 接收userID, pageSize=>如果有傳入pageSize代表只渲染固定筆數,否則全拿
 * 當有傳入pageSize時才會渲染Read More按鈕跟並且隱藏分頁條
 * 如果沒有傳入pageSize則會渲染全部資料並且有分頁條
 */
const { Column } = Table;
const index: React.FC<{ userID: number; pageSize?: number }> = ({ userID, pageSize }) => {
    const { t } = useTranslation();
    //取得資料
    const { tableProps } = useGetTransactionRecords({ type: ['DEPOSIT', 'WITHDRAW'], userID, pageSize });

    //轉換資料加上日期格式
    const fxnData = tableProps?.dataSource?.map((item) => {
        return {
            ...item,
            fxnCreatedAt: dayjs(item.createdAt).format('MMMM DD,YYYY') as string,
        };
    });
    tableProps.dataSource = fxnData;

    //分頁條設定
    const paginationSetting: TablePaginationConfig = {
        ...tableProps.pagination,
        position: ['bottomCenter'],
        hideOnSinglePage: true, //只有一頁時不顯示分頁條
        itemRender: (page, type) => {
            return (
                <div>
                    {type === 'prev' ? <BsFillCaretLeftFill color="#BDBDBD" /> : ''}
                    {type === 'next' ? <BsFillCaretLeftFill color="#BDBDBD" className="rotate-180" /> : ''}
                    {type === 'page' ? <span className="w-[30px] aspect-square rounded-full grid place-content-center text-[#BDBDBD] text-sm font-bold">{page}</span> : ''}
                </div>
            );
        },
    };
    //如果傳入pageSize則設定分頁條的每頁筆數
    if (pageSize !== undefined) {
        paginationSetting.total = pageSize;
    }

    //渲染點擊Read More按鈕=>如果傳入pageSize代表只渲染固定筆數則不顯示按鈕
    const ShowBtn = () => {
        //點擊前往的頁面
        const setSection = useSetAtom(activeMenuAtom);
        const handleClick = () => {
            setSection('cashHistory');
        };
        //如果有傳入pageSize則顯示按鈕
        if (pageSize) {
            return (
                <button onClick={handleClick} className="cursor-pointer font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">
                    {t('Read More')}
                </button>
            );
        } else return <></>;
    };

    return (
        <div className="h-full w-full py-[42px] flex flex-col gap-4 rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] sm:px-[32px]">
            <div className="text-black font-bold text-2xl flex gap-2">
                <span>{t('Cash History')}</span>
                <ShowBtn />
            </div>
            <List>
                <Table {...tableProps} pagination={paginationSetting}>
                    <Column
                        title={
                            <div className="flex items-center gap-1">
                                <BiSolidTimeFive color="#828282" size={20} />
                                Date
                            </div>
                        }
                        dataIndex="fxnCreatedAt"
                        key="fxnCreatedAt"
                        className="w-1/2 text-sm text-[#0F172A] font-medium"
                    />
                    <Column title="Cash For" dataIndex="type" key="type" className="w-1/6 text-sm text-[#0F172A] font-medium" />
                    <Column title="Cash Amount" dataIndex="amount" key="amount" className="w-1/6 text-sm text-[#0F172A] font-medium" />
                    <Column
                        title="Status"
                        dataIndex="status"
                        key="status"
                        className="w-1/6 text-sm text-[#0F172A] font-medium"
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
            </List>
        </div>
    );
};

export default index;
