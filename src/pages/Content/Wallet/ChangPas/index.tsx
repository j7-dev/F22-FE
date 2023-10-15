import React from 'react';
import { useTranslation } from 'react-i18next';
import ChangPasIcon from '@/assets/images/newMyPage/ChangPas.svg';

const index: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="h-full w-full py-[42px] flex flex-col gap-4 rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] sm:px-[32px]">
            <span className="text-black font-bold text-2xl">{t('Change Password')}</span>
            <div className="min-h-[180px] flex flex-col items-center justify-between">
                <img src={ChangPasIcon} className="w-[120] aspect-square" alt="" />
                <button className="font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">{t('Change')}</button>
            </div>
        </div>
    );
};

export default index;
