import React from 'react';
import { useAtomValue } from 'jotai';
import { Authenticated } from './Authenticated';
import { useGetIdentity } from '@refinedev/core';
import { Spin } from 'antd';
import { TMe } from '@/types';
import MyPage from './MyPage';
import NoteBox from './NoteBox';
import CashHistory from './CashHistory';
import Withdraw from './Withdraw';
import Deposit from './Deposit';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
// import { useTranslation } from 'react-i18next';

const Wallet: React.FC = () => {
    const activeMenu = useAtomValue(activeMenuAtom);
    const { data, isLoading } = useGetIdentity<TMe>();

    const ShowSection = () => {
        if (activeMenu === 'myPage') return <MyPage data={data as TMe} />;
        if (activeMenu === 'siteNotify') return <NoteBox />;
        if (activeMenu === 'cashHistory') return <CashHistory userID={data?.id as number} />;
        if (activeMenu === 'withdraw' || activeMenu === 'deposit')
            return (
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <Deposit />
                    </div>
                    <div>
                        <Withdraw />
                    </div>
                </div>
            );
        return <MyPage data={data as TMe} />;
    };
    return (
        <Authenticated>
            <div className="wallet px-4 my-4 sm:my-9 sm:w-full">
                <Spin spinning={isLoading}>
                    <ShowSection />
                </Spin>
            </div>
        </Authenticated>
    );
};
export default Wallet;
