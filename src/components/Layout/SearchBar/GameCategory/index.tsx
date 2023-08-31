import React from 'react';
import { nanoid } from 'nanoid';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GameCategoryStateAtom } from '@/pages/Taxonomy/AtomSetting';
import LiveCasinoImg from '@/assets/images/LiveCasinoImg.svg';
import SlotImg from '@/assets/images/SlotImg.svg';

type GameCategoryProps = {
    Provider: string;
};

const index: React.FC<GameCategoryProps> = ({ Provider }) => {
    const { t } = useTranslation();
    const GameCategoryState = useAtomValue(GameCategoryStateAtom); // ['live','slot'
    const Navigate = useNavigate();
    const GameCategoryData = [
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
                {GameCategoryData.map((item) => (
                    <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={nanoid()}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => handleClick(item.toPath)}
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
                                GameCategoryState === item.toPath
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
