import React from 'react';
import NavBar from './NavBar';
import { useParams, useLocation } from 'react-router-dom';

//TODO 之後有時間再考慮要不要改寫=>目前的問題是拖太多子組件出來,恐怕不好管理
export const Header: React.FC = () => {
    // 如果有人使用推廣連結
    const { ref } = useParams();
    const { pathname } = useLocation();
    if (ref && pathname.includes('/ag/')) {
        localStorage.setItem('ref', ref);
    }

    return (
        <header id="header" className="sticky top-0 flex md:z-40 z-50 w-full h-fit md:shadow-[0_1px_20px_0px_#A370ED33] shadow-[0_4px_4px_0px_#A370ED33]">
            <NavBar />
        </header>
    );
};
