import React from 'react';
import { useAtomValue } from 'jotai';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import Game from './Game';
import { GameCategoryStateAtom } from '@/pages/Content/Taxonomy/AtomSetting';
// import { gameTypeFilter } from '@/components/ContentLayout/Games/Game/GameImg';

export type GamesDataProp = {
    ProviderName: string;
    gamesData?: [];
    isLoading: boolean;
};
const Games: React.FC<GamesDataProp> = ({ ProviderName, gamesData = [], isLoading }) => {
    // const _GameTypeValue = useAtomValue(GameTypeAtom);
    // console.log('⭐  _GameTypeValue', _GameTypeValue);
    const GameCategoryState = useAtomValue(GameCategoryStateAtom);
    const { t } = useTranslation();

    const gamesList = gamesData;
    return (
        <>
            <div className="gamesCategoryInfo w-auto text-center">
                <h3 className="gamesCategory mb-2">
                    {ProviderName} {t(GameCategoryState)}
                </h3>
                <span className="gamesCategoryDes">{isLoading === false && `${gamesList.length} ${t('Games found')}`}</span>
            </div>
            <div className="gamesWrap w-full">
                <ul className="m-0 p-0 grid md:grid-cols-6 gap-1.5 grid-cols-2">
                    {isLoading === false ? (
                        gamesList.map((item) => {
                            return (
                                <li key={nanoid()} className="flex flex-col justify-center items-center">
                                    <Game data={item} />
                                </li>
                            );
                        })
                    ) : (
                        <div className="w-full text-center isloading">loading...</div>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Games;
