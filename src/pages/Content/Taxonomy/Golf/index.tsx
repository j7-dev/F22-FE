import React from 'react';
import { useSetAtom } from 'jotai';
import { Spin, Empty, Button } from 'antd';
import { useIgxTopId } from '@/hooks/gameProvider/IGX/useIgxTopId';
import { signInAtom } from '@/components/ContentLayout/Header/LoginModule';
import underConstructionIcon from '@/assets/images/game_provider/Under_construction.svg';
import { useShowPc } from '@/hooks/useShowPc';
import { useTranslation } from 'react-i18next';
// import { useGetLocale } from '@refinedev/core';

const index: React.FC = () => {
    const setSignIn = useSetAtom(signInAtom);
    const isPc = useShowPc();
    const { t } = useTranslation();
    //取得IGX的otp_id跟gameServer
    const { identity, isFetching, otpId, gameServer, inSupport } = useIgxTopId();

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
            const addUrl = `${gameServer}?otp_id=${otpId}&login_id=${identity?.id}&lang=ko-KR`;
            if (isFetching) return <Spin size="large" className="w-full h-screen flex justify-center items-center" />;
            //判斷是否為safari
            const isSmartBet = /smartbet/i.test(navigator.userAgent);
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            if (isSafari || isSmartBet) {
                //當前頁面跳轉
                window.location.href = addUrl;
            } else {
                //否則開新分頁
                window.open(addUrl, '_blank');
            }
            return <></>;
        }
        return <></>;
    };
    //取得id = header的元素高度
    const header = document.getElementById('header');
    const headerHeight = header?.clientHeight;
    return (
        <div className="IGXPage md:my-9 md:gap-8 my-4 w-full h-auto">
            <div style={{ minHeight: `calc(100vh - ${headerHeight}px - 72px)` }} className="bg-white flex justify-center items-center h-full md:mx-4 md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl overflow-hidden">
                <Container />
            </div>
        </div>
    );
};

export default index;
