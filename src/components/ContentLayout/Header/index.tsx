import React from 'react';
import NavBar from './NavBar';

//TODO 之後有時間再考慮要不要改寫=>目前的問題是拖太多子組件出來,恐怕不好管理
export const Header: React.FC = () => {
    return (
        <header id="header" className="sticky top-0 flex md:z-40 z-50 w-full h-fit md:shadow-[0_1px_20px_0px_#A370ED33] shadow-[0_4px_4px_0px_#A370ED33]">
            <NavBar />
        </header>
    );
};
