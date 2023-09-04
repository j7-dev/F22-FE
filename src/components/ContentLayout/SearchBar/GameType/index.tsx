import React from 'react';
import { nanoid } from 'nanoid';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { GameTypeAtom } from '@/pages/Content/Taxonomy/AtomSetting';
// import { FilterGamesIsOpenAtom } from '../index';
import allImg from '@/assets/images/allImg.png';
import blackjackImg from '@/assets/images/blackjackImg.png';
import rouletteImg from '@/assets/images/rouletteImg.png';
import baccaratImg from '@/assets/images/baccaratImg.png';
import dragontigerImg from '@/assets/images/dragontigerImg.png';

const GameType: React.FC = () => {
    const { t } = useTranslation();
    const GameTypeData = [
        {
            img: allImg,
            name: 'All',
            gameType: 'all',
        },
        {
            img: baccaratImg,
            name: 'Baccarat',
            gameType: 'baccarat',
        },
        {
            img: blackjackImg,
            name: 'Blackjack',
            gameType: 'blackjack',
        },
        {
            img: rouletteImg,
            name: 'Roulette',
            gameType: 'roulette',
        },
        {
            img: dragontigerImg,
            name: 'Dragon Tiger',
            gameType: 'dragontiger',
        },
    ];

    const [GameTypeValue, setGameType] = useAtom(GameTypeAtom);
    const handleClick = (Category: string) => {
        setGameType(Category);
    };
    return (
        <div className="w-full GameType">
            <div className="flex flex-wrap gap-2.5 px-8 my-5 justify-center max-w-5xl mx-auto md:flex-nowrap">
                {GameTypeData.map((item) => (
                    <div
                        key={nanoid()}
                        className="flex flex-col items-center cursor-pointer my-1"
                        onClick={() => handleClick(item.gameType)}
                    >
                        <img src={item.img} alt="" className="w-20" />
                        <span
                            className={`${
                                GameTypeValue === item.gameType
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
export default GameType;
