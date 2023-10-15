import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TGame } from '@/types/games';
import { useOpenGame } from '@/hooks/gameProvider/useOpenGame';
import { useSetFavorite } from '@/hooks/useSetFavorite';
import { useIsFavorite } from '@/hooks/useIsFavorite';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaGamepad } from 'react-icons/fa';

type SingleGameProp = {
    gameItem: TGame;
};

const index: React.FC<SingleGameProp> = ({ gameItem }) => {
    //TODO 未來是否搬出去最外層組件
    //判斷遊戲是否為收藏遊戲
    const fxnGameItem = {
        ...gameItem,
        isFavorite: useIsFavorite(gameItem),
    };
    //取得收藏遊戲方法
    const { isLoading: favoriteLoading, handleClick: setFavorite } = useSetFavorite();
    //取得開啟遊戲方法
    const { isLoading: openGameLoading, handleClick } = useOpenGame();

    //上方列組件/收藏/大小注/RTP/遊戲商圖示
    const OnTheTop = (item: TGame) => {
        if (item.gameCategory === 'slot') {
            return (
                <div className="onTheTop flex justify-between items-center w-full">
                    <div className="wrap flex gap-1 items-center">
                        <div onClick={setFavorite(item)} className={`favorite cursor-pointer w-[30px] aspect-square bg-[#00000080] rounded-full p-1`}>
                            <div className={`${item.isFavorite ? 'active' : ''} favoriteIcon w-full h-full`} />
                        </div>
                        <div className="RTP text-xs font-bold text-white bg-[#00000080] rounded-full py-1 px-2">{`RTP 96%`}</div>
                    </div>
                    <img className="provider" src={item.gameListFavIcon} alt="" />
                </div>
            );
        }
        if (item.gameCategory === 'casino') {
            //判斷是否為收藏遊戲
            return (
                <div className="onTheTop flex justify-between items-center w-full">
                    <div className="wrap flex gap-1 items-center">
                        <div onClick={setFavorite(item)} className={`favorite cursor-pointer w-[30px] aspect-square bg-[#00000080] rounded-full p-1`}>
                            <div className={`${item.isFavorite ? 'active' : ''} favoriteIcon w-full h-full`}>
                                <AiOutlineLoading3Quarters className={`${favoriteLoading ? 'block' : 'hidden'} animate-spin`} />
                            </div>
                        </div>
                        <div className="RTP text-xs font-bold text-white bg-[#00000080] rounded-full py-1 px-2">{`$ ${item['Bet Limit']?.KRW.min?.toLocaleString()}-${item['Bet Limit']?.KRW.max?.toLocaleString()}`}</div>
                    </div>
                    <img className="provider" src={item.casinoCategoryIcon} alt="" />
                </div>
            );
        }
        return '';
    };

    return (
        <div onClick={handleClick(gameItem)} className="singleGame w-full h-full relative overflow-hidden rounded-2xl sm:shadow-none shadow-[0_4px_4px_0_#A370ED33]">
            <div className={`editOverlay z-10 cursor-pointer absolute inset-0 w-full h-full duration-300 text-white opacity-0 hover:opacity-100 hover:bg-slate-600/50 flex justify-center items-center`}>{openGameLoading ? <AiOutlineLoading3Quarters className={`${openGameLoading ? 'block' : 'hidden'} animate-spin`} /> : <FaGamepad size={30} />}</div>
            <div className="onTheTopWrap z-20 absolute inset-0 w-full h-fit px-5">
                <OnTheTop {...fxnGameItem} />
            </div>
            <div className="gameWrap w-full relative">
                <LazyLoadImage src={gameItem?.gameImg} alt="" className="sm:aspect-square w-full h-full duration-500 hover:scale-125 aspect-[342/120] object-cover" />
                <div className="gameInfo absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent via-50% to-[#1A1A1A80] flex items-end  px-5 py-2.5">
                    <span className="gameName font-bold text-xl text-white">{gameItem?.gameName}</span>
                </div>
            </div>
        </div>
    );
};

export default index;
