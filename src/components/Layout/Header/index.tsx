import React from 'react';
import NavBar from './NavBar';
import TopBar from './TopBar';
// import Secbar from './SecBar';

export const Header: React.FC = () => (
    <>
        <header className="flex z-40 flex-wrap md:justify-start md:flex-nowrap w-full text-sm sm:flex-col">
            <TopBar />
            <NavBar />
            {/* <Secbar /> */}
        </header>
    </>
);
