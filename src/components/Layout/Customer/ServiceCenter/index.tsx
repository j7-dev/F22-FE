import React from 'react';
import { nanoid } from 'nanoid';
import { useAtom, atom, useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import noticeImg from '@/assets/images/notice-icon.svg';
import faqIcon from '@/assets/images/faq-icon.svg';
import promoIcon from '@/assets/images/promo-icon.svg';
import inquiryIcom from '@/assets/images/inquiry-icon.svg';
import affiliatesIcon from '@/assets/images/affiliates-icon.svg';

export interface PostContent {
    id: number;
    title: string;
    date: string;
    content: string;
}
export const serviceCenterAtom = atom<string>('Notice');
export const isShowContentAtom = atom<boolean>(false);
export const postContentAtom = atom<PostContent>({
    id: 0,
    title: '',
    date: '',
    content: '',
});

const ServiceMenu: React.FC = () => {
    const { t } = useTranslation();
    const [
        serviceCenterValue,
        setserviceCenterValue,
    ] = useAtom(serviceCenterAtom);
    const setIsShowContent = useSetAtom(isShowContentAtom);

    const serviceCenterMenu = [
        {
            title: 'Notice',
            icon: noticeImg,
        },
        {
            title: 'Frequently Asked Questions',
            icon: faqIcon,
        },
        {
            title: 'Promotions/Events',
            icon: promoIcon,
        },
        {
            title: '1:1 Inquiry',
            icon: inquiryIcom,
        },
        {
            title: 'Partnership',
            icon: affiliatesIcon,
        },
    ];

    const handleClick = (title: string) => {
        // console.log('title', title);
        setIsShowContent(false);
        setserviceCenterValue(title);
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div>
                <span className="text-[#2b324080] text-sm font-bold">
                    {t('Service Center')}
                </span>
            </div>
            <div>
                <ul className="m-0 p-0 flex flex-col gap-2.5">
                    {serviceCenterMenu.map((item) => (
                        <li key={nanoid()}>
                            <button
                                className={`flex gap-2.5 justify-start items-center w-full h-10 border-0 rounded-lg py-0 px-2.5 cursor-pointer ${
                                    serviceCenterValue === item.title
                                        ? 'bg-[#F3F3F4]'
                                        : 'bg-transparent'
                                }`}
                                onClick={() => handleClick(item.title)}
                            >
                                <img
                                    src={item.icon as unknown as string}
                                    alt=""
                                />
                                <span className="font-bold text-[#2B3240] text-sm">
                                    {t(item.title)}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ServiceMenu;
