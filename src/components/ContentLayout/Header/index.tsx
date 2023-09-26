import React from 'react';
import NavBar from './NavBar';

export const Header: React.FC = () => (
    <>
        <header className="relative flex z-40 flex-wrap md:justify-start md:flex-nowrap w-full text-sm sm:flex-col shadow-[0_1px_6px_0px_rgba(0,0,0,0.2)]">
            <NavBar />
        </header>
    </>
);
