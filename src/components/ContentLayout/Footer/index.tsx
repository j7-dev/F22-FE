import React from 'react';
import { nanoid } from 'nanoid';
import { useTranslation, Trans } from 'react-i18next';
// import { useSetAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { MenuItem, fakeMenuData } from '@/components/ContentLayout/Header/MenuData';
// import { popupIsOpenAtom } from '@/components/ContentLayout/LoginPopUp';
// import { fakeProviderData } from '@/pages/Content/Home/Provider/ProviderData';

export const Footer: React.FC = () => {
    const { t } = useTranslation();
    // TODO 要改成從後端拿
    const fakeData = fakeMenuData.filter((item) => item.title === 'Live Casino' || item.title === 'Slot Game' || item.title === 'Sports');
    // const ProviderData = fakeProviderData;
    // const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    // const popupIsOpen = useAtomValue(popupIsOpenAtom);
    // const handleClick = () => {
    //     setPopupIsOpen((prevValue) => !prevValue);
    //     // console.log('popupIsOpenAtom', popupIsOpen);
    // };
    return (
        <div className="bg-[#f3F3F4] w-full pt-20 px-5 text-black font-bold">
            <div className="border-solid border-b-[1px] border-0 border-[#48516066]">
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
            </div>
            {/* <div className="footerImgWarp max-w-5xl flex flex-wrap w-full justify-center mx-auto items-center gap-4 mt-4 md:justify-between">
                {ProviderData.map((item) => (
                    <div key={nanoid()} className="footerImg">
                        <img src={item.ProviderImg} alt="" className="max-w-[120px]" />
                    </div>
                ))}
            </div> */}
            <div className="footerImgWarp max-w-5xl flex w-full justify-center mx-auto h-auto items-center gap-8 mt-12 pb-20 md:pb-4">
                <span className="text-xs md:text-base text-center font-normal text-gray-500">
                    <Trans i18nKey="© Smart Bet Casino" />
                </span>
            </div>
        </div>
    );
};
