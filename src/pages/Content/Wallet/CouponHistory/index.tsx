import React from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { Table, Tag, Modal } from 'antd';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useCustomMutation, useApiUrl } from '@refinedev/core';
import { useQueryClient } from '@tanstack/react-query';
import { useShowPc } from '@/hooks/useShowPc';
import { useGetCoupon } from '@/hooks/resources/';
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
    const apiUrl = useApiUrl();
    const queryClient = useQueryClient();
    const [section, setSection] = useAtom(activeMenuAtom);
    const { mutate: doCoupon } = useCustomMutation();
    //取得當前時間
    const now = dayjs();
    dayjs.extend(isSameOrAfter);
    const { t } = useTranslation();
    //取得資料
    const { tableProps } = useGetCoupon({ userID, pageSize });
    // console.log('🚀 ~ tableProps:', tableProps);

    //轉換資料加上新日期格式
    const fxnData = tableProps?.dataSource?.map((item) => {
        return {
            ...item,
            fxnCreatedAt: dayjs(item.createdAt).format('YYYY MM DD , HH:mm') as string,
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
                    <span className="text-black font-bold md:text-2xl text-sm">{t('Coupon History')}</span>
                    {inMyPage && isPc && <ShowBtn />}
                </div>

                {inCouponHistory && (
                    <button onClick={() => setSection('myPage')} className="cursor-pointer font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">
                        {t('Go Back')}
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

    //領取coupon
    const handleDoCoupon = (coupon_id: number, resolve: () => void) => {
        doCoupon(
            {
                url: `${apiUrl}/coupon/claim`,
                method: 'post',
                values: {
                    coupon_id: coupon_id,
                },
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['getUserIdentity']); // 清除getIdentity數據
                    queryClient.invalidateQueries(['coupons']);
                    resolve();
                },
                onError: (error) => {
                    console.log('error', error);
                    resolve();
                },
            },
        );
    };
    //點擊領取coupon按鈕
    const handleReceiveCoupon = (coupon_id: number) => () => {
        Modal.info({
            centered: true,
            icon: null,
            title: <div className="text-center">이 쿠폰을 사용 하시겠습니까?</div>,
            okText: '사용',
            okButtonProps: {
                className: 'mx-0 w-full text-center bg-[#5932EA] rounded-2xl outline-none',
            },
            cancelText: '취소',
            cancelButtonProps: {
                className: 'mx-0 w-full text-center rounded-2xl outline-none',
            },
            footer: (_, { OkBtn, CancelBtn }) => (
                <div className="flex justify-between gap-2">
                    <CancelBtn />
                    <OkBtn />
                </div>
            ),
            onOk: () => {
                return new Promise<void>((resolve) => {
                    handleDoCoupon(coupon_id, resolve);
                }).catch(() => console.log('Oops errors!'));
            },
            okCancel: true,
        });
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
            // <List>
            <Table className="customTable" {...tableProps} pagination={paginationSetting}>
                <Column title={t('Title') as string} dataIndex="title" key="title" className="w-1/4 whitespace-nowrap" />
                <Column
                    title={t('Point Amount') as string}
                    dataIndex="coupon_amount"
                    key="coupon_amount"
                    className="w-1/4 whitespace-nowrap"
                    render={(value) => {
                        return <>{value.toLocaleString()}</>;
                    }}
                />

                <Column
                    title={t('Status') as string}
                    dataIndex="is_claimed"
                    key="is_claimed"
                    className="w-1/4 whitespace-nowrap"
                    render={(value, record: { id: number; period?: { end_datetime: string } }) => {
                        //取得coupon的過期時間
                        const end_datetime = dayjs(record?.period?.end_datetime);
                        //判斷是否過期=>是否存在end_datetime且現在時間是否大於end_datetime
                        if (now.isSameOrAfter(end_datetime) && record?.period)
                            return (
                                <Tag color="#EB5757" className="rounded-2xl">
                                    {t('EXPIRED')}
                                </Tag>
                            );

                        //如果為false
                        if (!value)
                            return (
                                <Tag onClick={handleReceiveCoupon(record.id)} color="#22C55E" className="cursor-pointer rounded-2xl">
                                    {t('CLICK ME')}
                                </Tag>
                            );
                        //如果為true
                        return (
                            <Tag color="#BDBDBD" className="rounded-2xl">
                                {t('RECEIVED')}
                            </Tag>
                        );
                        //TODO 需要再加上一個已過期的狀態
                    }}
                />
                <Column
                    title={
                        <div className="flex items-center gap-1 whitespace-nowrap">
                            <BiSolidTimeFive color="#828282" size={20} />
                            {t('Date')}
                        </div>
                    }
                    dataIndex="fxnCreatedAt"
                    key="fxnCreatedAt"
                    className="w-1/4 min-w-[115px]"
                />
            </Table>
            // {/* </List> */}
        );
    };

    return (
        <div className="bg-white h-full w-full py-6 px-4 gap-5 userBank flex flex-col rounded-2xl md:py-[42px] md:px-[32px] md:gap-4 shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
            <TopTitle />
            <TableSection />
        </div>
    );
};

export default index;
