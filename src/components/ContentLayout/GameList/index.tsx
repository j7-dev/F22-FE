import React from 'react';
import { TGame } from '@/types/games';
import SingleGame from './SingleGame';

type GameListProp = {
    gameData?: TGame[];
};
const index: React.FC<GameListProp> = ({ gameData = [] }) => {
    if (gameData.length === 0) return <div className="w-full text-center">no Data</div>;

    return (
        <div className="gameList grid sm:grid-cols-11 sm:px-0 px-4 ">
            <div className="col-span-9 col-start-2 grid grid-cols-1 gap-2 sm:grid-cols-4">
                {gameData.map((item) => {
                    return <SingleGame gameItem={item} />;
                })}
            </div>
        </div>
    );
};

export default index;
