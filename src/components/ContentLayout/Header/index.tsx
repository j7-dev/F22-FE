import React from 'react';
import NavBar from './NavBar';

export const Header: React.FC = () => (
    <>
        <header className="relative flex sm:z-40 z-50 w-full min-h-[80px] sm:min-h-0  sm:shadow-[0_1px_20px_0px_#A370ED33]">
            <NavBar />
        </header>
    </>
);
