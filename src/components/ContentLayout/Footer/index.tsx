import React from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { useSetAtom } from 'jotai';
// import { Link } from 'react-router-dom';
// import { MenuItem, fakeMenuData } from '@/components/ContentLayout/Header/MenuData';
import twitterIcon from '@/assets/images/Icon_Twitter.svg';
import igIcon from '@/assets/images/Icon_Instagram.svg';
import lineIcon from '@/assets/images/Icon_Line.svg';
import logo from '@/assets/images/0927logo.jpg';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import { fakeProviderData } from '@/pages/Content/Home/Provider/ProviderData';

// import { popupIsOpenAtom } from '@/components/ContentLayout/LoginPopUp';

export const Footer: React.FC = () => {
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
        <div className="bg-white w-full text-black font-normal z-10">
            <div className="footerImgWrap px-4 flex flex-col justify-center items-start md:flex-row md:justify-start md:items-start gap-14 w-full h-auto border-solid border-b-2 border-0 border-[#E0E0E0] pb-20 md:py-9 md:px-32">
                <div className="aboutWrap basis-1/4">
                    <div className="footerLogo">
                        <img src={logo} alt="" className="w-full" />
                    </div>
                    <div className="txt text-[#333333] text-xs font-normal pt-4 mt-4 border-solid border-t-2 border-0 border-[#E0E0E0]">
                        {t('COPYRIGHT 2020, OLE BET. ALL RIGHTS RESERVED. GAMBLING CAN BE ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE')}
                        <br />
                        {t('PAYMENT SUPPORTED BY')}
                    </div>
                </div>
                <div className="helpWrap w-full basis-1/4">
                    <div className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                        <img src={Icon_Main_Title} alt="" />
                        <span className="">SMART BET HELP</span>
                    </div>
                    <ul className="flex gap-4 p-0 m-0 justify-center">
                        <li className="w-[100px] aspect-[100/120] rounded-2xl cursor-pointer bg-[#BAA8FF33] duration-300 hover:shadow-[0_0px_15px_rgba(150,128,234,0.5)]">
                            <div className="w-full h-full flex justify-center items-center">
                                <Link to="/">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={igIcon} alt="" className="w-6 mb-1" />
                                        <span className="text-[#9680EA] text-xs font-bold mt-4">Instagram</span>
                                    </div>
                                </Link>
                            </div>
                        </li>
                        <li className="w-[100px] aspect-[100/120] rounded-2xl cursor-pointer bg-[#BAA8FF33] duration-300 hover:shadow-[0_0px_15px_rgba(150,128,234,0.5)]">
                            <div className="w-full h-full flex justify-center items-center">
                                <Link to="/">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={twitterIcon} alt="" className="w-6 mb-1" />
                                        <span className="text-[#9680EA] text-xs font-bold mt-4">Twitter</span>
                                    </div>
                                </Link>
                            </div>
                        </li>
                        <li className="w-[100px] aspect-[100/120] rounded-2xl cursor-pointer bg-[#BAA8FF33] duration-300 hover:shadow-[0_0px_15px_rgba(150,128,234,0.5)]">
                            <div className="w-full h-full flex justify-center items-center">
                                <Link to="/">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={lineIcon} alt="" className="w-6 mb-1" />
                                        <span className="text-[#9680EA] text-xs font-bold mt-4">Line</span>
                                    </div>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="rightZone w-full grid grid-cols-2 md:grid-cols-3 gap-5 basis-1/3">
                    <div className="text-center">
                        <span className="text-lg text-black mb-4 block font-bold">{t('About Us')}</span>
                        <ul className="flex flex-col gap-1 p-0 m-0">
                            <li>
                                <Link to="/about">
                                    <span className="text-[#333333] hover:underline ">{t('About Us')}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="text-center">
                        <span className="text-lg text-black mb-4 block font-bold">{t('Bet Rule')}</span>
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
                        <span className="text-lg text-black mb-4 block font-bold">{t('Site Map')}</span>
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
            <div className="w-full block pt-4 pb-16 md:py-4 md:px-32 text-xs md:text-base text-center font-normal text-gray-500">
                <ul className="grid grid-cols-2 md:grid-cols-6 pl-0">
                    {fakeProviderData.map((item) => {
                        return (
                            <li key={nanoid()} className="h-20">
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
