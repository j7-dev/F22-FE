import React from 'react';
import NavBar from './NavBar';

export const Header: React.FC = () => (
    <>
        <header className="relative flex md:z-40 z-50 w-full min-h-[80px] md:min-h-0  md:shadow-[0_1px_20px_0px_#A370ED33]">
            <NavBar />
        </header>
    </>
);
