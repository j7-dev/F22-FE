import React from 'react';
// import BalanceSection from './BalanceSection';
import TransactionSection from './TransactionSection';
import SiteMail from './SiteMail';

interface CashSectionProps {
    section?: string;
}
const index: React.FC<CashSectionProps> = (prop) => {
    if (prop.section === 'siteMail') return <SiteMail />;
    return (
        <>
            {/* <BalanceSection /> */}

            {<TransactionSection section={prop?.section} />}
        </>
    );
};

export default index;
