import React from 'react';
import { useAtom } from 'jotai';
import { mbSidebarAtom } from '@/components/ContentLayout/Sidebar';
import menuBtn from '@/assets/images/menuBtn.svg';
import menuOpen from '@/assets/images/menuOpen.svg';
const MenuBtn: React.FC = () => {
    const [mbSidebar, setMbSidebar] = useAtom(mbSidebarAtom);
    const handleMbSidebar = () => {
        setMbSidebar((prevValue) => !prevValue);
    };
    return (
        <button onClick={handleMbSidebar} type="button" className="inline-flex justify-center items-center gap-2 rounded-full bg-transparent border-transparent border-0 align-middle transition-all">
            <div className={`menuBtn duration-300 transition-all ${mbSidebar ? 'active' : ''}`}>
                <img className="menuBtnIcon" src={mbSidebar ? menuOpen : menuBtn} />
            </div>
        </button>
    );
};

export default MenuBtn;
