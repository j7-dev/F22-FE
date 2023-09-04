import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { selectedSectionAtom } from '@/pages/Content/Wallet';
import creditIcon from '@/assets/images/credit-icon.svg';
import depositIcon from '@/assets/images/deposit-icon.svg';
import withdrawIcon from '@/assets/images/withdraw-icon.svg';
import { AiOutlineDown } from 'react-icons/ai';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom);
    const [down, setDown] = useState(false);
    // const setSelectedSection = useSetAtom(selectedSectionAtom);
    const handleClick = (data: string) => {
        setSelectedSection(data);
    };
    const handleDown = () => {
        setDown(!down);
    };
    return (
        <div className="cashContainer flex flex-col">
            <div
                className="flex justify-between items-center"
                onClick={handleDown}
            >
                <span className="text-sm font-bold text-[#2b324080] p-2.5">
                    {t('Cash')}
                </span>
                {window.innerWidth < 768 && <AiOutlineDown />}
            </div>
            <div
                className={`cashListContainer flex flex-col gap-4 overflow-hidden transition-all md:h-full ${
                    window.innerWidth < 768 && down ? 'h-[150px]' : 'h-0'
                }`}
            >
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
