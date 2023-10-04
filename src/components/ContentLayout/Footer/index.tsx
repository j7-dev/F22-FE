import React from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { windowWidthAtom } from '@/components/ContentLayout';
// import { useSetAtom } from 'jotai';
// import { Link } from 'react-router-dom';
// import { MenuItem, fakeMenuData } from '@/components/ContentLayout/Header/MenuData';
import twitterIcon from '@/assets/images/Icon_Twitter.svg';
import igIcon from '@/assets/images/Icon_Instagram.svg';
import lineIcon from '@/assets/images/Icon_Line.svg';
import logo from '@/assets/images/1002_logo_f.svg';
import logo2 from '@/assets/images/logo_t.svg';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import { fakeProviderData } from '@/pages/Content/Home/Provider/ProviderData';

// import { popupIsOpenAtom } from '@/components/ContentLayout/LoginPopUp';

export const Footer: React.FC = () => {
    const windowWidth = useAtomValue(windowWidthAtom);
    const { t } = useTranslation();
    const fakeBetRule = [
        {
            label: 'Live Sports',
            value: 'liveSports',
        },
        {
            label: 'European Sports',
            value: 'europeanSports',
        },
        {
            label: 'Casino',
            value: 'casino',
        },
        {
            label: 'Slot',
            value: 'slot',
        },
        {
            label: 'MiniGame',
            value: 'miniGame',
        },
        {
            label: 'Virtual Sportse',
            value: 'virtualSportse',
        },
    ];
    return (
        <div className="bg-white w-full text-black font-normal z-10 px-4">
            <div className="footerImgWrap grid sm:grid-cols-11 sm:pb-20 sm:py-9 grid-cols-4 gap-4 w-full h-auto border-solid border-b-2 border-0 border-[#E0E0E0] py-6">
                <div className="aboutWrap sm:block sm:col-start-2 sm:col-span-3 col-span-4 gap-2.5 grid grid-cols-4">
                    <div className="footerLogo sm:h-10 col-span-1 h-full">
                        <img src={windowWidth > 414 ? logo : logo2} alt="" className="w-full h-full object-left object-contain" />
                    </div>
                    <div className="txt sm:pt-4 sm:mt-4 sm:border-t-2 sm:border-l-0 border-l-2 pl-2.5 col-span-3 text-[#333333] text-xs font-normal  border-solid  border-0 border-[#E0E0E0]">{t('COPYRIGHT 2023, SMART BET. ALL RIGHTS RESERVED. GAMBLING CAN BE ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE PAYMENT SUPPORTED BY CODE PAY')}</div>
                </div>
                <div className="helpWrap w-full sm:block sm:col-span-3 col-span-4 gap-2.5 grid grid-cols-4">
                    <div className="text-2xl sm:h-10 sm:mb-6 font-bold text-black  flex items-center gap-3 col-span-1">
                        {windowWidth > 414 ? (
                            <>
                                <img src={Icon_Main_Title} alt="" />
                                <span className="">SMART BET HELP</span>
                            </>
                        ) : (
                            <span className="w-full h-full flex justify-center items-center">HELP</span>
                        )}
                    </div>
                    <ul className=" gap-4 p-0 m-0 col-span-3 grid grid-cols-3">
                        <li className="sm:aspect-[100/120] aspect-square rounded-2xl cursor-pointer bg-[#BAA8FF33] duration-300 hover:shadow-[0_0px_15px_rgba(150,128,234,0.5)]">
                            <div className="w-full h-full flex justify-center items-center">
                                <Link to="/">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={igIcon} alt="" className="w-6 mb-1" />
                                        <span className="text-[#9680EA] sm:text-xs sm:mt-4 text-[8px] font-bold">Instagram</span>
                                    </div>
                                </Link>
                            </div>
                        </li>
                        <li className="sm:aspect-[100/120] aspect-square rounded-2xl cursor-pointer bg-[#BAA8FF33] duration-300 hover:shadow-[0_0px_15px_rgba(150,128,234,0.5)]">
                            <div className="w-full h-full flex justify-center items-center">
                                <Link to="/">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={twitterIcon} alt="" className="w-6 mb-1" />
                                        <span className="text-[#9680EA] sm:text-xs sm:mt-4 text-[8px] font-bold ">Twitter</span>
                                    </div>
                                </Link>
                            </div>
                        </li>
                        <li className="sm:aspect-[100/120] aspect-square rounded-2xl cursor-pointer bg-[#BAA8FF33] duration-300 hover:shadow-[0_0px_15px_rgba(150,128,234,0.5)]">
                            <div className="w-full h-full flex justify-center items-center">
                                <Link to="/">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={lineIcon} alt="" className="w-6 mb-1" />
                                        <span className="text-[#9680EA] sm:text-xs sm:mt-4 text-[8px] font-bold">Line</span>
                                    </div>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="hidden rightZone w-full col-span-3 sm:grid grid-cols-2 md:grid-cols-3 gap-4 basis-1/3">
                    <div className="text-center">
                        <span className="h-10 flex items-center justify-center text-lg text-black mb-4 font-bold">{t('About Us')}</span>
                        <ul className="flex flex-col gap-1 p-0 m-0">
                            <li>
                                <Link to="/about">
                                    <span className="text-[#333333] hover:underline ">{t('About Us')}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="text-center">
                        <span className="h-10 flex items-center justify-center text-lg text-black mb-4 font-bold">{t('Bet Rule')}</span>
                        <ul className="flex flex-col gap-1 p-0 m-0">
                            {fakeBetRule.map((item) => {
                                return (
                                    <li key={nanoid()}>
                                        <Link to="/">
                                            <span className="text-[#333333] hover:underline ">{t(item.label)}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="text-center">
                        <span className="h-10 flex items-center justify-center text-lg text-black mb-4 font-bold">{t('Site Map')}</span>
                        <ul className="flex flex-col gap-1 p-0 m-0">
                            {fakeBetRule.map((item) => {
                                return (
                                    <li key={nanoid()}>
                                        <Link to="/">
                                            <span className="text-[#333333] hover:underline ">{t(item.label)}</span>
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
