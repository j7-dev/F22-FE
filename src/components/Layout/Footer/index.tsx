import React from 'react';
import { nanoid } from 'nanoid';
import { useSetAtom } from 'jotai';
import { popupIsOpenAtom } from '@/components/Layout/LoginPopUp';
import fakeFooterImg from '@/assets/images/fakeFooterImg.png';
import gcLogoImg from '@/assets/images/gc-logo.png';

export const Footer: React.FC = () => {
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    // const popupIsOpen = useAtomValue(popupIsOpenAtom);
    const handleClick = () => {
        setPopupIsOpen((prevValue) => !prevValue);
        // console.log('popupIsOpenAtom', popupIsOpen);
    };
    return (
        <div className="bg-[#f3F3F4] w-full pt-5 pb-20 text-black font-bold">
            <div className="border-solid border-b-[1px] border-0 border-[#48516066]">
                <div className="flex flex-row justify-between max-w-6xl mx-auto  pb-20">
                    {new Array(4).fill(0).map(() => (
                        <div key={nanoid()} className="footer-section">
                            <h3 className="font-base ">Game Categories</h3>
                            <ul className="px-0">
                                {new Array(5).fill(0).map(() => (
                                    <li key={nanoid()} className="py-1">
                                        <span
                                            className="text-sm text-black hover:text-[#78D39D] cursor-pointer"
                                            onClick={handleClick}
                                        >
                                            Baccarat
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footerImgWarp max-w-5xl flex justify-between mx-auto items-center gap-4 mt-4">
                {new Array(5).fill(0).map(() => (
                    <div key={nanoid()} className="footerImg">
                        <img src={fakeFooterImg} alt="" />
                    </div>
                ))}
            </div>
            <div className="footerImgWarp max-w-5xl flex justify-center mx-auto h-12 items-center gap-8 mt-4">
                <img className="h-full" src={gcLogoImg} alt="" />
                <img className="h-full" src={gcLogoImg} alt="" />
                <span>© 2023 F22 . All rights reserved</span>
                <img className="h-full" src={gcLogoImg} alt="" />
                <img className="h-full" src={gcLogoImg} alt="" />
            </div>
        </div>
    );
};
