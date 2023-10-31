import React from 'react';
import { atom, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLogout } from '@refinedev/core';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import Icon_Wallet_white from '@/assets/images/topBar/Icon_TopBar_Wallet_White.svg';
import { useIsLogin } from '@/hooks/resources/useIsLogin';

//登入與註冊各有一組ATOM控制Modal的開關
export const signInAtom = atom(false);
export const signUpAtom = atom(false);
//登入驗證錯誤的訊息
export const verifyErrorAtom = atom('');

const Login: React.FC = () => {
    const { t } = useTranslation();
    const Navigate = useNavigate();
    const isLogin = useIsLogin();
    const { mutate: logout } = useLogout();
    const setVerifyError = useSetAtom(verifyErrorAtom);
    const setSection = useSetAtom(activeMenuAtom);
    const setSignIn = useSetAtom(signInAtom);
    const setSignUp = useSetAtom(signUpAtom);
    //設定click事件傳入modal的開關
    const handleSingIn = () => {
        setSignIn(true);
    };
    const handleSingUp = () => {
        setSignUp(true);
    };
    //登入or登出事件=>如果登入就登出，如果登出就跳登入彈窗
    const handleLogout = () => {
        setVerifyError('');
        logout({ redirectPath: '/' });
    };

    //My Wallet
    const handleWallet = () => {
        setSection('myPage');
        Navigate('/wallet');
    };

    return (
        <div className={`walletBtn flex flex-row gap-2.5`}>
            {isLogin ? (
                <>
                    <div onClick={handleWallet} className="primaryButton WalletBtn whitespace-nowrap flex items-center gap-x-2 cursor-pointer">
                        <img src={Icon_Wallet_white} alt="" />
                        <span>{t('My Page')}</span>
                    </div>
                    <div onClick={handleLogout} className={`secondaryButton loginBtn whitespace-nowrap flex items-center justify-center cursor-pointer`}>
                        <span>{t('Log out')}</span>
                    </div>
                </>
            ) : (
                <>
                    <div onClick={handleSingIn} className={`primaryButton loginBtn  whitespace-nowrap flex items-center justify-center cursor-pointer`}>
                        <span>{t('Log In')}</span>
                    </div>
                    <div onClick={handleSingUp} className="secondaryButton RegisterBtn whitespace-nowrap flex justify-center items-center gap-x-2 md:px-6 md:py-2 cursor-pointer">
                        <span>{t('Register')}</span>
                    </div>
                </>
            )}
            {/*
                <div className="tertiaryButton languageSwitchContain relative flex items-center justify-center md:my-3 md:px-6 md:py-2 cursor-pointer">
                    <LanguageSwitch />
                </div> */}
        </div>
    );
};

export default Login;
