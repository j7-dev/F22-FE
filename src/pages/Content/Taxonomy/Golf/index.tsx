import React from 'react';
import { useSetAtom } from 'jotai';
import { Spin, Empty, Button } from 'antd';
import { useIgxTopId } from '@/hooks/gameProvider/IGX/useIgxTopId';
import { signInAtom } from '@/components/ContentLayout/Header/LoginModule';
import underConstructionIcon from '@/assets/images/game_provider/Under_construction.svg';
import { useShowPc } from '@/hooks/useShowPc';
import { useTranslation } from 'react-i18next';
import igxImg from '@/assets/images/game_provider/igxIcon.svg';
import golfImg from '@/assets/images/game_provider/golfImg.jpg';
import { USERNAME_PREFIX } from '@/utils';
// import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
// import { useGetLocale } from '@refinedev/core';

const index: React.FC = () => {
    const setSignIn = useSetAtom(signInAtom);
    const isPc = useShowPc();
    const { t } = useTranslation();
    //取得IGX的otp_id跟gameServer
    const { identity, isFetching, otpId, gameServer, inSupport } = useIgxTopId();
    const login_id = `${USERNAME_PREFIX}_${identity?.username}`;

    //如果未登入則不顯示,登入則顯示iframe
    const Container = () => {
        //如果未登入則顯示登入按鈕
        if (!identity)
            return (
                <Empty description="Please Login">
                    <Button onClick={() => setSignIn(true)}>Login</Button>
                </Empty>
            );
        //如果以登入但維護中則顯示維護圖片
        if (identity && !inSupport)
            return (
                <Empty
                    className="flex flex-col items-center "
                    image={null}
                    imageStyle={{ height: 0 }}
                    description={
                        <>
                            <img src={underConstructionIcon} className={`${isPc ? 'w-[360px]' : 'w-[240px]'} h-auto`} alt="" />
                            <div className="md:text-4xl text-base font-bold text-[#5932EA]">{t("We're under construction.")}</div>
                            <div className="md:text-base text-xs font-medium text-[#828282]">{t('We need a few time to make everything perfect.Please check back later.')}</div>
                        </>
                    }
                />
            );
        //如果已登入且不維護中則顯示iframe
        if (gameServer) {
            console.log('⭐  login_id:', login_id);

            const addUrl = `${gameServer}?otp_id=${otpId}&login_id=${login_id}&lang=ko-KR`;
            if (isFetching) return <Spin size="large" className="w-full h-screen flex justify-center items-center" />;
            // console.log('🚀 ~ addUrl:', addUrl);
            //判斷是否為safari
            const isSmartBet = /smartbet/i.test(navigator.userAgent);
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

            const handleClick = () => {
                if (isSafari || isSmartBet) {
                    //當前頁面跳轉
                    window.location.href = addUrl;
                } else {
                    //否則開新分頁
                    window.open(addUrl, '_blank');
                }
            };
            return (
                <>
                    <div className="grid grid-cols-11 w-full h-full gap-4 md:py-16md:px-8">
                        <div className="sm:col-start-3 sm:col-span-3 col-start-2 col-span-9">
                            <img src={golfImg} alt="" className="max-w-full h-full object-contain object-center" />
                        </div>
                        <div className="sm:col-start-7 sm:col-span-3 col-start-2 col-span-9 flex flex-col items-center justify-center gap-10">
                            <img src={igxImg} alt="" className="w-full" />
                            <button onClick={handleClick} className="hidden md:block cursor-pointer w-full bg-[#492DB0] font-bold text-xl text-white border-0 rounded-2xl py-4">
                                {t('시작')}
                            </button>
                            <p className="hidden md:block text-[#9680EA] text-base font-medium text-center">{t('If the new window does not pop up, please enable window pop-up in your browser settings')}</p>
                        </div>
                    </div>
                    <div className="md:hidden px-6 pb-10 w-full">
                        <button onClick={handleClick} className="cursor-pointer w-full bg-[#492DB0] font-bold text-xl text-white border-0 rounded-2xl py-4">
                            {t('시작')}
                        </button>
                    </div>
                </>
            );
        }
        return <></>;
    };
    //取得id = header的元素高度
    const header = document.getElementById('header');
    const headerHeight = header?.clientHeight;
    //取得mobileBottom的高度
    const mobileBottom = document.querySelector('.mobileBottom');
    const mobileBottomHeight = mobileBottom?.clientHeight || 0;
    //須扣除的外邊距 PC: 32px Mobile: 16px
    const margin = isPc ? 36 * 2 : 16 * 2;
    return (
        <div className="IGXPage md:my-9 md:gap-8 my-4 w-full h-auto">
            <div style={{ height: `calc(100vh - ${headerHeight}px - ${mobileBottomHeight}px - ${margin}px)` }} className="bg-white flex flex-col justify-center items-center md:mx-4 md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl overflow-hidden">
                {/* <div className="hidden slotTitle w-full md:grid grid-cols-11 gap-4 border-0 border-solid border-b border-[#d5d8dc] md:shadow-[0_4.5px_0_0_#0000000D,0_3.5px_0_0_#FFFFFF,0_1.5px_0_0_#0000001A] md:py-9">
                    <div className=" col-span-1 flex justify-center">
                        <img src={Icon_Main_Title} alt="" className="" />
                    </div>
                    <span className="hidden whitespace-nowrap col-span-1 font-bold text-3xl text-[#9680EA] md:flex items-center">{t('GOLF')}</span>
                </div> */}
                <Container />
            </div>
        </div>
    );
};

export default index;
