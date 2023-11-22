import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { useSetAtom } from 'jotai';
// import { Link } from 'react-router-dom';
import LanguageSwitch from '@/components/ContentLayout/Header/LanguageSwitch';
import { socialMedia } from '@/utils/menuData/socialMedia';
import { gameCategories } from '@/utils/GameCategory';
import QRCode from 'qrcode';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import { fakeProviderData } from '@/pages/Content/Home/Provider/ProviderData';
import { useShowPc } from '@/hooks/useShowPc';
import appStore from '@/assets/images/sideBar/appStore.png';
import googlePlay from '@/assets/images/sideBar/googlePlay.png';

export const Footer: React.FC = () => {
    const showPc = useShowPc();
    const { t } = useTranslation();
    //QRCode
    const androidUrl = `https://${window.location.hostname}/apk/app.apk`;
    const iosUrl = `itms-services://?action=download-manifest&url=https://${window.location.hostname}/ipa/app.plist`;
    const [androidQrCode, setAndroidQrCode] = React.useState('');
    const [iosQrCode, setIosQrCode] = React.useState('');
    const generateQR = async ({ setAndroidUrl, setIosUrl }: { setAndroidUrl: string; setIosUrl: string }) => {
        try {
            const androidResponse = await QRCode.toDataURL(setAndroidUrl, { margin: 0 });
            const iosResponse = await QRCode.toDataURL(setIosUrl, { margin: 0 });
            setAndroidQrCode(androidResponse);
            setIosQrCode(iosResponse);
        } catch (err) {
            console.error(err);
            return '';
        }
    };
    useEffect(() => {
        generateQR({ setAndroidUrl: androidUrl, setIosUrl: iosUrl });
    }, []);
    return (
        <div className="bg-white w-full text-black font-normal z-10 ">
            <div className="footerImgWrap place-content-stretch grid md:grid-cols-11 md:pb-20 md:py-9 grid-cols-4 gap-4 w-full h-auto border-solid border-b-2 border-0 border-[#E0E0E0] py-6 px-4">
                {/* Title */}
                <div className="aboutTitle hidden md:flex md:flex-col md:col-start-2 md:col-span-3 gap-4 ">
                    <div className=" md:h-10 col-span-1 h-full md:flex justify-start items-center text-center gap-3">
                        <img src={Icon_Main_Title} alt="" />
                        <span className="md:text-2xl text-[10px] font-bold text-black">{t('DOWNLOAD APP')}</span>
                    </div>
                </div>
                <div className="helpTitle w-full md:col-span-3 col-span-1 gap-4 grid  grid-cols-1">
                    <div className="md:text-2xl md:h-10 text-[10px] font-bold text-black flex items-center justify-start gap-3 col-span-1">
                        {showPc ? (
                            <>
                                <img src={Icon_Main_Title} alt="" />
                                <span className="">{t('SMART BET HELP')}</span>
                            </>
                        ) : (
                            <span className="w-full h-full flex justify-center items-center">{t('SMRAT BET')}</span>
                        )}
                    </div>
                </div>
                <div className="hidden rightTitle w-full md:col-span-3 md:grid-cols-3 md:gap-4 col-span-4 md:grid grid-cols-4 gap-1">
                    <div className="aboutUsTitle text-center md:col-span-1 md:flex md:flex-col md:gap-4 col-span-4 grid grid-cols-4">
                        <span className="md:text-lg md:h-10 text-[10px] col-span-1 flex items-center justify-center text-black font-bold">{t('About Us')}</span>
                    </div>
                    <div className="betRuleTitle text-center md:col-span-1 md:flex md:flex-col md:gap-4 col-span-4 grid grid-cols-4">
                        <span className="md:text-lg md:h-10 text-[10px] col-span-1 flex items-center justify-center text-black font-bold">{t('Bet Rule')}</span>
                    </div>
                    <div className="siteMapTitle text-center md:col-span-1 md:flex md:flex-col md:gap-4 col-span-4 grid grid-cols-4">
                        <span className="md:text-lg md:h-10 text-[10px] col-span-1 flex items-center justify-center text-black font-bold">{t('Site Map')}</span>
                    </div>
                </div>
                {/* Content */}
                <div className="aboutContent hidden md:flex md:flex-col md:col-start-2 md:col-span-3 gap-4">
                    {/* qr code */}
                    <div className="pr-10 md:grid grid-cols-2 col-span-3 gap-4">
                        <div className="androidQrCode flex flex-col gap-4">
                            <img src={androidQrCode} alt="" className="w-full" />
                            <a href={androidUrl}>
                                <img src={googlePlay} alt="" className="w-full" />
                            </a>
                        </div>
                        <div className="iosQrCode flex flex-col gap-4">
                            <img src={iosQrCode} alt="" className="w-full" />
                            <a href={iosUrl}>
                                <img src={appStore} alt="" className="w-full" />
                            </a>
                        </div>
                    </div>
                    {/* 電腦版翻譯選單 */}
                    {showPc ? <LanguageSwitch /> : ''}
                </div>
                <div className="helpWrap w-full col-span-3 gap-4 grid grid-cols-1">
                    <ul className="socialMedia h-full md:grid-cols-4 gap-1.5 p-0 m-0 col-span-3 grid grid-cols-5 ">
                        {socialMedia.map((item) => {
                            return (
                                <li key={nanoid()} className="min-h-[50px] rounded-2xl cursor-pointer bg-[#BAA8FF33] duration-300 hover:shadow-[0_0px_15px_rgba(150,128,234,0.5)]">
                                    <div className="w-full h-full flex justify-center items-center">
                                        <Link to={item.link}>
                                            <div className="flex flex-col justify-center items-center">
                                                <img src={item.icon} alt="" className="md:w-[30px] w-[15px] md:mb-2 aspect-square" />
                                                <span className="hidden md:block text-[#9680EA] md:text-xs text-[6px] leading-[8px] font-bold text-center">{t(item.value)}</span>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="hidden rightContent w-full md:col-span-3 md:grid-cols-3 md:gap-4 col-span-4 md:grid grid-cols-4 gap-1">
                    <div className="aboutWrap text-center md:col-span-1 md:flex md:flex-col md:gap-4 col-span-4 grid grid-cols-4">
                        <ul className="md:flex-col md:justify-center md:gap-0 col-span-3 flex flex-row justify-start items-center gap-1 p-0 m-0">
                            <li>
                                <Link to="/about">
                                    <span className="md:text-xs text-[10px] text-[#333333] hover:underline ">{t('About Us')}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/golf">
                                    <span className="md:text-xs text-[10px] text-white hover:underline ">{t('golf')}</span>
                                </Link>
                            </li>
                            {/* <li>
                                <a href="itms-services://?action=download-manifest&url=https://f22-fe.vercel.app/ipa/app.plist" className="md:text-xs text-[10px] text-[#333333] hover:underline ">
                                    IPA下載
                                </a>
                            </li> */}
                        </ul>
                    </div>
                    <div className="betRuleContent text-center md:col-span-1 md:flex md:flex-col md:gap-4 col-span-4 grid grid-cols-4">
                        <ul className="md:flex-col md:justify-center md:gap-0 col-span-3 flex flex-row justify-start items-center gap-1 p-0 m-0">
                            {gameCategories.map((item) => {
                                return (
                                    <li key={nanoid()}>
                                        <Link to={item.path}>
                                            <span className="md:text-xs text-[10px] text-[#333333] hover:underline ">{t(item.label)}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="siteMapContent text-center md:col-span-1 md:flex md:flex-col md:gap-4 col-span-4 grid grid-cols-4">
                        <ul className="md:flex-col md:justify-center md:gap-0 col-span-3 flex flex-row justify-start items-center gap-1 p-0 m-0">
                            {gameCategories.map((item) => {
                                return (
                                    <li key={nanoid()}>
                                        <Link to={item.path}>
                                            <span className="md:text-xs text-[10px] text-[#333333] hover:underline ">{t(item.label)}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full block py-2 md:py-4 md:px-20 md:text-base text-xs text-center font-normal text-gray-500">
                <ul className="grid grid-cols-5 pl-0 md:gap-4 gap-2">
                    {fakeProviderData.map((item) => {
                        return (
                            <li key={nanoid()} className="md:h-[55px] h-[20px]">
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
