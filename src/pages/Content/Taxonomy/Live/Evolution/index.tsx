import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { useAtom, useSetAtom } from 'jotai';
import { GameTypeAtom, GameCategoryStateAtom } from '@/pages/Content/Taxonomy/AtomSetting';
import GameType from '@/components/ContentLayout/SearchBar/GameType';
import GameCategory from '@/components/ContentLayout/SearchBar/GameCategory';
import Game from '@/components/ContentLayout/Games/Game';
import { useRefineAPI } from './useRefineAPI';
import { gameTypeFilter } from '@/components/ContentLayout/Games/Game/GameImg';

export type extractedDataType = {
    [key: string]: string;
}[];

const Evolution: React.FC = () => {
    useEffect(() => {
        setGameType('all');
        setGameCategoryState('live');
        window.scrollTo(0, 0);
    }, []);

    const { t } = useTranslation();
    const { data, isLoading } = useRefineAPI();

    const extractedData: extractedDataType = data?.data['data'] || []; //指定如果沒有data的話就給空陣列不要是undefined
    const [GameTypeValue, setGameType] = useAtom(GameTypeAtom);
    const setGameCategoryState = useSetAtom(GameCategoryStateAtom);
    //排除rng-類別
    const games =
        GameTypeValue !== 'all'
            ? extractedData
                  // .filter((item) => item['Game Type'] === GameTypeValue)
                  .filter((item) => !item['Game Type'].startsWith('rng-'))
                  .filter((item) => gameTypeFilter[GameTypeValue].some((gameType) => item['Game Type'] === gameType))
            : extractedData.filter((item) => !item['Game Type'].startsWith('rng-'));

    //取得遊戲總分類=>單純測試用
    // let GameTypeArr: string[] = [];
    // extractedData.map((game) => {
    //     game['Game Type'];
    //     if (!GameTypeArr.includes(game['Game Type'])) {
    //         GameTypeArr = [...GameTypeArr, game['Game Type']];
    //     }
    // });

    return (
        <div className="w-full h-auto bg-[#F6F7F7] pb-20">
            <div className="h-20 bg-white" />
            <div className="w-full h-auto flex mx-auto flex-col items-center mt-[-2.5rem] mb-6 z-10 ">
                <GameCategory Provider="evolution" />
            </div>
            <div className="w-full h-auto flex mx-auto flex-col items-center z-10 ">
                <GameType />
            </div>
            <div>
                <div className="FilterGames dropdown-menu w-full flex justify-center items-center mt-10">
                    <div className="w-[1360px] flex flex-col justify-center flex-wrap gap-4  py-5 px-10 ">
                        <div className="gamesCategoryInfo w-auto text-center">
                            <h3 className="gamesCategory mb-2">Evolution {t('Live Casino')}</h3>
                            <span className="gamesCategoryDes">{isLoading === false && `${games.length} ${t('Games found')}`}</span>
                        </div>
                        {/* TODO 需要把它拆成組件才不會每次切換狀態都要重新渲染重打一次API */}
                        <div className="gamesWrap w-full">
                            <ul className="m-0 p-0 flex justify-start items-center flex-wrap gap-y-2.5">
                                {isLoading === false ? (
                                    games.map((item) => {
                                        return (
                                            <li key={nanoid()} className="w-1/2 flex flex-col justify-center items-center cursor-pointer md:w-[calc(100%/7)]">
                                                <Game data={item} />
                                            </li>
                                        );
                                    })
                                ) : (
                                    <div className="w-full text-center isloading">loading...</div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Evolution;
