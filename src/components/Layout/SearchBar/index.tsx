import React from 'react';
import { atom } from 'jotai';
import SearchInput from './SearchInput';
import SearchDropdown from './SearchDropdown';
import GameCategory from './GameCategory';
import FilterGames from './FilterGames';

export const dropdownIsOpenAtom = atom(false);
export const FilterGamesIsOpenAtom = atom(false);

const SearchBar: React.FC = () => (
    <div className="w-full h-auto flex mx-auto flex-col items-center mt-[-2.5rem] z-10 ">
        <SearchInput />
        <SearchDropdown />
        <GameCategory />
        <FilterGames />
    </div>
);
export default SearchBar;
