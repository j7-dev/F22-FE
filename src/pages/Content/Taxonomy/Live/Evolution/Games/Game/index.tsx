import React from 'react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { cloneDeep } from 'lodash';
import { useCustomMutation, useGetIdentity } from '@refinedev/core';
import { API_URL } from '@/utils';
import { IsLoginAtom, popupIsOpenAtom } from '@/components/ContentLayout/Header/LoginModule';
import { requestAtomType } from '@/types';
import coinIcon from '@/assets/images/coin-icon.png';
import { FaGamepad } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type GameProps = {
    data: {
        gameImg?: string;
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
};

export const configAtom = atom<requestAtomType>({
    uuid: '123456789',
    player: {
        id: '1',
        update: true,
        firstName: 'evo',
        lastName: 'test',
        country: 'KR',
        nickname: 'evo',
        language: 'ko',
        currency: 'KRW',
        session: {
            id: '3ede6595ccf746bab923457b1bb48784',
            ip: '192.168.0.1',
        },
    },
    config: {
        game: {
            category: '',
            interface: 'view1',
            table: {
                id: '',
            },
        },
        channel: {
            wrapped: false,
            mobile: false,
        },
    },
});
const index: React.FC<GameProps> = ({ data = {} }) => {
    // console.log('game');
    const isLogin = useAtomValue(IsLoginAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const [gameconfig, _setGameconfig] = useAtom(configAtom);
    const { data: identity } = useGetIdentity<{ id: number }>();
    const { mutate: openGame, isLoading: openGameLoading } = useCustomMutation();

    //TODO 這邊有一個功能待補=>如何在客戶登入後，再將客戶導回原本點擊的遊戲頁面並打開彈窗
    const handleClick = () => {
        if (!isLogin) {
            setPopupIsOpen(true);
            return;
        } else if (identity !== undefined) {
            const newGameConfig = cloneDeep(gameconfig);
            newGameConfig.config.game.category = data['Game Type'];
            newGameConfig.config.game.table.id = data['Table ID'] as string;
            newGameConfig.player.id = identity.id.toString();

            openGame(
                {
                    url: `${API_URL}/api/evo/opengame`,
                    method: 'post',
                    values: newGameConfig,
                },
                {
                    onSuccess: (entryData) => {
                        window.open(entryData.data.entry, '_blank');
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
                <LazyLoadImage src={data['gameImg'] as string} width="100%" height="100%" />
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
};
export default index;
