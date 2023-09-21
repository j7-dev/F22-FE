// 1.狀態管理
// 2.登入登出按紐
// 3.登入彈窗呼叫
import React, { useEffect } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { BiSolidUser } from 'react-icons/bi';
import { useLogout, useIsAuthenticated } from '@refinedev/core';
import { AiOutlineUserAdd } from 'react-icons/ai';

export const IsLoginAtom = atom(false);
export const popupIsOpenAtom = atom(false);
export const loginOrSignUpAtom = atom(true); //true:login false:signUp

const Login: React.FC = () => {
    // const [showLogin, setShowLogin] = useState(false);
    const [isLogin, setIsLogin] = useAtom(IsLoginAtom);
    const setLoginOrSignUp = useSetAtom(loginOrSignUpAtom); //true:login false:signUp
    const { data } = useIsAuthenticated();
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const { mutate: logout } = useLogout();

    useEffect(() => {
        setIsLogin(!!data?.authenticated);
    }, [data?.authenticated]);

    const handleClick = (prop: boolean) => {
        setLoginOrSignUp(prop);
        setPopupIsOpen((prevValue) => !prevValue);
        // console.log('popupIsOpenAtom', popupIsOpen);
    };
    // LogOutButton
    const handleLogout = () => {
        logout({ redirectPath: '/' });
    };

    return (
        <>
            <div className={`walletBtn flex flex-row gap-2.5 ${isLogin ? 'hidden' : 'block'}`}>
                <span
                    onClick={() => {
                        handleClick(true);
                    }}
                    className="loginBtn whitespace-nowrap flex items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 cursor-pointer"
                >
                    <BiSolidUser size={20} />
                    Log in
                </span>
                <span
                    onClick={() => {
                        handleClick(false);
                    }}
                    className="logoutBtn whitespace-nowrap  flex items-center rounded-lg border-white gap-x-2 font-bold bg-[#e5e5e5] text-black hover:opacity-80  md:my-3 md:px-6 md:py-3 cursor-pointer"
                >
                    <AiOutlineUserAdd size={20} />
                    Sign Up
                </span>
            </div>
            <div className={`walletBtn flex flex-row gap-2.5 ${isLogin ? 'block' : 'hidden'}`}>
                <Link to="/wallet">
                    <span className="flex whitespace-nowrap  items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 ">
                        <BiSolidUser size={20} />
                        My Wallet
                    </span>
                </Link>
                <span onClick={handleLogout} className="logoutBtn whitespace-nowrap  flex items-center rounded-lg border-white gap-x-2 font-bold bg-[#e5e5e5] text-black hover:opacity-80  md:my-3 md:px-6 md:py-3 cursor-pointer">
                    Log out
                </span>
            </div>
        </>
    );
};

export default Login;
