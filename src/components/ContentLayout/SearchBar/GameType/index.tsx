import React from 'react';
import { nanoid } from 'nanoid';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { GameTypeAtom } from '@/pages/Content/Taxonomy/AtomSetting';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { FilterGamesIsOpenAtom } from '../index';
import allImg from '@/assets/images/allImg.png';
import blackjackImg from '@/assets/images/blackjackImg.png';
import rouletteImg from '@/assets/images/rouletteImg.png';
import baccaratImg from '@/assets/images/baccaratImg.png';
import dragontigerImg from '@/assets/images/dragontigerImg.png';
import diceImg from '@/assets/images/bac_bo_circular_752x752_jp_2021_11.png';

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
            gameType: 'Baccarat',
        },
        {
            img: blackjackImg,
            name: 'Blackjack',
            gameType: 'Blackjack',
        },
        {
            img: rouletteImg,
            name: 'Roulette',
            gameType: 'Roulette',
        },
        {
            img: diceImg,
            name: 'Dice',
            gameType: 'Dice',
        },
        {
            img: dragontigerImg,
            name: 'Other',
            gameType: 'Other',
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
                    <div key={nanoid()} className="flex flex-col items-center cursor-pointer my-1 GameType" onClick={() => handleClick(item.gameType)}>
                        <div className="LazyLoadImage">
                            <LazyLoadImage src={item.img} alt="" width="80px" height="80px" />
                        </div>
                        {/* <img src={item.img} alt="" className="w-20" /> */}
                        <span className={`${GameTypeValue === item.gameType ? 'text-[#78d39d]' : ''}`}>{t(item.name)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default GameType;
