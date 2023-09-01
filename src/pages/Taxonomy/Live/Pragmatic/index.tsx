import React from 'react';
// import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { atom } from 'jotai';
// import GameType from '@/components/Layout/SearchBar/GameType';
// import GameCategory from '@/components/Layout/SearchBar/GameCategory';
// import Game from '@/components/Layout/Games/Game';
// import fakeGameData from './fakeGameData.json';

export const GameTypeAtom = atom('all');

const Pragmatic: React.FC = () => {
    // const GameTypeValue = useAtomValue(GameTypeAtom);
    const { t } = useTranslation();
    // const games =
    //     GameTypeValue !== 'all'
    //         ? fakeGameData.data.filter(
    //               (item) => item['Game Type'] === GameTypeValue,
    //           )
    //         : fakeGameData.data;
    return (
        <div className="w-full h-auto bg-[#F6F7F7] pb-20">
            <div className="h-20 bg-white" />
            <div className="w-full h-auto flex mx-auto flex-col items-center mt-[-2.5rem] mb-6 z-10 ">
                {/* <GameCategory Provider="pragmatic" /> */}
            </div>
            <div className="w-full h-auto flex mx-auto flex-col items-center  z-10 ">
                {/* <GameType /> */}
            </div>
            <div>
                <div className="FilterGames dropdown-menu w-full flex justify-center items-center mt-10">
                    <div className="w-[1360px] flex flex-col justify-center flex-wrap gap-4  py-5 px-10 ">
                        <div className="gamesCategoryInfo w-auto text-center">
                            <h3 className="gamesCategory mb-2">
                                Pragmatic {t('Live Casino')}
                            </h3>
                            <span className="gamesCategoryDes">
                                維護中，敬請期待！
                                {/* {games.length} {t('Games found')} */}
                            </span>
                        </div>
                        <div className="gamesWrap w-full">
                            <ul className="m-0 p-0 flex justify-start items-center flex-wrap gap-y-2.5">
                                {/* {games.map((item) => (
                                    <li
                                        key={nanoid()}
                                        className="w-[calc(100%/7)] flex flex-col justify-center items-center cursor-pointer "
                                    >
                                        <Game data={item} />
                                    </li>
                                ))} */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pragmatic;
