import React from 'react';
import { useSetAtom } from 'jotai';
import { Link, useNavigate } from 'react-router-dom';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import { signInAtom, signUpAtom } from '../LoginModule';
import { useGetNoteBox } from '@/hooks/resources/useGetNoteBox';
import Icon_Wallet_white from '@/assets/images/topBar/Icon_TopBar_Wallet_White.svg';
import Icon_Account_White from '@/assets/images/topBar/Icon_Account_White.svg';
import Icon_Account_SignUp from '@/assets/images/topBar/Icon_Account_SignUp.svg';
import Icon_NoteBox_white from '@/assets/images/topBar/Icon_NoteBox_white.svg';
import logo from '@/assets/images/1002_logo_f.svg';
import MenuBtn from './MenuBtn';

const Mobile: React.FC<{
    isLogin: boolean;
}> = ({ isLogin }) => {
    const setSignIn = useSetAtom(signInAtom);
    const setSignUp = useSetAtom(signUpAtom);
    const navigate = useNavigate();
    const setSection = useSetAtom(activeMenuAtom);
    const { dataCount } = useGetNoteBox();

    const handleProfile = () => {
        navigate('/wallet');
        setSection('myPage');
    };

    const handleClckToSiteNotify = () => {
        setSection('siteNotify');
        navigate('/wallet');
    };
    //錢包及通知組件
    const WalletMenu = () => {
        if (isLogin) {
            //登入顯示錢包及通知
            return (
                <div className="flex gap-2 ">
                    <div onClick={handleProfile} className="myWallet flex justify-center items-center w-[30px] h-[30px] rounded-xl bg-[#5932EA] aspect-square p-1.5">
                        <img src={Icon_Wallet_white} alt="" className="w-full h-full object-contain " />
                    </div>
                    <div onClick={handleClckToSiteNotify} className="noteBox relative flex justify-center items-center w-[30px] h-[30px] rounded-xl bg-[#5932EA] aspect-square p-1.5">
                        <img src={Icon_NoteBox_white} alt="" className="w-full h-full object-contain " />
                        <div className="rewardNumber absolute -right-[5px] -top-[5px] origin-center flex justify-center items-center min-w-[15px] min-h- bg-[#DC3545] px-1.5 aspect-square rounded-full text-xs font-bold text-white">{dataCount}</div>
                    </div>
                </div>
            );
        } else {
            //登出顯示登入及註冊
            return (
                <div className="flex gap-1 items-center">
                    <div onClick={() => setSignIn(true)} className="signIn flex justify-center items-center w-[30px] h-[30px] rounded-xl bg-[#5932EA] aspect-square p-1.5">
                        <img src={Icon_Account_White} alt="" className="w-full h-full object-contain " />
                    </div>
                    <div onClick={() => setSignUp(true)} className="signUp flex justify-center items-center w-[30px] h-[30px] rounded-xl bg-black aspect-square p-1.5">
                        <img src={Icon_Account_SignUp} alt="" className="w-full h-full object-contain " />
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="mbMenu w-full h-fit relative z-50 flex items-center justify-between md:hidden">
            <div className="phoneMenu w-[30px] h-[30px]">
                <MenuBtn />
            </div>
            <div className="logo w-full h-full flex items-center">
                <Link to="/" className="w-full">
                    <img src={logo} alt="" className="w-full h-[30px] object-contain" />
                </Link>
            </div>
            <WalletMenu />
        </div>
    );
};

export default Mobile;
