import React from 'react';
import { useAtomValue } from 'jotai';
import { nanoid } from 'nanoid';
import { sidebarIsOpenAtom } from '@/components/Layout/Sidebar';
import creaditImg from '@/assets/images/credit-icon-hover.svg';

const index: React.FC = () => {
    const sidebarIsOpen = useAtomValue(sidebarIsOpenAtom);
    const fakeGames = [
        { title: 'Game1', imgSrc: creaditImg },
        { title: 'Game2', imgSrc: creaditImg },
        { title: 'Game3', imgSrc: creaditImg },
        { title: 'Game4', imgSrc: creaditImg },
        { title: 'Game5', imgSrc: creaditImg },
        { title: 'Game6', imgSrc: creaditImg },
    ];
    return (
        <ul className=" w-full bg-[#2e3135] text-white rounded-md py-4 px-4">
            {fakeGames.map((game) => (
                <li
                    key={nanoid()}
                    className="py-4 border-0 border-b-[1px] border-solid border-[#485160] "
                >
                    <span className="flex items-center gap-x-3.5 text-sm hover:text-[#78D39D] text-white dark:bg-gray-900 dark:text-white">
                        <img src={game.imgSrc} alt="" />
                        <span
                            className={`${
                                sidebarIsOpen ? 'block' : 'hidden'
                            } text-lg font-semibold tracking-wider`}
                        >
                            {game.title}
                        </span>
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default index;
