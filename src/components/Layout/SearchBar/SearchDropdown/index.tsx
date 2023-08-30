import React from 'react';
import { nanoid } from 'nanoid';
import { useAtom } from 'jotai';
import { dropdownIsOpenAtom, FilterGamesIsOpenAtom } from '../index';

const SearchDropdown: React.FC = () => {
    // const dropdownIsOpen = useAtomValue(dropdownIsOpenAtom);
    const [
        dropdownIsOpen,
        setdropdownIsOpen,
    ] = useAtom(dropdownIsOpenAtom);
    const [
        FilterGamesIsOpen,
        setFilterGamesIsOpen,
    ] = useAtom(FilterGamesIsOpenAtom);

    const handleClick = () => {
        setdropdownIsOpen(false);
        if (!FilterGamesIsOpen) {
            setFilterGamesIsOpen((prevValue) => !prevValue);
            // console.log('dropdownIsOpenAtom', dropdownIsOpenAtom);
        }
    };
    return (
        <div
            className={`${
                dropdownIsOpen ? 'block' : 'hidden'
            } dropdown-menu w-[725px] flex justify-start items-center flex-wrap bg-white p-5 gap-4 shadow-[0_7px_30px_0px_rgba(100,100,111,0.2)] absolute z-10 top-[8rem]`}
        >
            <ul className="m-0 p-0 flex justify-start items-center flex-wrap gap-[15px]">
                {new Array(7).fill(0).map(() => (
                    <li key={nanoid()} className="">
                        <button
                            className="w-[160px] h-[145px] flex flex-col justify-center items-center px-2.5 py-5 cursor-pointer border border-solid border-[#DADCE0] rounded-xl bg-transparent hover:border-[#99BDE8]"
                            onClick={handleClick}
                        >
                            1
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchDropdown;
