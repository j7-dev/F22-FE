// 1.狀態管理
// 2.登入登出按紐
// 3.登入彈窗呼叫
import React, { useEffect } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useLogout, useIsAuthenticated } from '@refinedev/core';
import LanguageSwitch from '../LanguageSwitch';
import Icon_Wallet_White from '@/assets/images/Icon_Wallet_White.svg';

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
            // console.log('Logout_verify', _verify);
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
    const handleRegister = () => {
        setLoginOrSignUp(false);
        setPopupIsOpen(true);
    };
    return (
        <>
            <div className={`walletBtn flex flex-row gap-2.5 `}>
                <div onClick={handleClick} className="primayButton loginBtn  whitespace-nowrap flex items-center justify-center   md:my-3 md:px-6 md:py-2 cursor-pointer">
                    <span>{isLogin ? 'Log out' : 'Log in'}</span>
                </div>
                {isLogin ? (
                    <div onClick={handleWallet} className="secondaryButton WalletBtn whitespace-nowrap flex items-center  gap-x-2 bg md:my-3 md:px-6 md:py-2 cursor-pointer">
                        <img src={Icon_Wallet_White} alt="" />
                        <span>My Wallet</span>
                    </div>
                ) : (
                    <div onClick={handleRegister} className="secondaryButton RegisterBtn whitespace-nowrap flex justify-center items-center gap-x-2 md:my-3 md:px-6 md:py-2 cursor-pointer">
                        <span>Register</span>
                    </div>
                )}

                <div className="tertiaryButton languageSwitchContain relative flex items-center justify-center md:my-3 md:px-6 md:py-2 cursor-pointer">
                    <LanguageSwitch />
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
