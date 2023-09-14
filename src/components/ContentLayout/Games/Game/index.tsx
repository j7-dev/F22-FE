import React from 'react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { getGameTypeImg } from '@/components/ContentLayout/Games/Game/GameImg/';
import coinIcon from '@/assets/images/coin-icon.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { getFakeImg } from '@/pages/Content/Taxonomy/Live/Evolution/fakeGameData';
import { IsLoginAtom, popupIsOpenAtom } from '@/components/ContentLayout/LoginModule';
import { cloneDeep } from 'lodash';
import { requestAtomType } from '@/types';

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

export const configAtom = atom<requestAtomType>({
    uuid: '123456789',
    player: {
        id: '1',
        updata: true,
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
    const isLogin = useAtomValue(IsLoginAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const [gameconfig, setGameconfig] = useAtom(configAtom);

    //TODO 這邊有一個功能待補=>如何在客戶登入後，再將客戶導回原本點擊的遊戲頁面並打開彈窗
    const handleClick = () => {
        if (!isLogin) {
            setPopupIsOpen(true);
            return;
        } else {
            const newGameConfig = cloneDeep(gameconfig);
            newGameConfig.config.game.category = data['Game Type'];
            newGameConfig.config.game.table.id = data['Table ID'] as string;
            setGameconfig(newGameConfig);
            console.log('newGameConfig', newGameConfig);
            // 指定外部网站的URL
            const externalWebsiteUrl = 'https://v88wl.uat1.evo-test.com/frontend/evo/r1/index.coop.html#provider=evolution&ua_launch_id=178473e948bbf87ca35d4a16&game=blackjack&table_id=k4r2hyhw4eqqb6us&app=';
            // 使用 window.open() 打开外部网站
            window.open(externalWebsiteUrl, '_blank');
            //TODO 會話會過期
        }
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
