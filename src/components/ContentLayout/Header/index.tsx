import React, { useRef } from 'react';
import NavBar from './NavBar';

//TODO 之後有時間再考慮要不要改寫=>目前的問題是拖太多子組件出來,恐怕不好管理
export const Header: React.FC = () => {
    //取得NavBar的高度
    const ref = useRef<HTMLDivElement>(null);
    const height = ref.current?.offsetHeight;
    return (
        <>
            <header style={{ minHeight: height }} className="relative flex md:z-40 z-50 w-full md:shadow-[0_1px_20px_0px_#A370ED33]">
                <NavBar ref={ref} />
            </header>
        </>
    );
};
