import React from 'react';
import { TGame } from '@/types/games';
import { useOpenGame } from '@/hooks/gameProvider/useOpenGame';
import { AiOutlineLoading3Quarters, AiFillPlayCircle } from 'react-icons/ai';
import FavoriteIcon from '@/components/general/FavoriteIcon';
import { useGetDepositBonus } from '@/hooks/resources/useGetDepositBonus';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useGetSiteSetting } from '@/hooks';

type SingleGameProp = {
    gameItem?: TGame;
};

const index: React.FC<SingleGameProp> = ({ gameItem }) => {
    //如果沒有遊戲資料則不渲染
    if (!gameItem) return <></>;

    //當前遊戲是否能玩=>1.沒有限制 或 2.有限制但包含當前遊戲類別
    const { allowGameCategories } = useGetDepositBonus();
    const isCanPlay = allowGameCategories === null || allowGameCategories?.includes(gameItem.gameCategory as string);
    const { default_currency } = useGetSiteSetting();
    const symbol = getSymbolFromCurrency(default_currency.toUpperCase());

    //取得開啟遊戲方法
    const { handleClick: openGame, isLoading: openGameLoading } = useOpenGame();
    //上方列組件/收藏/大小注/RTP/遊戲商圖示
    const OnTheTop = (item: TGame) => {
        if (item.gameCategory === 'slot') {
            return (
                <div className="onTheTop flex justify-between items-center w-full">
                    <div className="wrap flex gap-1 items-center">
                        <FavoriteIcon item={item} />
                        {/* 有RTP率才顯示否則為空 */}
                        {/* 手機版不會顯示 */}
                        {item.gameRTP ? <div className="RTP hidden md:block text-xs font-bold text-white bg-[#00000080] rounded-full py-1 px-2"> RTP {(symbol as string) + item.gameRTP}</div> : ''}
                    </div>
                    <img className="provider object-contain h-[20px] md:h-[30px]" src={item.gameListFavIcon} alt="" />
                </div>
            );
        }
        if (item.gameCategory === 'casino') {
            //判斷是否為收藏遊戲
            //自訂baccarat大小注
            const maxBet = item.casinoCategory === 'baccarat' ? '10,000,000' : (item?.['Bet Limit']?.KRW?.max || 0)?.toLocaleString();
            return (
                <div className="onTheTop flex justify-between items-center w-full">
                    <div className="wrap flex gap-1 items-center">
                        <FavoriteIcon item={item} />
                        {/* 有大小注才顯示否則為空 */}
                        {/* 手機版不會顯示 */}
                        {item['Bet Limit'] ? <div className="BetLimit hidden md:block text-xs font-bold text-white bg-[#00000080] rounded-full py-1 px-2">{`${(symbol as string) + (item?.['Bet Limit']?.KRW?.min || 0)?.toLocaleString()}-${maxBet}`}</div> : ''}
                    </div>
                    <img className="provider object-contain h-[20px] md:h-[30px]" src={item.casinoCategoryIcon} alt="" />
                </div>
            );
        }
        return (
            <div className="onTheTop flex justify-between items-center w-full">
                <div className="wrap flex gap-1 items-center">
                    <FavoriteIcon item={item} />
                </div>
                <img className="provider object-contain h-[20px] md:h-[30px]" src={item.casinoCategoryIcon} alt="" />
            </div>
        );
    };
    //手機版RTP與大小注
    const MobileRTPAndBetLimit = (item: TGame) => {
        if (item.gameCategory === 'slot') {
            return (
                <>
                    {/* 有RTP率才顯示否則為空 */}
                    {item.gameRTP ? <div className="RTP text-[10px] font-bold text-white bg-[#00000080] rounded-full py-1 px-2"> RTP {(symbol as string) + item.gameRTP}</div> : ''}
                </>
            );
        }
        if (item.gameCategory === 'casino') {
            //判斷是否為收藏遊戲
            //自訂baccarat大小注
            const maxBet = item.casinoCategory === 'baccarat' ? '10,000,000' : (item?.['Bet Limit']?.KRW?.max || 0)?.toLocaleString();
            return (
                <>
                    {/* 有大小注才顯示否則為空 */}
                    {item['Bet Limit'] ? <div className="BetLimit text-[10px] font-bold text-white bg-[#00000080] rounded-full py-1 px-2">{`${(symbol as string) + item['Bet Limit']?.KRW.min?.toLocaleString()}-${maxBet}`}</div> : ''}
                </>
            );
        }
        return <></>;
    };

    //開啟遊戲組件
    const PlayGameBtn = () => {
        //如果allowGameCategories存在(!=null)且不包含遊戲類別則顯示不能玩
        if (!isCanPlay) {
            return (
                <div className="flex gap-2 justify-center items-center bg-white md:w-fit w-full h-fit md:rounded-2xl border-2 border-[#5932EA] md:px-6">
                    <span className="text-center p-2 font-bold text-base text-[red]">
                        신청한 보너스 타입
                        <br />
                        게임 아님
                    </span>
                </div>
            );
        }
        return (
            <div className="flex gap-2 items-center bg-white w-fit h-10 rounded-2xl border-2 border-[#5932EA] px-6 py-2 ">
                {openGameLoading ? <AiOutlineLoading3Quarters color="#5932EA" className={`block animate-spin`} /> : <AiFillPlayCircle color="#5932EA" />}
                <span className="font-bold text-base text-[#5932EA]">Play</span>
            </div>
        );
    };
    return (
        <div className="singleGame  w-full h-full aspect-square relative overflow-hidden rounded-2xl md:shadow-none shadow-[0_4px_4px_0_#A370ED33] group">
            <div
                onClick={
                    isCanPlay
                        ? openGame(gameItem)
                        : () => {
                              console.log("not can't play");
                          }
                }
                className={`editOverlay opacity-0 hover:opacity-100 hover:bg-slate-600/50 z-10 cursor-pointer absolute inset-0 w-full h-full duration-300 text-white  flex justify-center items-center`}
            >
                <PlayGameBtn />
            </div>
            <div className="onTheTopWrap z-20 absolute inset-0 w-full h-fit p-2.5">
                <OnTheTop {...gameItem} />
            </div>
            <div className="gameWrap w-full h-full relative ">
                <img src={gameItem?.gameImg} alt="" className="aspect-square w-full h-full duration-500 group-hover:scale-125 object-cover" />
                <div className="imgOverlay absolute top-0 w-full h-full bg-gradient-to-tr from-transparent via-transparent via-70% to-[#4D28EA]" />
                <div className="gameInfo absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent via-50% to-[#1A1A1A80] flex flex-col items-start justify-end md:px-5 py-2.5 px-2.5">
                    <div className="md:hidden">
                        <MobileRTPAndBetLimit {...gameItem} />
                    </div>
                    <span className="gameName font-bold md:text-xl text-sm text-white">{gameItem?.gameName}</span>
                </div>
            </div>
        </div>
    );
};

export default index;
