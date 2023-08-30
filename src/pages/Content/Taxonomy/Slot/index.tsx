import React from 'react';
import { nanoid } from 'nanoid';
import SearchBar from '@/components/Layout/SearchBar';
import Game from '@/components/Layout/Games/Game';

const Slot: React.FC = () => (
    <div className="w-full h-auto bg-[#F6F7F7] pb-20">
        <div className="h-20 bg-white" />
        <div className="h-auto">
            <SearchBar />
        </div>
        <div>
            <div className="FilterGames dropdown-menu w-full flex justify-center items-center mt-10">
                <div className="w-[1360px] flex flex-col justify-center flex-wrap gap-4  py-5 px-10 ">
                    <div className="gamesCategoryInfo w-auto text-center">
                        <h3 className="gamesCategory mb-2">Slot Casino</h3>
                        <span className="gamesCategoryDes">
                            242 Games found
                        </span>
                    </div>
                    <div className="gamesWrap">
                        <ul className="m-0 p-0 flex justify-start items-center flex-wrap gap-y-2.5">
                            {new Array(21).fill(0).map(() => (
                                <li
                                    key={nanoid()}
                                    className="w-[calc(100%/7)] flex flex-col justify-center items-center cursor-pointer "
                                >
                                    <Game />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Slot;
