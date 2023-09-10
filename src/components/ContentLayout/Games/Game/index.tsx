import React from 'react';
import { getGameTypeImg } from '@/components/ContentLayout/Games/Game/GameImg/';
import coinIcon from '@/assets/images/coin-icon.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { getFakeImg } from '@/pages/Content/Taxonomy/Live/Evolution/fakeGameData';

type GameProps = {
    data?: {
        'Table Name'?: string;
        'Table ID'?: string;
        'Direct Launch Table ID'?: string;
        'Game Type'?: string;
        'Bet Limit'?: {
            KRW: {
                symbol: string;
                min: number;
                max: number;
            };
        };
    };
    imgiD?: number;
};
const index: React.FC<GameProps> = ({ data = {} }) => (
    <div className="gameWrap w-full px-1">
        <div className="gameImg w-full aspect-square relative align-top object-cover LazyLoadImage">
            {/* <LazyLoadImage src={getFakeImg(imgiD + 1)} width="100%" height="100%" /> */}
            <LazyLoadImage src={getGameTypeImg(data['Game Type'] as string)} width="100%" height="100%" />
            {/* <img className="w-full aspect-square align-top object-cover" src={data.GameImg} alt="" /> */}
        </div>
        <div className="gameInfo bg-[#363F4E] px-2 py-2">
            <span className="gameName text-white line-clamp-1 text-sm">{data['Table Name']}</span>
        </div>
        {/* 如果有登入才出現 */}
        <div className="gameBalance flex justify-end gap-2 items-center bg-[#2B3240] px-2 py-1">
            <img className="h-[15px]" src={coinIcon} alt="" />
            <div className="balance">
                <span className="text-white text-sm font-bold">{`${data['Bet Limit']?.KRW.symbol} ${data['Bet Limit']?.KRW.min} - ${data['Bet Limit']?.KRW.max}`}</span>
            </div>
        </div>
    </div>
);

export default index;
