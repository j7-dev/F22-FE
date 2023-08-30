import React from 'react';
import { nanoid } from 'nanoid';
import Game from './Game';
import gameImg from '@/assets/images/messageImage_1693412354632.jpg';

const Games: React.FC = () => {
    const fakeGames = [
        { title: 'Game1', imgSrc: gameImg },
        { title: 'Game2', imgSrc: gameImg },
        { title: 'Game3', imgSrc: gameImg },
        { title: 'Game4', imgSrc: gameImg },
        { title: 'Game5', imgSrc: gameImg },
        { title: 'Game6', imgSrc: gameImg },
    ];

    return (
        <div className="my-20 max-w-3xl mx-auto ">
            <div className="gameHeader flex flex-row justify-between my-2">
                <span className="gameTaxonomyTitle text-base tracking-wide font-bold ">
                    Top Games
                </span>
                <span className="gameLink text-[#357ACB] text-sm tracking-wide">
                    View All
                </span>
            </div>
            <div className="flex gap-2.5 flex-wrap ">
                {fakeGames.map(() => (
                    <div key={nanoid()} className="w-[calc(50%-5px)]">
                        <Game key={nanoid()} />
                    </div>
                ))}
            </div>
        </div>
        // 	<div className="gamesWrap max-w-7xl relative flex flex-row  mx-auto gap-2">
        //     {new Array(7).fill(0).map(() => (
        //         <Game />
        //     ))}
        // </div>
    );
};

export default Games;
