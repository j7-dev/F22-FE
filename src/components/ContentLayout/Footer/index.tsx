import React from 'react';
// import { nanoid } from 'nanoid';
import { useTranslation, Trans } from 'react-i18next';
// import { useSetAtom } from 'jotai';
// import { Link } from 'react-router-dom';
// import { MenuItem, fakeMenuData } from '@/components/ContentLayout/Header/MenuData';
import twitterIcon from '@/assets/images/twitter-icon.png';
import igIcon from '@/assets/images/ig-icon.png';
import lineIcon from '@/assets/images/line-icon.png';
import logo from '@/assets/images/logo.png';
import { Link } from 'react-router-dom';
// import { popupIsOpenAtom } from '@/components/ContentLayout/LoginPopUp';
// import { fakeProviderData } from '@/pages/Content/Home/Provider/ProviderData';

export const Footer: React.FC = () => {
    const { t } = useTranslation();
    // TODO 要改成從後端拿
    // const fakeData = fakeMenuData.filter((item) => item.title === 'Live Casino' || item.title === 'Slot Game' || item.title === 'Sports');
    // const ProviderData = fakeProviderData;
    // const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    // const popupIsOpen = useAtomValue(popupIsOpenAtom);
    // const handleClick = () => {
    //     setPopupIsOpen((prevValue) => !prevValue);
    //     // console.log('popupIsOpenAtom', popupIsOpen);
    // };
    return (
        <div className="bg-[#f3F3F4] w-full px-5 text-black font-normal">
            {/* <div className="border-solid border-b-[1px] border-0 border-[#48516066]">
                <div className="grid grid-cols-2 md:grid-cols-3 justify-between max-w-3xl mx-auto">
                    {fakeData.map((item) => {
                        const subMenu = item?.submenu as MenuItem[];
                        const hasSubmenu = !!item?.submenu;
                        return (
                            <div key={nanoid()} className="footer-section mb-20">
                                <h3 className="font-base mb-8">{t(item.title)}</h3>
                                <ul className="px-0 submenu flex flex-col gap-5 w-auto my-0 h-auto">
                                    {hasSubmenu && (
                                        <>
                                            {subMenu.map((subItem) => (
                                                <li key={nanoid()} className="flex items-center gap-2.5 cursor-pointer">
                                                    <img src={subItem.imgSrc} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] object-contain" />
                                                    <Link to={subItem.path as string}>
                                                        <span className="text-sm md:text-base font-normal text-gray-500 hover:text-[#78d39d]">{subItem.title}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div> */}

            <div className="footerImgWrap max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 w-full mx-auto h-auto border-solid border-b-[1px] border-0 border-[#48516066] pb-20 md:py-9 ">
                <div className="aboutWrap">
                    <div className="footerLogo">
                        <img src={logo} alt="" className="w-full" />
                    </div>
                    <div className="txt text-gray-500 text-xs font-normal">
                        {t('COPYRIGHT 2020, OLE BET. ALL RIGHTS RESERVED. GAMBLING CAN BE ADDICTIVE, PLEASE PLAY RESPONSIBLY. FOR MORE INFORMATION ON SUPPORT TOOLS, PLEASE VISIT OUR RESPONSIBLE GAMBLING PAGE')}
                        <br />
                        {t('PAYMENT SUPPORTED BY')}
                    </div>
                </div>
                <div className="helpWrap pl-1 sm:pl-2 space-x-1">
                    <div className="text-xl text-[#828282] mb-4">
                        SMART BET <span className="text-[#00a8ea]">HELP</span>
                    </div>
                    <ul className="flex gap-1 p-0 m-0">
                        <li className="w-[100px] aspect-[4/3] rounded-lg cursor-pointer bg-[#e5e5e5] duration-300 hover:shadow-[0_0px_15px_rgba(0,163,255,1)]">
                            <div className="w-full h-full flex justify-center items-center">
                                <Link to="/">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={twitterIcon} alt="" className="w-6 mb-1" />
                                        <span className="">Twitter</span>
                                    </div>
                                </Link>
                            </div>
                        </li>
                        <li className="w-[100px] aspect-[4/3] rounded-lg cursor-pointer bg-[#e5e5e5] duration-300 hover:shadow-[0_0px_15px_rgba(0,163,255,1)]">
                            <div className="w-full h-full flex justify-center items-center">
                                <Link to="/">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={igIcon} alt="" className="w-6 mb-1" />
                                        <span className="">Instagram</span>
                                    </div>
                                </Link>
                            </div>
                        </li>
                        <li className="w-[100px] aspect-[4/3] rounded-lg cursor-pointer bg-[#e5e5e5] duration-300 hover:shadow-[0_0px_15px_rgba(0,163,255,1)]">
                            <div className="w-full h-full flex justify-center items-center">
                                <Link to="/">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={lineIcon} alt="" className="w-6 mb-1" />
                                        <span className="">Line</span>
                                    </div>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="rightZone grid grid-cols-1  gap-1">
                    <div>
                        <span className="text-xl text-[#828282] mb-4 block">{t('About us')}</span>
                        <ul className="flex flex-col gap-1 p-0 m-0">
                            <li>
                                <Link to="/about">
                                    <span className="text-gray-500 hover:text-[#78d39d]">{t('Responsible Gaming')}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/customer">
                                    <span className="text-gray-500 hover:text-[#78d39d]">{t('Service Center')}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <span className="w-full block pb-20 py-4 text-xs md:text-base text-center font-normal text-gray-500">
                <Trans i18nKey="© Smart Bet Casino" />
            </span>
        </div>
    );
};
