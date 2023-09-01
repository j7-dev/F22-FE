import React, { useEffect } from 'react';
// import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
// import { useAtom, useSetAtom } from 'jotai';
// import {
//     GameTypeAtom,
//     GameCategoryStateAtom,
// } from '@/pages/Taxonomy/AtomSetting';
// import GameType from '@/components/Layout/SearchBar/GameType';
// import GameCategory from '@/components/Layout/SearchBar/GameCategory';
// import Game from '@/components/Layout/Games/Game';
// import fakeGameData from './fakeGameData.json';
import MaintainImg from '@/assets/images/Maintain.png';

const Evolution: React.FC = () => {
    const { t } = useTranslation();

    // const [
    //     GameTypeValue,
    //     setGameType,
    // ] = useAtom(GameTypeAtom);
    // const setGameCategoryState = useSetAtom(GameCategoryStateAtom);

    // const games =
    //     GameTypeValue !== 'all'
    //         ? fakeGameData.data.filter(
    //               (item) => item['Game Type'] === GameTypeValue,
    //           )
    //         : fakeGameData.data;

    useEffect(() => {
        // setGameType('all');
        // setGameCategoryState('live');
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full h-auto bg-[#F6F7F7] pb-20">
            <div className="h-20 bg-white" />
            <div className="w-full h-auto flex mx-auto flex-col items-center mt-[-2.5rem] mb-6 z-10 ">
                {/* <GameCategory Provider="evolution" /> */}
            </div>
            <div className="w-full h-auto flex mx-auto flex-col items-center  z-10 ">
                {/* <GameType /> */}
            </div>
            <div>
                <div className="FilterGames dropdown-menu w-full flex justify-center items-center mt-10">
                    <div className="w-[1360px] flex flex-col justify-center flex-wrap gap-4  py-5 px-10 ">
                        <div className="gamesCategoryInfo w-auto text-center">
                            <h3 className="gamesCategory mb-2">
                                Asia Gaming {t('Slot Game')}
                            </h3>
                            <img src={MaintainImg} alt="" className="m-auto" />
                            <span className="gamesCategoryDes">
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

export default Evolution;
