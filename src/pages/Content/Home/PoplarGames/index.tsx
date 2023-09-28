import React from 'react';
import Tabs from './Tabs';
import { useGetPoplarGames } from '@/hooks/useGetPoplarGames';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';

const index: React.FC = () => {
    const { poplarGamesData, loading } = useGetPoplarGames();

    return (
        <div className="relative PoplarGames md:w-full mb-4 ">
            <div className="mx-4 rounded-2xl shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
                <div className="px-12 py-9 flex gap-9 items-center md:justify-start justify-center">
                    <img src={Icon_Main_Title} alt="" />
                    <span className="font-bold text-3xl text-[#9680EA] flex gap-4">
                        POPLAR<span className="text-black">GAMES</span>
                    </span>
                </div>
                {!loading ? 'isLoading' : <Tabs data={poplarGamesData} />}
            </div>
        </div>
    );
};

export default index;
