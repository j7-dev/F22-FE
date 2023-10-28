import React from 'react';
import { TGame } from '@/types/games';
import { useOpenGame } from '@/hooks/gameProvider/useOpenGame';
import { AiOutlineLoading3Quarters, AiFillPlayCircle } from 'react-icons/ai';
import FavoriteIcon from '@/components/general/FavoriteIcon';

type SingleGameProp = {
    gameItem?: TGame;
};

const index: React.FC<SingleGameProp> = ({ gameItem }) => {
    //如果沒有遊戲資料則不渲染
    if (!gameItem) return <></>;

    //TODO 未來開啟遊戲方法搬出去取得遊戲的Hook
    //取得開啟遊戲方法
    const { isLoading: openGameLoading, handleClick: openGame } = useOpenGame();

    //上方列組件/收藏/大小注/RTP/遊戲商圖示
    const OnTheTop = (item: TGame) => {
        if (item.gameCategory === 'slot') {
            return (
                <div className="onTheTop flex justify-between items-center w-full">
                    <div className="wrap flex gap-1 items-center">
                        <FavoriteIcon item={item} />
                        {/* 有RTP率才顯示否則為空 */}
                        {/* 手機版不會顯示 */}
                        {item.gameRTP ? <div className="RTP hidden sm:block text-xs font-bold text-white bg-[#00000080] rounded-full py-1 px-2"> RTP ${item.gameRTP}</div> : ''}
                    </div>
                    <img className="provider w-5 sm:w-10" src={item.gameListFavIcon} alt="" />
                </div>
            );
        }
        if (item.gameCategory === 'casino') {
            //判斷是否為收藏遊戲
            return (
                <div className="onTheTop flex justify-between items-center w-full">
                    <div className="wrap flex gap-1 items-center">
                        <FavoriteIcon item={item} />
                        {/* 手機版不會顯示 */}
                        <div className="BetLimit hidden sm:block text-xs font-bold text-white bg-[#00000080] rounded-full py-1 px-2">{`$ ${item['Bet Limit']?.KRW.min?.toLocaleString()}-${item['Bet Limit']?.KRW.max?.toLocaleString()}`}</div>
                    </div>
                    <img className="provider w-5 sm:w-10" src={item.casinoCategoryIcon} alt="" />
                </div>
            );
        }
        return <></>;
    };
    //手機版RTP與大小注
    const MobileRTPAndBetLimit = (item: TGame) => {
        if (item.gameCategory === 'slot') {
            return (
                <>
                    {/* 有RTP率才顯示否則為空 */}
                    {item.gameRTP ? <div className="RTP text-[10px] font-bold text-white bg-[#00000080] rounded-full py-1 px-2"> RTP ${item.gameRTP}</div> : ''}
                </>
            );
        }
        if (item.gameCategory === 'casino') {
            //判斷是否為收藏遊戲
            return (
                <>
                    <div className="BetLimit text-[10px] font-bold text-white bg-[#00000080] rounded-full py-1 px-2">{`$ ${item['Bet Limit']?.KRW.min?.toLocaleString()}-${item['Bet Limit']?.KRW.max?.toLocaleString()}`}</div>
                </>
            );
        }
        return <></>;
    };

    const PlayGameBtn = () => {
        return (
            <div className="flex gap-2 items-center bg-white w-28 h-10 rounded-2xl border-2 border-[#5932EA] px-6 py-2 ">
                {openGameLoading ? <AiOutlineLoading3Quarters color="#5932EA" className={`block animate-spin`} /> : <AiFillPlayCircle color="#5932EA" />}
                <span className="font-bold text-base text-[#5932EA]">Play</span>
            </div>
        );
    };
    return (
        <div className="singleGame w-full h-full relative overflow-hidden rounded-2xl sm:shadow-none shadow-[0_4px_4px_0_#A370ED33] group">
            <div onClick={openGame(gameItem)} className={`editOverlay opacity-0 hover:opacity-100 hover:bg-slate-600/50 z-10 cursor-pointer absolute inset-0 w-full h-full duration-300 text-white  flex justify-center items-center`}>
                <PlayGameBtn />
            </div>
            <div className="onTheTopWrap z-20 absolute inset-0 w-full h-fit pt-1 sm:px-5 px-2.5">
                <OnTheTop {...gameItem} />
            </div>
            <div className="gameWrap w-full h-full relative">
                <img src={gameItem?.gameImg} alt="" className="aspect-square w-full h-full duration-500 group-hover:scale-125 object-cover" />
                <div className="gameInfo absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent via-50% to-[#1A1A1A80] flex flex-col items-start justify-end sm:px-5 py-2.5 px-2.5">
                    <div className="sm:hidden">
                        <MobileRTPAndBetLimit {...gameItem} />
                    </div>
                    <span className="gameName font-bold sm:text-xl text-sm text-white">{gameItem?.gameName}</span>
                </div>
            </div>
        </div>
    );
};

export default index;
