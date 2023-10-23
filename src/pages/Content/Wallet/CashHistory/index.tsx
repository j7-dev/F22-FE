import React from 'react';
import { useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { List } from '@refinedev/antd';
import { useShowPc } from '@/hooks/useShowPc';
import { useGetTransactionRecords } from '@/hooks/useGetTransactionRecords';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import type { TablePaginationConfig } from 'antd/es/table/interface';
import { BiSolidTimeFive } from 'react-icons/bi';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import cashHistoryIcon from '@/assets/images/newMyPage/cashHistory.svg';
/**
 * 取得CashHistory資料
 * 接收userID, pageSize=>如果有傳入pageSize代表只渲染固定筆數,否則全拿
 * 當有傳入pageSize時才會渲染Read More按鈕跟並且隱藏分頁條
 * 如果沒有傳入pageSize則會渲染全部資料並且有分頁條
 */
const { Column } = Table;
const index: React.FC<{ userID: number; pageSize?: number }> = ({ userID, pageSize }) => {
    const isPc = useShowPc();
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
        if (isPc) {
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
        } else return <></>;
    };
    //渲染PC版畫面
    const TableSection = () => {
        //在My Page頁面且為手機版時才顯示圖片加Read More按鈕
        //非手機版以及有帶入pageSize時才渲染圖片加Read More按鈕
        if (!isPc && pageSize) {
            const setSection = useSetAtom(activeMenuAtom);
            const handleClick = () => {
                setSection('cashHistory');
            };
            return (
                <div onClick={handleClick} className="flex flex-col items-center gap-3">
                    <img src={cashHistoryIcon} alt="" />
                    <button className="cursor-pointer font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">{t('Read More')}</button>
                </div>
            );
        }
        return (
            <List>
                <Table className="customTable" {...tableProps} pagination={paginationSetting}>
                    <Column
                        title={
                            <div className="flex items-center gap-1">
                                <BiSolidTimeFive color="#828282" size={20} />
                                Date
                            </div>
                        }
                        dataIndex="fxnCreatedAt"
                        key="fxnCreatedAt"
                        className="w-1/2 "
                    />
                    <Column title="Cash For" dataIndex="type" key="type" className="w-1/6 " />
                    <Column title="Cash Amount" dataIndex="amount" key="amount" className="w-1/6 " />
                    <Column
                        title="Status"
                        dataIndex="status"
                        key="status"
                        className="w-1/6 "
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
        );
    };

    return (
        <div className="bg-white h-full w-full py-6 px-4 gap-5 userBank flex flex-col rounded-2xl sm:py-[42px] sm:px-[32px] sm:gap-4 shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
            <div className="flex gap-2">
                <span className="text-black font-bold sm:text-2xl text-sm">{t('Cash History')}</span>
                <ShowBtn />
            </div>
            <TableSection />
        </div>
    );
};

export default index;
