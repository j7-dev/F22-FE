import React from 'react';
import Tabs from './Tabs';
import { useGetPopularGames } from '@/hooks/gameProvider/useGetPopularGames';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
// import { TPopularGame } from '@/types/resources/popularGames';
// import { nanoid } from 'nanoid';

const index: React.FC = () => {
    const { PopularGamesData, loading } = useGetPopularGames();
    console.log('PopularGamesData', PopularGamesData);
    // const allGames = PopularGamesData[0].gameData;
    // console.log('allGames', allGames);

    // const SingleCase = (SingleCaseProps: { allGames: TPopularGame[] }) => {
    // 	const { allGames } = SingleCaseProps;
    // 	return allGames.map((item: TPopularGame) => {
    // 		<div className="h-full w-full col-span-3" key={nanoid()}>
    // 				<a>
    // 						<div className="overflow-hidden w-full rounded-2xl">
    // 								<img src={item?.gameImg} alt="" className="w-full h-full duration-500 hover:scale-125 aspect-[1/1] object-cover" />
    // 						</div>
    // 				</a>
    // 		</div>;
    // })
    return (
        <div className="relative PopularGames md:w-full">
            <div className="mx-4 rounded-2xl shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
                <div className="grid grid-cols-11 gap-4 py-9">
                    <div className="col-span-1 flex justify-center">
                        <img src={Icon_Main_Title} alt="" className="" />
                    </div>
                    <span className="col-span-1 font-bold text-3xl text-[#9680EA] -ml-3">
                        POPULAR
                        {/* <span className="text-black">GAMES</span> */}
                    </span>
                </div>
                <div className="popularGamesContain py-9">
                    {/* <div className="col-start-1"></div> */}
                    {!loading ? 'isLoading' : <Tabs data={PopularGamesData} />}
                </div>
            </div>
        </div>
    );
};

export default index;
