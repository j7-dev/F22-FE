import React from 'react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { getGameTypeImg } from '@/components/ContentLayout/Games/Game/GameImg/';
import coinIcon from '@/assets/images/coin-icon.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { getFakeImg } from '@/pages/Content/Taxonomy/Live/Evolution/fakeGameData';
import { IsLoginAtom, popupIsOpenAtom } from '@/components/ContentLayout/LoginModule';
import { gamepopupIsOpenAtom } from '@/components/ContentLayout/Games/Game/Popup';
import { cloneDeep } from 'lodash';

type GameProps = {
    data: {
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
export type configAtomType = {
    config: {
        game: {
            category?: string;
            interface?: string;
            table: {
                id: string;
            };
        };
        channel: {
            wrapped: boolean;
            mobile?: boolean;
        };
    };
};
export const configAtom = atom<configAtomType>({
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
    const isLogin = useAtomValue(IsLoginAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const setGamepopupIsOpen = useSetAtom(gamepopupIsOpenAtom);
    const [gameconfig, setGameconfig] = useAtom(configAtom);

    //TODO 這邊有一個功能待補=>如何在客戶登入後，再將客戶導回原本點擊的遊戲頁面並打開彈窗
    const handleClick = () => {
        const newGameConfig = cloneDeep(gameconfig);
        newGameConfig.config.game.category = data['Game Type'];
        newGameConfig.config.game.table.id = data['Table ID'] as string;
        setGameconfig(newGameConfig);
        !isLogin ? setPopupIsOpen(true) : setGamepopupIsOpen(true);
    };
    return (
        <div className="gameWrap w-full px-1" onClick={handleClick}>
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
};
export default index;
