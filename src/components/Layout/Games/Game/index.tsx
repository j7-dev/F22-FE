import React from 'react';
import fakeGameImg from '@/assets/images/fakeGameImg.jpg';
import wallet1058 from '@/assets/images/wallet-1058.svg';
import tooltipIcon from '@/assets/images/tooltip-icon.svg';
import coinIcon from '@/assets/images/coin-icon.png';

const index: React.FC = () => (
    <div className="gameWrap w-full px-1">
        <div className="gameImg w-full aspect-square relative">
            <img
                className="w-full aspect-square align-top"
                src={fakeGameImg}
                alt=""
            />
        </div>
        <div className="gameInfo bg-[#363F4E] px-2 py-2">
            <div className="games-provider flex justify-between">
                <img className="gamePlatform" src={wallet1058} alt="" />
                <img className="tooltip-img" src={tooltipIcon} alt="" />
            </div>
            <span className="gameName text-white line-clamp-1 mt-2 text-sm">
                Japanese Speed Baccarat A
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
