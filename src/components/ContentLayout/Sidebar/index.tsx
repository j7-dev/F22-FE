import React from 'react';
import { Link } from 'react-router-dom';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import WallerContainer from './WallerContainer';
import GameNavContainer from './GameNavContainer';
import favicon from '@/assets/images/favicon.png';
import fakeLogo from '@/assets/images/logo.png';
import { windowWidthAtom, mbSidebarAtom } from '@/components/ContentLayout';

export const sidebarIsOpenAtom = atom(false);

export const Sidebar: React.FC = () => {
    const windowWidth = useAtomValue(windowWidthAtom);
    const setMbSidebar = useSetAtom(mbSidebarAtom);
    const [sidebarIsOpen, setSidebarIsOpen] = useAtom(sidebarIsOpenAtom);

    const logoSrc = sidebarIsOpen
        ? {
              backgroundImage: `url(${fakeLogo})`,
          }
        : {
              backgroundImage: `url(${favicon})`,
          };

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
        <div className={`sideBar text-white  h-full bg-[#0b0b11] z-50 xl:w-20 xl:hover:w-64 transition-all duration-300`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleMbSidebar}>
            <div className="w-full logo h-1/6 flex justify-center items-center">
                <Link to="/" className="w-full">
                    <span className="relative w-full block h-12 bg-center bg-no-repeat bg-contain" style={logoSrc}>
                        <span className="sr-only">跳轉到首頁</span>
                    </span>
                </Link>
            </div>
            <div className="overflow-y-scroll h-5/6 sideNav px-2 w-full flex flex-col">
                <GameNavContainer />
                <WallerContainer />
            </div>
        </div>
    );
};
