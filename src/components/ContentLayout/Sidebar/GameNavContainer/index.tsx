import React from 'react';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { gameCategories } from '@/utils/GameCategory';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';

const index: React.FC = () => {
    const GameCategory = gameCategories;
    const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);
    return (
        <ul className="GameNavContainer w-full mb-0 pl-0 flex flex-col gap-4">
            {GameCategory.map((game) => {
                return (
                    <li key={nanoid()} onClick={() => setActiveMenu(game.value)} className={`${activeMenu === game.value ? 'active' : ''} ${game.value} relative transition-all px-6 sm:px-0 sm:rounded-2xl`}>
                        <Link to={game.path} className="text-inherit">
                            <span className="flex items-center text-sm overflow-hidden sm:pr-2.5 pr-5 gap-2">
                                <div className="favicon min-w-[44px] min-h-[44px] sm:min-w-[60px] sm:min-h-[60px] flex justify-center items-center" />
                                <span className={`whitespace-nowrap sm:text-lg text-[10px] font-normal`}>{game.label}</span>
                            </span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default index;
