import React from 'react';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { GameCategoryData } from '@/utils/GameCategory';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';

const index: React.FC = () => {
    const GameCategory = GameCategoryData;
    const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);
    return (
        <ul className="GameNavContainer w-full text-white mb-0 pl-0 flex flex-col gap-4">
            {GameCategory.map((game) => {
                return (
                    <li key={nanoid()} onClick={() => setActiveMenu(game.value)} className={`${activeMenu === game.value ? 'active' : ''} ${game.value} relative transition-all rounded-2xl text-[#BDBDBD] `}>
                        <Link to={game.path} className="text-inherit">
                            <span className="flex items-center text-sm overflow-hidden">
                                <div className="favicon min-w-[60px] min-h-[60px] flex justify-center items-center" />
                                <span className={`whitespace-nowrap text-lg font-normal`}>{game.label}</span>
                            </span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default index;
