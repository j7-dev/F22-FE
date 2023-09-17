import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { GameTypeAtom, GameCategoryStateAtom } from '@/pages/Content/Taxonomy/AtomSetting';
import GameType from '@/components/ContentLayout/GameType';
import GameCategory from '@/components/ContentLayout/GameCategory';
import Games from '@/components/ContentLayout/Games';
import { useGetPPTableList } from '@/hooks/useGetPPTableList';

const Evolution: React.FC = () => {
    const setGameType = useSetAtom(GameTypeAtom);
    const setGameCategoryState = useSetAtom(GameCategoryStateAtom);
    const { data, isLoading } = useGetPPTableList(); //TODO 為什麼在載入時會載呼叫多次API?
    // console.log('data', data);
    const extractedData = data?.data['gameList'] || []; //指定如果沒有data的話就給空陣列不要是undefined
    console.log('extractedData', extractedData);
    useEffect(() => {
        setGameType('all');
        setGameCategoryState('Live Casino');
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="w-full h-auto bg-[#F6F7F7] pb-20">
                <div className="h-20 bg-white" />
                <div className="w-full h-auto flex mx-auto flex-col items-center mt-[-2.5rem] mb-6 z-10 ">
                    <GameCategory Provider="pragmatic" />
                </div>
                <div className="w-full h-auto flex mx-auto flex-col items-center z-10 ">
                    <GameType />
                </div>
                <div>
                    <div className="FilterGames dropdown-menu w-full flex justify-center items-center mt-10">
                        <div className="w-[1360px] flex flex-col justify-center flex-wrap gap-4  py-5 px-10 ">
                            <Games ProviderName="Pragmatic Play" isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="w-full h-auto bg-[#F6F7F7] pb-20">
            <div className="h-20 bg-white" />
            <div className="w-full h-auto flex mx-auto flex-col items-center mt-[-2.5rem] mb-6 z-10 ">
                <GameCategory Provider="pragmatic" />
            </div>
            <div className="w-full h-auto flex mx-auto flex-col items-center  z-10 ">
                <GameType />
            </div>
            <div>
                <div className="FilterGames dropdown-menu w-full flex justify-center items-center mt-10">
                    <div className="w-[1360px] flex flex-col justify-center flex-wrap gap-4  py-5 px-10 ">
                        <div className="gamesCategoryInfo w-auto text-center">
                            <h3 className="gamesCategory mb-2">Pragmatic Play {t('Live Casino')}</h3>
                            <span className="gamesCategoryDes">
                                {games.length} {t('Games found')}
                            </span>
                        </div>
                        <div className="gamesWrap w-full">
                            <ul className="m-0 p-0 flex justify-start items-center flex-wrap gap-y-2.5">
                                {games.map((item) => {
                                    // TODO 目前是放假圖片

                                    return (
                                        <li key={nanoid()} className="w-[calc(100%/2)] flex flex-col justify-center items-center cursor-pointer md:w-[calc(100%/7)]">
                                            <Game data={item} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        </>
    );
};

export default Evolution;
