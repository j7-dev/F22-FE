import React from 'react';
import Mobile from './Mobile';
import Pc from './Pc';
import { useIsLogin } from '@/hooks/resources/useIsLogin';
import { useShowPc } from '@/hooks/useShowPc';
import SingIn from '../LoginPopUp/Login';
import SingUp from '../LoginPopUp/SignUp';

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
            {/* 舊手機選單 */}
            {/* <div className="flex md:hidden bg-white fixed bottom-0 left-0 justify-between w-full px-8 pt-3 pb-2 z-50" style={{ borderTop: '1px solid #999' }}>
                    <Link to="/">
                        <div className="flex flex-col justify-center items-center text-gray-600 hover:text-gray-400">
                            <GiPokerHand className="text-[1.5rem]" />
                            <span className="text-xs font-normal">Game</span>
                        </div>
                    </Link>
                    <Link to="/about">
                        <div className="flex flex-col justify-center items-center text-gray-600 hover:text-gray-400">
                            <BiCheckShield className="text-[1.5rem]" />
                            <span className="text-xs font-normal">About</span>
                        </div>
                    </Link>
                    <Link to="/customer">
                        <div className="flex flex-col justify-center items-center text-gray-600 hover:text-gray-400">
                            <RiCustomerService2Fill className="text-[1.5rem]" />
                            <span className="text-xs font-normal">Service</span>
                        </div>
                    </Link>

                    <div className="cursor-pointer flex flex-col justify-center items-center text-gray-600 hover:text-gray-400" onClick={handleProfile}>
                        <UserOutlined className="text-[1.5rem]" />
                        <span className="text-xs font-normal">Profile</span>
                    </div>
                </div> */}
        </div>
    );
};

export default NavBar;
