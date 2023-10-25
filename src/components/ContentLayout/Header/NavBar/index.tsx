import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { signInAtom } from '../LoginModule';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import Mobile from './Mobile';
import Pc from './Pc';
import { useIsLogin } from '@/hooks/resources/useIsLogin';
import { useShowPc } from '@/hooks/useShowPc';
import SingIn from '../LoginPopUp/Login';
import SingUp from '../LoginPopUp/SignUp';
import ForwardedRef = React.ForwardedRef;

//TODO 需要找時間整理一下NavBar 與Mobile的組件,統一下Atom
/**
 * Header的NavBar子組件
 * 使用forwardRef將高度傳給父組件Header
 */
const NavBar = forwardRef<HTMLDivElement>((props, ref: ForwardedRef<HTMLDivElement>) => {
    const { ...otherProps } = props;
    const showPc = useShowPc();
    const setSignIn = useSetAtom(signInAtom);
    const setSection = useSetAtom(activeMenuAtom);
    const isLogin = useIsLogin();
    const Navigate = useNavigate();

    const handleProfile = () => {
        if (isLogin) {
            Navigate('/wallet');
            setSection('myPage');
        } else {
            setSignIn(true);
        }
    };
    //選擇顯示的選單
    const ShowNav = () => {
        if (showPc) return <Pc isLogin={isLogin} />;
        else return <Mobile handleProfile={handleProfile} isLogin={isLogin} />;
    };

    return (
        <div {...otherProps} ref={ref} className="Navbar z-[999] fixed p-4 w-full h-fit bg-white md:flex md:items-center md:justify-between md:px-6 md:py-4 md:h-full md:relative shadow-[0_4px_4px_0px_#A370ED33]">
            <nav className="relative w-full h-full xl:flex md:items-center xl:justify-between py-0 xl:mx-auto " aria-label="Global">
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
            </nav>
        </div>
    );
});

export default NavBar;
