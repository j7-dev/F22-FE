import React from 'react';
import { nanoid } from 'nanoid';
import { TGame } from '@/types/games';
import { useOpenGame } from '@/hooks/gameProvider/useOpenGame';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaGamepad } from 'react-icons/fa';

type PragmaticGameData = {
    gameData?: TGame[];
};
const index: React.FC<PragmaticGameData> = ({ gameData = [] }) => {
    // const { gameData } = props || [];
    if (gameData.length === 0) return <div className="w-full text-center">no Data</div>;
    const { isLoading: openGameLoading, handleClick } = useOpenGame();

    return (
        <div className="grid sm:grid-cols-11 sm:px-0 px-4 ">
            <div className="col-span-9 col-start-2 grid grid-cols-1 gap-2 sm:grid-cols-6 sm:gap-2 ">
                {gameData.map((item) => {
                    return (
                        <div key={nanoid()} onClick={handleClick(item)} className="w-full h-full relative overflow-hidden rounded-2xl sm:shadow-none shadow-[0_4px_4px_0_#A370ED33]">
                            <div className={`z-10 cursor-pointer absolute inset-0 editOverlay w-full h-full duration-300 text-white opacity-0 hover:opacity-100 hover:bg-slate-600/50 flex justify-center items-center`}>{openGameLoading ? <AiOutlineLoading3Quarters className={`${openGameLoading ? 'block' : 'hidden'} animate-spin`} /> : <FaGamepad size={30} />}</div>
                            <div className="w-full">
                                <img src={item?.gameImg} alt="" className="sm:aspect-square w-full h-full duration-500 hover:scale-125 aspect-[342/120] object-cover" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default index;
