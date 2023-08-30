import React from 'react';
import { atom, useAtomValue } from 'jotai';
import UserSection from '@/components/Layout/Wallet/UserSection';
import CashSection from '@/components/Layout/Wallet/CashSection';
import AccountSection from '@/components/Layout/Wallet/AccountSection';
import RewardSection from '@/components/Layout/Wallet/RewardSection';

export const selectedSectionAtom = atom('MyBalance');

const Wallet: React.FC = () => {
    const selectedSection = useAtomValue(selectedSectionAtom);
    const switchSection: { [key: string]: JSX.Element } = {
        MyBalance: <CashSection section="MyBalance" />,
        Deposit: <CashSection section="Deposit" />,
        Withdraw: <CashSection section="Withdraw" />,
        CouponHistory: <RewardSection section="CouponHistory" />,
        BonusPoint: <RewardSection section="BonusPoint" />,
        RolloverHistory: <AccountSection section="RolloverHistory" />,
        CashHistory: <AccountSection section="CashHistory" />,
        ChangePassword: <AccountSection section="ChangePassword" />,
    };
    const selectSection = selectedSection;
    return (
        <div className="walletPage w-full bg-[#F6F7F7]">
            <div className="wallerSection max-w-7xl mx-auto flex justify-start items-start p-5 gap-5 ">
                <div className="userMenu w-[300px]">
                    <UserSection />
                </div>
                <div className="userContent w-[900px] flex justify-start items-start gap-5">
                    {/* {switchSection[selectSection]} */}
                    {switchSection?.[selectSection]}
                </div>
            </div>
        </div>
    );
};
export default Wallet;
