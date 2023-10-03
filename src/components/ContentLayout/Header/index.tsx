import React from 'react';
import NavBar from './NavBar';

export const Header: React.FC = () => (
    <>
        <header className="relative h-20 flex sm:z-40 z-50 flex-wrap md:justify-start md:flex-nowrap w-full text-sm sm:flex-col sm:shadow-[0_1px_20px_0px_#A370ED33]">
            <NavBar />
        </header>
    </>
);
