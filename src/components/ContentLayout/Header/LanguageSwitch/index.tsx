import React from 'react';
import { nanoid } from 'nanoid';
// import { useGetLocale } from '@refinedev/core';
import { languages } from '@/utils';
import i18n from '@/i18n';
const index: React.FC = () => {
    // const locale = useGetLocale();
    // const currentLocale = locale();

    // const currentLanguage = languages.find((item) => item.language === currentLocale);
    // const currentLanguageName = currentLanguage?.language;
    const handleChangeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    // 在i18next.on('languageChanged')事件監聽器中處理其他操作
    i18n.on('languageChanged', function (lng) {
        // 在語言更改後執行其他操作
        if (lng === 'KO') {
            // 更改字體
            document.body.style.fontFamily = 'gong-gothic';
        } else {
            document.body.style.fontFamily = '"Poppins", arial, sans-serif, Graphik';
        }
    });
    return (
        <div className="languageSwitchContain relative">
            <div className="languageSwitch sm:gap-2 justify-start w-full flex z-10 gap-0.5">
                {languages.map((item) => {
                    const changedLanguage = item.language;
                    const changeLanguageName = item.name;
                    return (
                        <div key={nanoid()} className="flex justify-center items-center h-[30px] px-3 cursor-pointer rounded-xl border border-solid border-Black">
                            <span className={`inline-flex whitespace-nowrap justify-center items-center font-bold text-black text-xs `} onClick={() => handleChangeLanguage(changedLanguage)}>
                                {changeLanguageName}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default index;
