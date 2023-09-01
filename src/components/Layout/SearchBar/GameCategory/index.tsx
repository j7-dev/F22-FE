import React from 'react';
import { nanoid } from 'nanoid';
import { useSetAtom } from 'jotai';
import { FilterGamesIsOpenAtom } from '../index';
import blackjackIcon from '@/assets/images/blackjack-icon.png';

const GameCategory: React.FC = () => {
    const setFilterGamesIsOpen = useSetAtom(FilterGamesIsOpenAtom);

    const handleClick = () => {
        setFilterGamesIsOpen(true);
    };
    return (
        <div className="w-full gameCategory">
            <div className="grid grid-cols-8 max-w-5xl mx-auto">
                {new Array(8).fill(0).map(() => (
                    <div
                        key={nanoid()}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={handleClick}
                    >
                        <img src={blackjackIcon} alt="" />
                        <span>Baccarat</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default GameCategory;
