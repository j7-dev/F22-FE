import React from 'react';
import { atom, useAtomValue } from 'jotai';
import UserSection from '@/components/ContentLayout/Wallet/UserSection';
import CashSection from '@/components/ContentLayout/Wallet/CashSection';
import AccountSection from '@/components/ContentLayout/Wallet/AccountSection';
import RewardSection from '@/components/ContentLayout/Wallet/RewardSection';
import { Authenticated } from './Authenticated';

export const selectedSectionAtom = atom('siteNotify');

const Wallet: React.FC = () => {
    const selectedSection = useAtomValue(selectedSectionAtom);
    const switchSection: { [key: string]: JSX.Element } = {
        // MyBalance: <CashSection section="MyBalance" />,
        deposit: <CashSection section="deposit" />,
        withdraw: <CashSection section="withdraw" />,
        siteNotify: <CashSection section="siteNotify" />,
        bankAccount: <CashSection section="bankAccount" />,
        couponHistory: <RewardSection section="couponHistory" />,
        // BonusPoint: <RewardSection section="BonusPoint" />,
        rolloverHistory: <AccountSection section="rolloverHistory" />,
        cashHistory: <AccountSection section="cashHistory" />,
        changePassword: <AccountSection section="changePassword" />,
    };
    const selectSection = selectedSection;

    return (
        <Authenticated>
            <div className="walletPage w-full bg-[#F6F7F7]">
                <div className="wallerSection max-w-7xl mx-auto flex justify-start items-start p-5 gap-5 md:flex-row flex-col">
                    <div className="userMenu md:max-w-[300px] w-full">
                        <UserSection />
                    </div>
                    <div className="userContent  md:max-w-[900px] w-full flex justify-start items-start gap-5">
                        {/* default section */}
                        {switchSection?.[selectSection] || <CashSection section="siteNotify" />}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};
export default Wallet;
