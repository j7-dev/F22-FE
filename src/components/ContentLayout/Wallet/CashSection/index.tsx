import React from 'react';
// import BalanceSection from './BalanceSection';
import TransactionSection from './TransactionSection';
import SiteNotify from './SiteNotify';
import BankAccount from './BankAccount';

interface CashSectionProps {
    section?: string;
}
const index: React.FC<CashSectionProps> = (prop) => {
    if (prop.section === 'siteNotify') return <SiteNotify />;
    if (prop.section === 'bankAccount') return <BankAccount />;
    return (
        <>
            {/* <BalanceSection /> */}

            {<TransactionSection section={prop?.section} />}
        </>
    );
};

export default index;
