import React from 'react';
import { useGetLocale } from '@refinedev/core';
import { nanoid } from 'nanoid';
import { languages } from '@/utils';
import i18n from '@/i18n';

const TopBar: React.FC = () => {
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
            {/* <!-- Topbar --> */}
            <div className="bg-[#2B3240] w-full px-4 sm:px-6 lg:px-8">
                <div className=" py-1 max-w-7xl mx-auto flex items-center justify-between xl:justify-end gap-x-5 w-full">
                    <div></div>
                    {/* <div className="pl-1 sm:pl-2 space-x-1">
                        <span className=" inline-flex flex-shrink-0 justify-center items-center h-9 w-9 font-bold rounded-full">
                            <img src={twitterIcon} alt="" />
                        </span>
                        <span className=" inline-flex flex-shrink-0 justify-center items-center h-9 w-9 font-bold rounded-full">
                            <img src={igIcon} alt="" />
                        </span>
                        <span className=" inline-flex flex-shrink-0 justify-center items-center h-9 w-9 font-bold rounded-full">
                            <img src={lineIcon} alt="" />
                        </span>
                    </div> */}
                    <div className="languageSwitchContain w-[150px] text-center">
                        <div className="nowLanguage cursor-pointer text-right xl:text-center">
                            <span className="h-10 px-2.5 inline-flex justify-center items-center gap-2 font-bold text-slate-400 hover:text-slate-300 text-sm">
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                                </svg>
                                {currentLanguage?.shortName}
                            </span>
                        </div>
                        <div className="languageSwitch flex-col justify-center w-[150px] hidden absolute bg-white rounded-xl z-10 p-2.5  my-0">
                            {languages.map((item) => {
                                const changedLanguage = item.language;
                                const changeLanguageName = item.name;
                                return (
                                    <li key={nanoid()} className="flex flex-row justify-center gap-2.5 items-center h-10 px-2.5 cursor-pointer rounded ">
                                        <span className={`inline-flex w-20 justify-start items-center gap-2 font-bold  hover:text-black text-sm ${currentLanguageName === changedLanguage ? 'text-black' : 'text-slate-400'}`} onClick={() => handleChangeLanguage(changedLanguage)}>
                                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                                            </svg>
                                            {changeLanguageName}
                                        </span>
                                    </li>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Topbar --> */}
        </>
    );
};
export default TopBar;
