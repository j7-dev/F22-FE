import React from 'react';
import { useAtomValue } from 'jotai';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { sidebarIsOpenAtom } from '@/components/Layout/Sidebar';
// TODO 找時間解決他
import pragmaticplayFavicon from '@/assets/images/pragmaticplay_favicon.ico';
import evolutionFavicon from '@/assets/images/evolution_favicon.png';
import golfFavicon from '@/assets/images/golf_favicon.ico';
import btiFavicon from '@/assets/images/bti_favicon.ico';
import mgFavicon from '@/assets/images/mg_favicon.png';
import agFavicon from '@/assets/images/ag_favicon.ico';

const index: React.FC = () => {
    const sidebarIsOpen = useAtomValue(sidebarIsOpenAtom);
    const fakeGames = [
        {
            title: 'Evolution',
            path: '/evolution/live',
            imgSrc: evolutionFavicon,
        },
        {
            title: 'Pragmatic Play',
            path: '/pragmatic/live',
            imgSrc: pragmaticplayFavicon,
        },
        {
            title: 'Soft Gamings',
            path: '/softgamings/live',
            imgSrc: agFavicon,
        },
        {
            title: 'Micro Gaming',
            path: '/microgaming/live',
            imgSrc: mgFavicon,
        },
        {
            title: 'BTI',
            path: '/bti',
            imgSrc: btiFavicon,
        },
        {
            title: 'GIGX',
            path: '/gigx',
            imgSrc: golfFavicon,
        },
    ];
    return (
        <ul className=" w-full bg-[#2e3135] text-white rounded-md py-4 px-4">
            {fakeGames.map((game) => (
                <Link to={game.path} key={nanoid()}>
                    <li className="py-4 border-0 border-b-[1px] border-solid border-[#485160] ">
                        <span className="flex items-center gap-x-3.5 text-sm hover:text-[#78D39D] text-white dark:bg-gray-900 dark:text-white">
                            <img
                                src={game.imgSrc}
                                alt=""
                                className="w-[30px] h-[30px]"
                            />
                            <span
                                className={`${
                                    sidebarIsOpen ? 'block' : 'hidden'
                                } text-lg font-semibold tracking-wider`}
                            >
                                {game.title}
                            </span>
                        </span>
                    </li>
                </Link>
            ))}
        </ul>
    );
};

export default index;
