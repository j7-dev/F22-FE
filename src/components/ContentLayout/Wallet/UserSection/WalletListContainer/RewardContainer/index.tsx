import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { selectedSectionAtom } from '@/pages/Content/Wallet';
import couponIcon from '@/assets/images/coupon-icon.svg';
// import pointsIcon from '@/assets/images/points-icon.svg';
import { AiOutlineDown } from 'react-icons/ai';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom);
    const [down, setDown] = useState(false);
    const handleClick = (data: string) => {
        setSelectedSection(data);
    };
    const handleDown = () => {
        setDown(!down);
    };
    return (
        <div className="rewardContainer flex flex-col">
            <div className="flex justify-between items-center" onClick={handleDown}>
                <span className="text-sm font-bold text-[#2b324080] p-2.5">{t('Reward')}</span>
                {window.innerWidth < 810 && <AiOutlineDown />}
            </div>
            <div className={`cashListContainer flex flex-col gap-4 overflow-hidden transition-all md:h-full ${window.innerWidth < 810 && down ? 'h-[50px]' : 'h-0'}`}>
                <div className={`h-10 gap-2.5  rounded-lg flex justify-between items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${selectedSection === 'CouponHistory' ? 'bg-[#F3F3F4]' : ''}`} onClick={() => handleClick('CouponHistory')}>
                    <div className="rewardInfo flex  justify-start items-center gap-2.5">
                        <img src={couponIcon as unknown as string} alt="" />
                        <span className="text-sm font-bold text-[#2B3240]">{t('Coupon History')}</span>
                    </div>
                    <span className="rewardNumber flex justify-center items-center min-w-[36px] h-[27px] bg-[#DC3545] rounded-lg text-sm font-bold text-white">0</span>
                </div>
                {/* <div className={`h-10 gap-2.5  rounded-lg flex justify-between items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${selectedSection === 'BonusPoint' ? 'bg-[#F3F3F4]' : ''}`} onClick={() => handleClick('BonusPoint')}>
                    <div className="rewardInfo flex  justify-start items-center gap-2.5">
                        <img src={pointsIcon as unknown as string} alt="" />
                        <span className="text-sm font-bold text-[#2B3240]">{t('Bonus Point')}</span>
                    </div>
                    <span className="rewardNumber rewardNumber flex justify-center items-center min-w-[36px] h-[27px] bg-[#6C757D] rounded-lg text-sm font-bold text-white">0</span>
                </div> */}
            </div>
        </div>
    );
};
export default index;
