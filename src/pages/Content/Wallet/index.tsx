import React from 'react';
import { atom, useAtomValue } from 'jotai';
import UserSection from '@/components/ContentLayout/Wallet/UserSection';
import CashSection from '@/components/ContentLayout/Wallet/CashSection';
import AccountSection from '@/components/ContentLayout/Wallet/AccountSection';
import RewardSection from '@/components/ContentLayout/Wallet/RewardSection';
import { Authenticated } from './Authenticated';

export const selectedSectionAtom = atom('Deposit');

const Wallet: React.FC = () => {
    const selectedSection = useAtomValue(selectedSectionAtom);
    const switchSection: { [key: string]: JSX.Element } = {
        // MyBalance: <CashSection section="MyBalance" />,
        Deposit: <CashSection section="Deposit" />,
        Withdraw: <CashSection section="Withdraw" />,
        siteMail: <CashSection section="siteMail" />,
        bankAccount: <CashSection section="bankAccount" />,
        CouponHistory: <RewardSection section="CouponHistory" />,
        // BonusPoint: <RewardSection section="BonusPoint" />,
        RolloverHistory: <AccountSection section="RolloverHistory" />,
        CashHistory: <AccountSection section="CashHistory" />,
        ChangePassword: <AccountSection section="ChangePassword" />,
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
                        {/* {switchSection[selectSection]} */}
                        {switchSection?.[selectSection]}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};
export default Wallet;
