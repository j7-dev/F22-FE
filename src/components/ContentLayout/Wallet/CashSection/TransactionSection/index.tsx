import React from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { selectedSectionAtom } from '@/pages/Content/Wallet';
// import Mybalance from './Mybalance';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

interface TransactionSectionProps {
    section?: string;
}
const TransactionSection: React.FC<TransactionSectionProps> = ({ section }) => {
    const { t } = useTranslation();
    const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom);
    const handleClick = (data: string) => {
        setSelectedSection(data);
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="transactionButtonContainer flex gap-1 justify-between items-center">
                {/* <div className={`${selectedSection === 'MyBalance' ? 'active' : ''} MyBalance transactionButton flex gap-1 justify-center items-center min-h-[40px]  rounded-lg w-1/3`} onClick={() => handleClick('MyBalance')}>
                    <div className="transactionIcon md:w-[30px] md:h-[30px] w-5 h-5" />
                    <span className="w-[65px] md:w-auto font-bold text-xs">{t('My Balance & Transfer')}</span>
                </div> */}
                <div className={`${selectedSection === 'Deposit' ? 'active' : ''} Deposit transactionButton flex gap-1 justify-center items-center h-10  rounded-lg w-1/2`} onClick={() => handleClick('Deposit')}>
                    <div className="transactionIcon md:w-[30px] md:h-[30px] w-5 h-5" />
                    <span className="w-auto font-bold text-sm">{t('Deposit')}</span>
                </div>
                <div className={`${selectedSection === 'Withdraw' ? 'active' : ''} Withdraw transactionButton flex gap-1 justify-center items-center h-10  rounded-lg w-1/2`} onClick={() => handleClick('Withdraw')}>
                    <div className="transactionIcon md:w-[30px] md:h-[30px] w-5 h-5" />
                    <span className="w-auto font-bold text-sm">{t('Withdraw')}</span>
                </div>
            </div>
            {/* {section === 'MyBalance' ? <Mybalance /> : ''} */}
            {section === 'Deposit' ? <Deposit /> : ''}
            {section === 'Withdraw' ? <Withdraw /> : ''}
        </div>
    );
};

export default TransactionSection;
