import React from 'react';
import Mobile from './Mobile';
import Pc from './Pc';
import { useIsLogin } from '@/hooks/resources/useIsLogin';
import { useShowPc } from '@/hooks/useShowPc';
import SingIn from '../LoginPopUp/Login';
import SingUp from '../LoginPopUp/SignUp';
import MobileBottom from './MobileBottom';
//TODO 需要找時間整理一下NavBar 與Mobile的組件,統一下Atom

const NavBar: React.FC = () => {
    const showPc = useShowPc();
    const isLogin = useIsLogin();

    //選擇顯示的選單
    const ShowNav = () => {
        if (showPc) return <Pc isLogin={isLogin} />;
        else return <Mobile isLogin={isLogin} />;
    };
    return (
        <div className="Navbar p-4 w-full h-fit bg-white md:flex md:items-center md:justify-between md:px-6 md:py-4 relative">
            <ShowNav />
            <SingIn />
            <SingUp />
            <MobileBottom />
        </div>
    );
};

export default NavBar;
