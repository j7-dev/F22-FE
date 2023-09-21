import React from 'react';
// import BalanceSection from './BalanceSection';
import TransactionSection from './TransactionSection';
import SiteMail from './SiteMail';
import BankAccount from './BankAccount';

interface CashSectionProps {
    section?: string;
}
const index: React.FC<CashSectionProps> = (prop) => {
    if (prop.section === 'siteMail') return <SiteMail />;
    if (prop.section === 'bankAccount') return <BankAccount />;
    return (
        <>
            {/* <BalanceSection /> */}

            {<TransactionSection section={prop?.section} />}
        </>
    );
};

export default index;
