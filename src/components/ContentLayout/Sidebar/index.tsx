import React from 'react';
import { Link } from 'react-router-dom';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import WallerContainer from './WallerContainer';
import GameNavContainer from './GameNavContainer';
import favicon from '@/assets/images/0927logoNoText.png';
import Logo from '@/assets/images/0927logo.png';
import { windowWidthAtom, mbSidebarAtom } from '@/components/ContentLayout';

export const sidebarIsOpenAtom = atom(false);

export const Sidebar: React.FC = () => {
    const windowWidth = useAtomValue(windowWidthAtom);
    const setMbSidebar = useSetAtom(mbSidebarAtom);
    const [sidebarIsOpen, setSidebarIsOpen] = useAtom(sidebarIsOpenAtom);

    const handleMouseEnter = () => {
        windowWidth >= 1280 && setSidebarIsOpen(true);
    };
    const handleMouseLeave = () => {
        windowWidth >= 1280 && setSidebarIsOpen(false);
    };

    const handleMbSidebar = () => {
        if (windowWidth <= 1280) {
            setSidebarIsOpen((prevValue) => !prevValue);
            setMbSidebar((prevValue) => !prevValue);
        }
    };
    return (
        <div className={`sideBar ${sidebarIsOpen ? 'active' : ''} text-[#BDBDBD] h-full bg-white z-50 xl:w-[88px] xl:hover:w-80 transition-all duration-300`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleMbSidebar}>
            <div className="w-full logo h-1/6 flex justify-center items-center">
                <Link to="/" className="w-full">
                    <div className="relative w-full block h-12 px-[14px]">
                        <img src={sidebarIsOpen ? Logo : favicon} alt="" className="w-full h-full object-contain object-center" />
                        <span className="sr-only">跳轉到首頁</span>
                    </div>
                </Link>
            </div>
            <div className="overflow-y-scroll h-5/6 sideNav py-4 px-[14px] w-full flex flex-col">
                <GameNavContainer />
                <div className="border-0 border-solid border-t-2 mx-[14px] pt-4 mt-4" />
                <WallerContainer />
            </div>
        </div>
    );
};
