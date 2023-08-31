import React from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { selectedSectionAtom } from '@/pages/Wallet';
import creditIcon from '@/assets/images/credit-icon.svg';
import depositIcon from '@/assets/images/deposit-icon.svg';
import withdrawIcon from '@/assets/images/withdraw-icon.svg';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [
        selectedSection,
        setSelectedSection,
    ] = useAtom(selectedSectionAtom);
    // const setSelectedSection = useSetAtom(selectedSectionAtom);
    const handleClick = (data: string) => {
        setSelectedSection(data);
    };

    return (
        <div className="cashContainer flex flex-col">
            <span className="text-sm font-bold text-[#2b324080] p-2.5">
                {t('Cash')}
            </span>
            <div className="cashListContainer flex flex-col gap-4">
                <div
                    className={`h-10 gap-2.5  rounded-lg flex justify-start items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${
                        selectedSection === 'MyBalance' ? 'bg-[#F3F3F4]' : ''
                    }`}
                    onClick={() => handleClick('MyBalance')}
                >
                    <img src={creditIcon as unknown as string} alt="" />
                    <span className="text-sm font-bold text-[#2B3240]">
                        {t('My Balance & Transfer')}
                    </span>
                </div>
                <div
                    className={`h-10 gap-2.5  rounded-lg flex justify-start items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${
                        selectedSection === 'Deposit' ? 'bg-[#F3F3F4]' : ''
                    }`}
                    onClick={() => handleClick('Deposit')}
                >
                    <img src={depositIcon as unknown as string} alt="" />
                    <span className="text-sm font-bold text-[#2B3240]">
                        {t('Deposit')}
                    </span>
                </div>
                <div
                    className={`h-10 gap-2.5  rounded-lg flex justify-start items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${
                        selectedSection === 'Withdraw' ? 'bg-[#F3F3F4]' : ''
                    }`}
                    onClick={() => handleClick('Withdraw')}
                >
                    <img src={withdrawIcon as unknown as string} alt="" />
                    <span className="text-sm font-bold text-[#2B3240]">
                        {t('Withdraw')}
                    </span>
                </div>
            </div>
        </div>
    );
};
export default index;
