import React from 'react';
import { useAtomValue } from 'jotai';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { sidebarIsOpenAtom } from '@/components/ContentLayout/Sidebar';
import { fakeProviderData } from '@/pages/Content/Home/Provider/ProviderData';
import { ProviderPathAtom } from '@/pages/Content/Home/AtomSetting/index';

const index: React.FC = () => {
    const sidebarIsOpen = useAtomValue(sidebarIsOpenAtom);
    const ProviderPath = useAtomValue(ProviderPathAtom);
    const fakeGames = fakeProviderData;
    return (
        <ul className=" w-full bg-[#2e3135] text-white rounded-md py-4 px-4">
            {fakeGames.map((game) => (
                <Link to={game.ProviderPath + ProviderPath} key={nanoid()}>
                    <li className="py-4 border-0 border-b-[1px] border-solid border-[#485160] ">
                        <span className="flex items-center gap-x-3.5 text-sm hover:text-[#78D39D] text-white overflow-hidden">
                            <img
                                src={game.ProviderFavicon}
                                alt=""
                                className={`w-[30px] h-[30px] object-contain ${
                                    game.ProviderName === 'Micro Gaming'
                                        ? 'p-[1.5px]'
                                        : ''
                                }`}
                            />
                            <span
                                className={`${
                                    sidebarIsOpen ? 'w-full' : 'w-0'
                                }  whitespace-nowrap text-lg font-semibold tracking-wider`}
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
