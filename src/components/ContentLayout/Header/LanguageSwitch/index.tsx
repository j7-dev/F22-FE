import React from 'react';
import { nanoid } from 'nanoid';
import { useGetLocale } from '@refinedev/core';
import { languages } from '@/utils';
import i18n from '@/i18n';
import { BsFillCaretDownFill } from 'react-icons/bs';
const index: React.FC = () => {
    const locale = useGetLocale();
    const currentLocale = locale();

    const currentLanguage = languages.find((item) => item.language === currentLocale);
    const currentLanguageName = currentLanguage?.language;
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
        <>
            <div className="nowLanguage cursor-pointer text-right xl:text-center">
                <span className="inline-flex justify-center items-center gap-2 hover:opacity-80">
                    Language
                    <BsFillCaretDownFill size={15} />
                </span>
            </div>
            <div className="languageSwitch flex-col justify-center w-full hidden absolute top-full bg-white rounded-xl z-10 p-2.5  my-0">
                {languages.map((item) => {
                    const changedLanguage = item.language;
                    const changeLanguageName = item.name;
                    return (
                        <li key={nanoid()} className="flex flex-row justify-center gap-2.5 items-center h-10 px-2.5 cursor-pointer rounded ">
                            <span className={`inline-flex  justify-center items-center hover:text-black text-sm ${currentLanguageName === changedLanguage ? 'text-black' : 'text-slate-400'}`} onClick={() => handleChangeLanguage(changedLanguage)}>
                                {changeLanguageName}
                            </span>
                        </li>
                    );
                })}
            </div>
        </>
    );
};

export default index;
