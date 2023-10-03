import React from 'react';
import { nanoid } from 'nanoid';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GameCategoryStateAtom } from '@/pages/Content/Taxonomy/AtomSetting';
import LiveCasinoImg from '@/assets/images/LiveCasinoImg.svg';
import SlotImg from '@/assets/images/SlotImg.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type GameCategoryProps = {
    Provider: string;
};

const index: React.FC<GameCategoryProps> = ({ Provider }) => {
    const { t } = useTranslation();
    const GameCategoryState = useAtomValue(GameCategoryStateAtom); // ['live','slot'
    const Navigate = useNavigate();
    const gameCategories = [
        {
            img: LiveCasinoImg,
            name: 'Live Casino',
            toPath: 'live',
        },
        {
            img: SlotImg,
            name: 'Slot Game',
            toPath: 'slot',
        },
    ];

    const handleClick = (Category: string) => {
        Navigate(`/${Provider}/${Category}`);
    };
    return (
        <div className="w-full GameCategory">
            <div className="flex flex-nowrap gap-2.5 justify-center max-w-5xl mx-auto">
                {gameCategories.map((item) => (
                    <div key={nanoid()} className="flex flex-col items-center cursor-pointer" onClick={() => handleClick(item.toPath)}>
                        <div className="w-16 h-16 md:w-24 md:h-24 m-2.5 p-5 bg-white shadow-[0_0px_30px_0px_rgba(194,127,228,0.3)] border border-solid border-[#99BDE8] rounded-full">
                            <LazyLoadImage src={item.img as unknown as string} alt="" width="100%" height="100%" />
                        </div>
                        <span className={`font-bold text-xs md:text-base ${GameCategoryState === item.name ? 'text-[#78d39d]' : ''}`}>{t(item.name)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default index;
