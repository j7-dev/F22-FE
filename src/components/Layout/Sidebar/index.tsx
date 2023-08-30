import React from 'react';
import { Link } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import WallerContainer from './WallerContainer';
import GameNavContainer from './GameNavContainer';
import fakeLogo2 from '@/assets/images/LOGO2.png';
import fakeLogo from '@/assets/images/LOGO.png';

export const sidebarIsOpenAtom = atom(false);

export const Sidebar: React.FC = () => {
    const [
        sidebarIsOpen,
        setSidebarIsOpen,
    ] = useAtom(sidebarIsOpenAtom);

    const logoSrc = sidebarIsOpen
        ? {
              backgroundImage: `url(${fakeLogo})`,
          }
        : {
              backgroundImage: `url(${fakeLogo2})`,
          };

    const handleMouseEnter = () => {
        setSidebarIsOpen(true);
    };
    const handleMouseLeave = () => {
        setSidebarIsOpen(false);
    };
    return (
        <div
            className={`${
                sidebarIsOpen ? 'w-64' : 'w-full'
            } text-white  h-full bg-[#0b0b11] z-50`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-full logo h-1/6 flex justify-center items-center">
                <Link to="/" className="w-full">
                    <span
                        className="relative w-full block h-12 bg-center bg-no-repeat bg-contain"
                        style={logoSrc}
                    >
                        <span className="sr-only">跳轉到首頁</span>
                    </span>
                </Link>
            </div>
            <div className="overflow-y-scroll h-5/6 sideNav  px-2 w-full flex flex-col flex-nowrap">
                <GameNavContainer />
                <WallerContainer />
            </div>
        </div>
    );
};
