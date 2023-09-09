// 1.狀態管理
// 2.登入登出按紐
// 3.登入彈窗呼叫
import React, { useEffect } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { BiSolidUser } from 'react-icons/bi';
import { useLogout, useIsAuthenticated } from '@refinedev/core';

export const IsLoginAtom = atom(false);
export const popupIsOpenAtom = atom(false);

const Login: React.FC = () => {
    // const [showLogin, setShowLogin] = useState(false);
    const [isLogin, setIsLogin] = useAtom(IsLoginAtom);
    const { data } = useIsAuthenticated();
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const { mutate: logout } = useLogout();

    useEffect(() => {
        setIsLogin(!!data?.authenticated);
        //↓
        // if (data?.authenticated) {
        //     setIsLogin(true);
        // } else {
        //     setIsLogin(false);
        // // }
        // console.log('data', data);
    }, [data?.authenticated]); //ok

    const handleClick = () => {
        setPopupIsOpen((prevValue) => !prevValue);
        // console.log('popupIsOpenAtom', popupIsOpen);
    };
    // LogOutButton
    const handleLogout = () => {
        logout({ redirectPath: '/' });
    };

    return (
        <>
            <span
                className={`loginBtn whitespace-nowrap flex items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 cursor-pointer
														${!isLogin ? 'block' : 'hidden'} `}
                onClick={handleClick}
            >
                <BiSolidUser size={20} />
                Log in
            </span>
            <div className={`walletBtn flex flex-row gap-2.5 ${isLogin ? 'block' : 'hidden'}`}>
                <Link to="/wallet">
                    <span className="flex whitespace-nowrap  items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 ">
                        <BiSolidUser size={20} />
                        My Wallet
                    </span>
                </Link>
                <span className="logoutBtn whitespace-nowrap  flex items-center rounded-lg border-white gap-x-2 font-bold bg-[#e5e5e5] text-black hover:opacity-80  md:my-3 md:px-6 md:py-3 cursor-pointer" onClick={handleLogout}>
                    Log out
                </span>
            </div>
        </>
    );
};

export default Login;
