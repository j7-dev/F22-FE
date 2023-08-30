import React from 'react';
import BalanceSection from './BalanceSection';
import TransactionSection from './TransactionSection';

interface CashSectionProps {
    section?: string;
}
const index: React.FC<CashSectionProps> = ({ section }) => (
    <>
        <BalanceSection />
        <TransactionSection section={section} />
    </>
);

export default index;
