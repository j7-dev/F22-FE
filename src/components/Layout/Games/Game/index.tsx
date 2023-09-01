import React from 'react';
import coinIcon from '@/assets/images/coin-icon.png';
import blackjackImg from '@/assets/images/blackjackImg.png';
import rouletteImg from '@/assets/images/rouletteImg.png';
import baccaratImg from '@/assets/images/baccaratImg.png';
import dragontigerImg from '@/assets/images/dragontigerImg.png';

type GameProps = {
    data?: {
        'Table Name': string;
        'Table ID': string;
        'Direct Launch Table ID': string;
        'Game Type': string;
    };
};
const index: React.FC<GameProps> = ({ data = {} }) => (
    <div className="gameWrap w-full px-1">
        <div className="gameImg w-full aspect-square relative">
            <img
                className="w-full aspect-square align-top"
                src={
                    data['Game Type'] === 'baccarat'
                        ? baccaratImg
                        : data['Game Type'] === 'blackjack'
                        ? blackjackImg
                        : data['Game Type'] === 'roulette'
                        ? rouletteImg
                        : dragontigerImg
                }
                alt=""
            />
        </div>
        <div className="gameInfo bg-[#363F4E] px-2 py-2">
            <span className="gameName text-white line-clamp-1  text-sm">
                {data['Table Name']}
            </span>
        </div>
        {/* 如果有登入才出現 */}
        <div className="gameBalance flex justify-end gap-2 items-center bg-[#2B3240] px-2 py-1">
            <img className="h-[15px]" src={coinIcon} alt="" />
            <div className="balance">
                <span className="text-white font-bold">¥ 0</span>
            </div>
        </div>
    </div>
);

export default index;
