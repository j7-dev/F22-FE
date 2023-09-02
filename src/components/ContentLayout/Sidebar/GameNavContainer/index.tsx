import React from 'react';
import { useAtomValue } from 'jotai';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { sidebarIsOpenAtom } from '@/components/ContentLayout/Sidebar';
import { fakeProviderData } from '@/pages/Content/Home/Provider/ProviderData';

const index: React.FC = () => {
    const sidebarIsOpen = useAtomValue(sidebarIsOpenAtom);
    const fakeGames = fakeProviderData;
    return (
        <ul className=" w-full bg-[#2e3135] text-white rounded-md py-4 px-4">
            {fakeGames.map((game) => (
                <Link to={game.ProviderPath} key={nanoid()}>
                    <li className="py-4 border-0 border-b-[1px] border-solid border-[#485160] ">
                        <span className="flex items-center gap-x-3.5 text-sm hover:text-[#78D39D] text-white dark:bg-gray-900 dark:text-white">
                            <img
                                src={game.ProviderFavicon}
                                alt=""
                                className="w-[30px] h-[30px] object-contain"
                            />
                            <span
                                className={`${
                                    sidebarIsOpen ? 'block' : 'hidden'
                                } text-lg font-semibold tracking-wider`}
                            >
                                {game.ProviderName}
                            </span>
                        </span>
                    </li>
                </Link>
            ))}
        </ul>
    );
};

export default index;
