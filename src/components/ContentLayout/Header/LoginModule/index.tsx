// 1.狀態管理
// 2.登入登出按紐
// 3.登入彈窗呼叫
import React, { useEffect } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useLogout, useIsAuthenticated } from '@refinedev/core';
import LanguageSwitch from '../LanguageSwitch';
import { BiSolidUserRectangle } from 'react-icons/bi';

export const IsLoginAtom = atom(false);
export const popupIsOpenAtom = atom(false);
export const loginOrSignUpAtom = atom(true); //true:login false:signUp
export const verifyAtom = atom(false);
export const verifyErrorAtom = atom('');

const Login: React.FC = () => {
    const Navigate = useNavigate();
    const [isLogin, setIsLogin] = useAtom(IsLoginAtom);
    const [_verify, setVerify] = useAtom(verifyAtom);
    const [_verifyError, setVerifyError] = useAtom(verifyErrorAtom);
    const setLoginOrSignUp = useSetAtom(loginOrSignUpAtom); //true:login false:signUp
    const { data } = useIsAuthenticated();
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const { mutate: logout } = useLogout();

    //判斷是否登入並且覆值
    useEffect(() => {
        setIsLogin(!!data?.authenticated);
    }, [data?.authenticated]);

    //登入or登出事件=>如果登入就登出，如果登出就跳登入彈窗
    const handleClick = () => {
        if (isLogin) {
            setVerify(false);
            setVerifyError('');
            logout({ redirectPath: '/' });
            console.log('Logout_verify', _verify);
        } else {
            setLoginOrSignUp(true);
            setPopupIsOpen(true);
        }
    };

    //My Wallet
    const handleWallet = () => {
        if (isLogin) {
            Navigate('/wallet');
        } else {
            setPopupIsOpen(true);
        }
    };

    return (
        <>
            <div className={`walletBtn flex flex-row gap-2.5 `}>
                <div onClick={handleWallet} className="WalletBtn min-w-[150px] whitespace-nowrap flex items-center rounded-[20px] border border-solid border-black gap-x-2 font-bold bg-black text-white hover:opacity-80  md:my-3 md:px-6 md:py-2 cursor-pointer">
                    <BiSolidUserRectangle size={15} />
                    <span>My Wallet</span>
                </div>
                <div className="languageSwitchContain relative min-w-[150px] flex items-center justify-center border border-solid border-black rounded-[20px] font-bold bg-white text-black hover:opacity-80  md:my-3 md:px-6 md:py-2 cursor-pointer">
                    <LanguageSwitch />
                </div>
                <div onClick={handleClick} className="loginBtn min-w-[100px] whitespace-nowrap flex items-center justify-center rounded-[20px] border border-solid border-[#5932EA] font-bold bg-[#5932EA] text-white hover:opacity-80  md:my-3 md:px-6 md:py-2 cursor-pointer">
                    <span>{isLogin ? 'Log out' : 'Log in'}</span>
                </div>
                {/* <span
                    onClick={() => {
                        handleClick(false);
                    }}
                    className="logoutBtn whitespace-nowrap  flex items-center rounded-lg border-white gap-x-2 font-bold bg-[#e5e5e5] text-black hover:opacity-80  md:my-3 md:px-6 md:py-3 cursor-pointer"
                >
                    <AiOutlineUserAdd size={20} />
                    Sign Up
                </span> */}
            </div>
        </>
    );
};

export default Login;
