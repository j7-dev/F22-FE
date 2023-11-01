import React from 'react';
import { useSetAtom } from 'jotai';
import { Spin, Empty, Button } from 'antd';
import { useGetBtiOperatorToken } from '@/hooks/gameProvider/bti/useGetBtiOperatorToken';
import { signInAtom } from '@/components/ContentLayout/Header/LoginModule';
import underConstructionIcon from '@/assets/images/game_provider/Under_construction.svg';
import { useShowPc } from '@/hooks/useShowPc';
import { useTranslation } from 'react-i18next';

const index: React.FC = () => {
    const setSignIn = useSetAtom(signInAtom);
    const isPc = useShowPc();
    const { t } = useTranslation();
    const { identity, data: token, isFetching, inSupport } = useGetBtiOperatorToken();
    const operatorToken = token?.data?.token;
    const addUrl = operatorToken ? `?operatorToken=${operatorToken}` : '';

    if (isFetching) return <Spin size="large" className="w-full h-screen flex justify-center items-center" />;

    //如果未登入則不顯示,登入則顯示iframe
    const Container = () => {
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
                            <div className="sm:text-4xl text-base font-bold text-[#5932EA]">{t("We're under construction.")}</div>
                            <div className="sm:text-base text-xs font-medium text-[#828282]">{t('We need a few time to make everything perfect.Please check back later.')}</div>
                        </>
                    }
                />
            );
        return <iframe style={{ minHeight: `calc(100vh - ${headerHeight}px - 72px)` }} src={`https://prod20290-125166753.442hattrick.com/ko/korean-view${addUrl}`} className="w-full h-full border-0" />;
    };
    //取得id = header的元素高度
    const header = document.getElementById('header');
    const headerHeight = header?.clientHeight;
    return (
        <div className="sportPage sm:my-9 sm:gap-8 my-4 w-full">
            <div style={{ minHeight: `calc(100vh - ${headerHeight}px - 72px)` }} className="bg-white flex justify-center items-center h-fit sm:mx-4 sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl overflow-hidden">
                <Container />
            </div>
        </div>
    );
};

export default index;
