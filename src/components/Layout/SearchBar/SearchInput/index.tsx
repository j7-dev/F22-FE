import React from 'react';
import { useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { AiOutlineDown, AiOutlineSearch } from 'react-icons/ai';
import { dropdownIsOpenAtom } from '../index';

const SearchInput: React.FC = () => {
    const { t } = useTranslation();
    const setDropdownIsOpen = useSetAtom(dropdownIsOpenAtom);

    const handleClick = () => {
        setDropdownIsOpen((prevValue) => !prevValue);
        // console.log('dropdownIsOpenAtom', dropdownIsOpenAtom);
    };
    return (
        <div className="flex items-center justify-between flex-nowrap searchBar w-[630px] h-[65px] bg-white shadow-[0_0px_30px_0px_rgba(194,127,228,0.3)] border border-solid border-[#99BDE8] mb-10 rounded-xl overflow-hidden">
            <div
                className="providerSelect flex justify-between items-center p-5 w-[160px] cursor-pointer"
                onClick={handleClick}
            >
                <p className="providerTitle font-semibold">
                    {t('All Provider')}
                </p>
                <AiOutlineDown />
            </div>
            <div className="searchInputDiv py-5 w-[calc(100%-220px)]">
                <input
                    className="searchInput w-full h-full border-0 outline-0 text-sm font-semibold"
                    type="text"
                    placeholder="Search among 1,100 Games"
                />
            </div>
            <button className="flex justify-center items-center searchBtn w-[60px] h-full line border-0 text-2xl text-white bg-[#99BDE8]">
                <AiOutlineSearch />
            </button>
        </div>
    );
};

export default SearchInput;
