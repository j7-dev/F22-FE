import React from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { windowWidthAtom } from '@/components/ContentLayout';
// import { useSetAtom } from 'jotai';
// import { Link } from 'react-router-dom';
import LanguageSwitch from '@/components/ContentLayout/Header/LanguageSwitch';
import { socialMedia } from '@/utils/menuData/socialMedia';
import { gameCategories } from '@/utils/GameCategory';
import logo from '@/assets/images/1002_logo_f.svg';
import logo2 from '@/assets/images/1002_logo_s.svg';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import { fakeProviderData } from '@/pages/Content/Home/Provider/ProviderData';

// import { popupIsOpenAtom } from '@/components/ContentLayout/LoginPopUp';

export const Footer: React.FC = () => {
    const windowWidth = useAtomValue(windowWidthAtom);
    const { t } = useTranslation();

    return (
        <div className="bg-white w-full text-black font-normal z-10 px-4">
            <div className="footerImgWrap grid sm:grid-cols-11 sm:pb-20 sm:py-9 grid-cols-4 gap-4 w-full h-auto border-solid border-b-2 border-0 border-[#E0E0E0] py-6">
                <div className="aboutWrap sm:flex sm:flex-col sm:col-start-2 sm:col-span-3 col-span-4 gap-4 grid grid-cols-4">
                    <div className="footerLogo sm:h-10 col-span-1 h-full text-center">
                        <img src={windowWidth > 414 ? logo : logo2} alt="" className="sm:w-full w-[30px] h-full object-left object-contain" />
                    </div>
                    <div className="txt sm:py-4 sm:border-t-2 sm:border-l-0 border-l-2 pl-2.5 col-span-3 text-[#333333] text-xs font-normal  border-solid  border-0 border-[#E0E0E0]">{t('COPYRIGHT 2023, SMART BET. ALL RIGHTS RESERVED. GAMBLING CAN BE ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE PAYMENT SUPPORTED BY CODE PAY')}</div>
                    {/* 電腦版翻譯選單 */}
                    {windowWidth > 414 ? <LanguageSwitch /> : ''}
                </div>
                <div className="helpWrap w-full sm:flex sm:flex-col sm:col-span-3 col-span-4 gap-4 grid grid-cols-4">
                    <div className="sm:text-2xl sm:h-10 text-[10px] font-bold text-black flex items-center justify-center gap-3 col-span-1">
                        {windowWidth > 414 ? (
                            <>
                                <img src={Icon_Main_Title} alt="" />
                                <span className="">{t('SMART BET HELP')}</span>
                            </>
                        ) : (
                            <span className="w-full h-full flex justify-center items-center">{t('HELPS')}</span>
                        )}
                    </div>
                    <ul className="socialMedia sm:grid-cols-4 gap-1.5 p-0 m-0 col-span-3 grid grid-cols-5">
                        {socialMedia.map((item) => {
                            return (
                                <li key={nanoid()} className="sm:aspect-auto sm:h-[88px] aspect-square rounded-2xl cursor-pointer bg-[#BAA8FF33] duration-300 hover:shadow-[0_0px_15px_rgba(150,128,234,0.5)]">
                                    <div className="w-full h-full flex justify-center items-center">
                                        <Link to={item.link}>
                                            <div className="flex flex-col justify-center items-center">
                                                <img src={item.icon} alt="" className="sm:w-[30px] w-[15px] mb-2 aspect-square" />
                                                <span className="text-[#9680EA] sm:text-xs text-[6px] leading-[8px] font-bold text-center">{item.value}</span>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {/* 手機版翻譯選單 */}
                {windowWidth <= 414 ? (
                    <div className="col-span-4 gap-4 grid grid-cols-4">
                        <div className="col-start-2 col-span-3">
                            <LanguageSwitch />
                        </div>
                    </div>
                ) : (
                    ''
                )}
                <div className="rightZone w-full sm:col-span-3 sm:grid-cols-3 sm:gap-4 col-span-4 grid grid-cols-4 gap-1">
                    <div className="aboutWrap text-center sm:col-span-1 sm:flex sm:flex-col sm:gap-4 col-span-4 grid grid-cols-4">
                        <span className="sm:text-lg sm:h-10 text-[10px] col-span-1  flex items-center justify-center text-black font-bold">{t('About Us')}</span>
                        <ul className="sm:flex-col sm:justify-center sm:gap-0 col-span-3 flex flex-row justify-start items-center gap-1 p-0 m-0">
                            <li>
                                <Link to="/about">
                                    <span className="sm:text-xs text-[8px] text-[#333333] hover:underline ">{t('About Us')}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="betRuleWrap text-center sm:col-span-1 sm:flex sm:flex-col sm:gap-4 col-span-4 grid grid-cols-4">
                        <span className="sm:text-lg sm:h-10 text-[10px] col-span-1  flex items-center justify-center text-black font-bold">{t('Bet Rule')}</span>
                        <ul className="sm:flex-col sm:justify-center sm:gap-0 col-span-3 flex flex-row justify-start items-center gap-1 p-0 m-0">
                            {gameCategories.map((item) => {
                                return (
                                    <li key={nanoid()}>
                                        <Link to={item.path}>
                                            <span className="sm:text-xs text-[8px] text-[#333333] hover:underline ">{t(item.value)}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="siteMapWrap text-center sm:col-span-1 sm:flex sm:flex-col sm:gap-4 col-span-4 grid grid-cols-4">
                        <span className="sm:text-lg sm:h-10 text-[10px] col-span-1 flex items-center justify-center text-black font-bold">{t('Site Map')}</span>
                        <ul className="sm:flex-col sm:justify-center sm:gap-0 col-span-3 flex flex-row justify-start items-center gap-1 p-0 m-0">
                            {gameCategories.map((item) => {
                                return (
                                    <li key={nanoid()}>
                                        <Link to={item.path}>
                                            <span className="sm:text-xs text-[8px] text-[#333333] hover:underline ">{t(item.value)}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full block py-2 sm:py-4 sm:px-20 sm:text-base text-xs text-center font-normal text-gray-500">
                <ul className="grid grid-cols-6 pl-0">
                    {fakeProviderData.map((item) => {
                        return (
                            <li key={nanoid()} className="sm:h-20 h-[20px]">
                                <img src={item.ProviderImg2} alt="" className="w-full h-full object-contain" />
                            </li>
                        );
                    })}
                </ul>
                {/* <Trans i18nKey="© Smart Bet Casino" /> */}
            </div>
        </div>
    );
};
