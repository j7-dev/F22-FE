import React from 'react';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { GrFormClose } from 'react-icons/gr';
import { FilterGamesIsOpenAtom } from '../index';
import Game from '../../Games/Game';

const FilterGames: React.FC = () => {
    const [
        FilterGamesIsOpen,
        setFilterGamesIsOpen,
    ] = useAtom(FilterGamesIsOpenAtom);
    const handleClick = () => {
        setFilterGamesIsOpen(false);
    };
    return (
        <div
            className={`FilterGames ${
                FilterGamesIsOpen ? 'block' : 'hidden'
            } dropdown-menu w-full flex justify-center items-center mt-10`}
        >
            <div className="w-[1360px] flex flex-col justify-center flex-wrap gap-4 bg-white py-5 px-10 shadow-[0_7px_30px_0px_rgba(100,100,111,0.2)]">
                <div
                    className="closeBtn absolute right-10 top-5 z-10 cursor-pointer w-10 h-10 flex justify-center items-center text-2xl bg-[#F6F7F7] hover:bg-[#e5e5e5]"
                    onClick={handleClick}
                >
                    <GrFormClose size={40} />
                </div>
                <div className="gamesCategoryInfo w-auto text-center">
                    <h3 className="gamesCategory mb-2">
                        All Games (Evolution)
                    </h3>
                    <span className="gamesCategoryDes">242 Games found</span>
                </div>
                <div className="gamesWrap">
                    <ul className="m-0 p-0 flex justify-start items-center flex-wrap gap-y-2.5">
                        {new Array(10).fill(0).map(() => (
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
    );
};
export default FilterGames;
