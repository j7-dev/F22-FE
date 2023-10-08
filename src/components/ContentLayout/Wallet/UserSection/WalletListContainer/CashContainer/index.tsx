import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { useList } from '@refinedev/core';
import { selectedSectionAtom } from '@/pages/Content/Wallet';
// import creditIcon from '@/assets/images/credit-icon.svg';
import depositIcon from '@/assets/images/deposit-icon.svg';
import withdrawIcon from '@/assets/images/withdraw-icon.svg';
import { AiOutlineDown, AiFillMail } from 'react-icons/ai';
import { BsFillCreditCard2FrontFill } from 'react-icons/bs';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom);
    const [down, setDown] = useState(false);
    const { data: siteNotifyData } = useList({
        resource: 'cms-posts',
        meta: {
            populate: '*',
        },
        filters: [
            {
                field: 'post_type',
                operator: 'eq',
                value: 'siteNotify',
            },
        ],
    });
    // const setSelectedSection = useSetAtom(selectedSectionAtom);
    const handleClick = (data: string) => {
        setSelectedSection(data);
    };
    const handleDown = () => {
        setDown(!down);
    };
    return (
        <div className="cashContainer flex flex-col">
            <div className="flex justify-between items-center" onClick={handleDown}>
                <span className="text-sm font-bold text-[#2b324080] p-2.5">{t('Cash')}</span>
                {window.innerWidth < 810 && <AiOutlineDown />}
            </div>
            <div className={`cashListContainer flex flex-col gap-4 overflow-hidden transition-all md:h-full ${window.innerWidth < 810 && down ? 'h-[150px]' : 'h-0'}`}>
                <div className={`h-10 gap-2.5 rounded-lg flex justify-between items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${selectedSection === 'siteNotify' ? 'bg-[#F3F3F4]' : ''}`} onClick={() => handleClick('siteNotify')}>
                    <div className="siteNotifyInfo flex justify-start items-center gap-2.5">
                        <AiFillMail size={30} className="p-1" />
                        <span className="text-sm font-bold text-[#2B3240]">{t('站内信쪽지')}</span>
                    </div>
                    <span className="siteNotifyNumber flex justify-center items-center min-w-[36px] h-[27px] bg-[#DC3545] rounded-lg text-sm font-bold text-white">{siteNotifyData?.total}</span>
                </div>
                {/* <div className={`h-10 gap-2.5  rounded-lg flex justify-start items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${selectedSection === 'MyBalance' ? 'bg-[#F3F3F4]' : ''}`} onClick={() => handleClick('MyBalance')}>
                    <img src={creditIcon as unknown as string} alt="" />
                    <span className="text-sm font-bold text-[#2B3240]">{t('My Balance & Transfer')}</span>
                </div> */}
                <div className={`h-10 gap-2.5  rounded-lg flex justify-start items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${selectedSection === 'bankAccount' ? 'bg-[#F3F3F4]' : ''}`} onClick={() => handleClick('bankAccount')}>
                    <BsFillCreditCard2FrontFill size={30} className="p-1" />
                    <span className="text-sm font-bold text-[#2B3240]">{t('Bank Account')}</span>
                </div>
                <div className={`h-10 gap-2.5  rounded-lg flex justify-start items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${selectedSection === 'deposit' ? 'bg-[#F3F3F4]' : ''}`} onClick={() => handleClick('deposit')}>
                    <img src={depositIcon as unknown as string} alt="" />
                    <span className="text-sm font-bold text-[#2B3240]">{t('Deposit')}</span>
                </div>
                <div className={`h-10 gap-2.5  rounded-lg flex justify-start items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${selectedSection === 'withdraw' ? 'bg-[#F3F3F4]' : ''}`} onClick={() => handleClick('withdraw')}>
                    <img src={withdrawIcon as unknown as string} alt="" />
                    <span className="text-sm font-bold text-[#2B3240]">{t('Withdraw')}</span>
                </div>
            </div>
        </div>
    );
};
export default index;
