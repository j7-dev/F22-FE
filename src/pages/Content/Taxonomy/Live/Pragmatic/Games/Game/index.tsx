import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
// import coinIcon from '@/assets/images/coin-icon.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IsLoginAtom, popupIsOpenAtom } from '@/components/ContentLayout/Header/LoginModule';
import { useCustomMutation, useGetLocale, useGetIdentity } from '@refinedev/core';
import { API_URL } from '@/utils';
import { FaGamepad } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// import { useGetPPImg } from '@/hooks/gameProvider/pragmatic/useGetPPImg';

type GameProps = {
    data: {
        gameID?: string;
        gameImg?: string;
        gameName?: string;
    };
};

const index: React.FC<GameProps> = ({ data = {} }) => {
    const locale = useGetLocale();
    const currentLocale = locale();
    const { data: identity } = useGetIdentity<{ id: number }>();

    // console.log('game');
    const isLogin = useAtomValue(IsLoginAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const { mutate: openGame, isLoading: openGameLoading } = useCustomMutation();

    //TODO 這邊有一個功能待補=>如何在客戶登入後，再將客戶導回原本點擊的遊戲頁面並打開彈窗
    const handleClick = () => {
        if (!isLogin) {
            setPopupIsOpen(true);
            return;
        } else {
            openGame(
                {
                    url: `${API_URL}/api/pp/opengame?language=${currentLocale}&symbol=${data.gameID}&user_id=${identity?.id}`,
                    method: 'post',
                    values: {},
                },
                {
                    onSuccess: (entryData) => {
                        window.open(entryData.data.gameURL, '_blank');
                        // console.log('URL', entryData);
                    },
                    // onError: (error) => {
                    //     console.log('error', error);
                    // },
                },
            );
        }
    };
    return (
        <div className="gameWrap w-full relative">
            <div onClick={handleClick} className={`${openGameLoading ? 'opacity-100 bg-slate-600/50' : ''} z-10 cursor-pointer absolute inset-0 editOverlay w-full h-full duration-300 text-white opacity-0 hover:opacity-100 hover:bg-slate-600/50 flex justify-center items-center`}>
                {openGameLoading ? <AiOutlineLoading3Quarters className={`${openGameLoading ? 'block' : 'hidden'} animate-spin`} /> : <FaGamepad size={30} />}
            </div>
            <div className="gameImg w-full aspect-square relative align-top object-cover LazyLoadImage">
                <LazyLoadImage src={data.gameImg} width="100%" height="100%" />
            </div>
            <div className="gameInfo bg-[#363F4E] px-2 py-2">
                <span className="gameName text-white line-clamp-1 text-sm">{data['gameName']}</span>
            </div>
            {/* 如果有登入才出現 */}
            {/* <div className="gameBalance flex justify-end gap-2 items-center bg-[#2B3240] px-2 py-1">
                <img className="h-[15px]" src={coinIcon} alt="" />
                <div className="balance">
                    <span className="text-white text-sm font-bold">{`${data['Bet Limit']?.KRW.symbol} ${data['Bet Limit']?.KRW.min} - ${data['Bet Limit']?.KRW.max}`}</span>
                </div>
            </div> */}
        </div>
    );
};
export default index;
