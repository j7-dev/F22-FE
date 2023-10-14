import React from 'react';
import { nanoid } from 'nanoid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TGame } from '@/types/games';
import { useOpenGame } from '@/hooks/gameProvider/useOpenGame';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaGamepad } from 'react-icons/fa';
import slot_favorite_icon from '@/assets/images/game_provider/slot_favorite_icon.svg';

type PragmaticGameData = {
    gameData?: TGame[];
};
const index: React.FC<PragmaticGameData> = ({ gameData = [] }) => {
    if (gameData.length === 0) return <div className="w-full text-center">no Data</div>;
    const { isLoading: openGameLoading, handleClick } = useOpenGame();

    const OnTheTop = (item: TGame) => {
        if (item.gameCategory === 'slot') {
            return (
                <div className="onTheTop flex justify-between items-center w-full">
                    <div className="wrap flex gap-1 items-center">
                        <div className="favorite w-[30px] aspect-square bg-[#00000080] rounded-full p-1">
                            <img src={slot_favorite_icon} alt="" className="w-full" />
                        </div>
                        <div className="RTP text-xs font-bold text-white bg-[#00000080] rounded-full py-1 px-2">{`RTP 96%`}</div>
                    </div>
                    <img className="provider" src={item.gameListFavIcon} alt="" />
                </div>
            );
        }
        if (item.gameCategory === 'casino') {
            return (
                <div className="onTheTop flex justify-between items-center w-full">
                    <div className="wrap flex gap-1 items-center">
                        <div className="favorite w-[30px] aspect-square bg-[#00000080] rounded-full p-1">
                            <img src={slot_favorite_icon} alt="" className="w-full" />
                        </div>
                        <div className="RTP text-xs font-bold text-white bg-[#00000080] rounded-full py-1 px-2">{`$ ${item['Bet Limit']?.KRW.min?.toLocaleString()}-${item['Bet Limit']?.KRW.max?.toLocaleString()}`}</div>
                    </div>
                    <img className="provider" src={item.casinoCategoryIcon} alt="" />
                </div>
            );
        }
    };
    return (
        <div className="gameList grid sm:grid-cols-11 sm:px-0 px-4 ">
            <div className="col-span-9 col-start-2 grid grid-cols-1 gap-2 sm:grid-cols-4">
                {gameData.map((item) => {
                    return (
                        <div key={nanoid()} onClick={handleClick(item)} className="singleGame w-full h-full relative overflow-hidden rounded-2xl sm:shadow-none shadow-[0_4px_4px_0_#A370ED33]">
                            <div className={`editOverlay z-10 cursor-pointer absolute inset-0  w-full h-full duration-300 text-white opacity-0 hover:opacity-100 hover:bg-slate-600/50 flex justify-center items-center`}>{openGameLoading ? <AiOutlineLoading3Quarters className={`${openGameLoading ? 'block' : 'hidden'} animate-spin`} /> : <FaGamepad size={30} />}</div>
                            <div className="gameWrap w-full relative">
                                <LazyLoadImage src={item?.gameImg} alt="" className="sm:aspect-square w-full h-full duration-500 hover:scale-125 aspect-[342/120] object-cover" />
                                <div className="gameInfo absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent via-50% to-[#1A1A1A80] flex flex-col items-start justify-between px-5 py-2.5">
                                    <OnTheTop {...item} />
                                    <span className="gameName font-bold text-xl text-white">{item?.gameName}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default index;
