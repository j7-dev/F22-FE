import React from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { Table, Tag } from 'antd';
// import dayjs from 'dayjs';
import { List } from '@refinedev/antd';
import { useShowPc } from '@/hooks/useShowPc';
import { useGetTransactionRecords } from '@/hooks/useGetTransactionRecords';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import type { TablePaginationConfig } from 'antd/es/table/interface';
import { BiSolidTimeFive } from 'react-icons/bi';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import couponIcon from '@/assets/images/newMyPage/coupon.svg';
/**
 * 取得CouponHistory資料
 * 接收userID, pageSize=>如果有傳入pageSize代表只渲染固定筆數,否則全拿
 * 當有傳入pageSize時才會渲染Read More按鈕跟並且隱藏分頁條
 * 如果沒有傳入pageSize則會渲染全部資料並且有分頁條
 */
const { Column } = Table;
const index: React.FC<{ userID: number; pageSize?: number }> = ({ userID, pageSize }) => {
    const isPc = useShowPc();
    const [section, setSection] = useAtom(activeMenuAtom);
    const { t } = useTranslation();
    //取得資料
    const { tableProps } = useGetTransactionRecords({ type: ['TURNOVER_BONUS_TO_CASH'], userID, pageSize });

    //轉換資料加上新日期格式
    // const fxnData = tableProps?.dataSource?.map((item) => {
    //     return {
    //         ...item,
    //         fxnCreatedAt: dayjs(item.createdAt).format('MMMM DD,YYYY') as string,
    //     };
    // });
    tableProps.dataSource = [];

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

    //頂部列組件
    //固定存在標題
    //1.在myPage頁面必且為電腦版需要有read more按鈕
    //2.在couponHistory頁面需要有返回按鈕
    const TopTitle = () => {
        const inMyPage = section === 'myPage';
        const inCouponHistory = section === 'couponHistory';
        return (
            <div className="flex gap-2 justify-between">
                <div className="flex gap-2 items-center">
                    <span className="text-black font-bold sm:text-2xl text-sm">{t('Coupon History')}</span>
                    {inMyPage && isPc && <ShowBtn />}
                </div>

                {inCouponHistory && (
                    <button onClick={() => setSection('myPage')} className="cursor-pointer font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">
                        {t('Go back')}
                    </button>
                )}
            </div>
        );
    };
    //Read More按鈕組件
    const ShowBtn = () => {
        return (
            <button onClick={() => setSection('couponHistory')} className="cursor-pointer font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">
                {t('Read More')}
            </button>
        );
    };
    //Table組件
    const TableSection = () => {
        //當手機版並且在myPage頁時才渲染圖片加Read More按鈕
        if (!isPc && section === 'myPage') {
            return (
                <div onClick={() => setSection('couponHistory')} className="flex flex-col items-center gap-3">
                    <img src={couponIcon} alt="" />
                    <ShowBtn />
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
                                {t('Date')}
                            </div>
                        }
                        dataIndex="fxnCreatedAt"
                        key="fxnCreatedAt"
                        className="w-2/6 "
                    />
                    <Column title={t('From') as string} dataIndex="title" key="title" className="w-1/6 " />
                    <Column title={t('Type') as string} dataIndex="type" key="type" className="w-1/6 " />
                    <Column title={t('Point Amount') as string} dataIndex="amount" key="amount" className="w-1/6 " />
                    <Column
                        title={t('Status') as string}
                        dataIndex="status"
                        key="status"
                        className="w-1/6 "
                        render={(value) => {
                            let color = '#EB5757';
                            if (value === 'PENDING') color = '#BDBDBD';
                            if (value === 'SUCCESS') color = '#22C55E';
                            return (
                                <Tag color={color} className="rounded-2xl">
                                    {t(value)}
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
            <TopTitle />
            <TableSection />
        </div>
    );
};

export default index;
