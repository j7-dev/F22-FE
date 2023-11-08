import React, { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { Authenticated } from './Authenticated';
import { useGetIdentity } from '@refinedev/core';
import { Spin } from 'antd';
import { TMe } from '@/types';
import MyPage from './MyPage';
import NoteBox from './NoteBox';
import CashHistory from './CashHistory';
import CouponHistory from './CouponHistory';
import Withdraw from './Withdraw';
import Deposit from './Deposit';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
// import { useTranslation } from 'react-i18next';

const Wallet: React.FC = () => {
    const activeMenu = useAtomValue(activeMenuAtom);
    const { data, isLoading } = useGetIdentity<TMe>();

    //渲染哪一個組件
    const ShowSection = () => {
        if (activeMenu === 'myPage') return <MyPage data={data as TMe} />;
        if (activeMenu === 'siteNotify') return <NoteBox />;
        if (activeMenu === 'cashHistory') return <CashHistory userID={data?.id as number} />;
        if (activeMenu === 'couponHistory') return <CouponHistory userID={data?.id as number} />;
        if (activeMenu === 'withdraw') return <Withdraw userInfo={data as TMe} />;
        if (activeMenu === 'deposit') return <Deposit />;
        return <MyPage data={data as TMe} />;
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeMenu]);
    return (
        <Authenticated>
            <div className="wallet px-4 my-6 md:my-9 md:w-full">
                <Spin spinning={isLoading}>
                    <ShowSection />
                </Spin>
            </div>
        </Authenticated>
    );
};
export default Wallet;
