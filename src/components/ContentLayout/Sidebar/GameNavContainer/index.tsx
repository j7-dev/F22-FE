import React from 'react';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gameCategories } from '@/utils/GameCategory';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);
    return (
        <ul className="GameNavContainer w-full mb-0 pl-0 flex flex-col gap-4">
            {gameCategories.map((game) => {
                return (
                    <li key={nanoid()} onClick={() => setActiveMenu(game.value)} className={`${activeMenu === game.value ? 'active' : ''} ${game.value} relative transition-all px-6 md:px-0 md:rounded-2xl`}>
                        <Link to={game.path} className="text-inherit">
                            <div className="flex items-center text-sm overflow-hidden md:pr-2.5 pr-5 gap-2">
                                <div className="favicon min-w-[44px] min-h-[44px] md:min-w-[60px] md:min-h-[60px] flex justify-center items-center" />
                                <span className={`whitespace-nowrap md:text-lg text-[10px] font-normal`}>{t(game.label)}</span>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default index;
