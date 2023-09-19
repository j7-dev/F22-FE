import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { GameTypeAtom, GameCategoryStateAtom } from '@/pages/Content/Taxonomy/AtomSetting';
import GameType from '@/components/ContentLayout/GameType';
import GameCategory from '@/components/ContentLayout/GameCategory';
import Games from '@/components/ContentLayout/Games';
import { useGetPPTableList } from '@/hooks/useGetPPTableList';

const Pragmatic: React.FC = () => {
    const setGameType = useSetAtom(GameTypeAtom);
    const setGameCategoryState = useSetAtom(GameCategoryStateAtom);
    const { data, isLoading } = useGetPPTableList();
    const extractedData = data?.data['gameList'] || [];
    const newData = extractedData;
    // console.log('extractedData', extractedData);
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
                        <div className="w-[1360px] flex flex-col justify-center flex-wrap gap-4  py-5 md:px-10 px-4">
                            <Games ProviderName="Pragmatic Play" gamesData={newData} isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pragmatic;
