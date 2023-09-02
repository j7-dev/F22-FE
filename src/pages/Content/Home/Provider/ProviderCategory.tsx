import React from 'react';
import { nanoid } from 'nanoid';
import { useAtom, useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
import LiveCasinoImg from '@/assets/images/LiveCasinoImg.svg';
import SlotImg from '@/assets/images/SlotImg.svg';
import SportsImg from '@/assets/images/SportsImg.svg';
import { ProviderStateAtom, ProviderPathAtom } from '../AtomSetting/index';

const index: React.FC = () => {
    const [ProviderState, setProviderState] = useAtom(ProviderStateAtom);
    const setProviderPath = useSetAtom(ProviderPathAtom);
    // console.log('ProviderCategoryState', ProviderState);
    const { t } = useTranslation();
    // const Navigate = useNavigate();
    const ProviderCategory = [
        {
            img: SportsImg,
            name: 'Sports',
            path: '',
        },
        {
            img: LiveCasinoImg,
            name: 'Live Casino',
            path: '/live',
        },
        {
            img: SlotImg,
            name: 'Slot Game',
            path: '/slot',
        },
    ];

    const handleClick = (ProviderStateName: string, ProviderPath: string) => {
        setProviderState(ProviderStateName);
        setProviderPath(ProviderPath);
    };
    return (
        <div className="w-full GameCategory">
            <div className="flex flex-nowrap gap-2.5 justify-center max-w-5xl mx-auto">
                {ProviderCategory.map((item) => (
                    <div
                        key={nanoid()}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => {
                            handleClick(item.name, item.path);
                        }}
                    >
                        <div className="w-24 h-24 m-2.5 p-5 bg-white shadow-[0_0px_30px_0px_rgba(194,127,228,0.3)] border border-solid border-[#99BDE8] rounded-full">
                            <img
                                src={item.img as unknown as string}
                                alt=""
                                className="w-full h-full"
                            />
                        </div>
                        <span
                            className={`font-bold ${
                                ProviderState === item.name
                                    ? 'text-[#78d39d]'
                                    : ''
                            }`}
                        >
                            {t(item.name)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default index;
