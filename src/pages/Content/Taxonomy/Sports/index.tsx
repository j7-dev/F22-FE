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

    if (isFetching) return <Spin size="large" className="w-full h-screen flex justify-center items-center" />;

    //產生Iframe
    const Iframe = ({ addUrl }: { addUrl: string }) => <iframe style={{ minHeight: `calc(100vh - ${headerHeight}px - ${mobileBottomHeight}px - ${margin}px)` }} src={`https://prod20290-125166753.442hattrick.com/ko/korean-view${addUrl}`} className="w-full h-full border-0" />;
    // 使用 React.memo 包裹组件
    const MemoizedMyComponent = React.memo(Iframe);

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
                            <div className="md:text-4xl text-base font-bold text-[#5932EA]">{t("We're under construction.")}</div>
                            <div className="md:text-base text-xs font-medium text-[#828282]">{t('We need a few time to make everything perfect.Please check back later.')}</div>
                        </>
                    }
                />
            );
        const operatorToken = token?.data?.token;
        const addUrl = operatorToken ? `?operatorToken=${operatorToken}` : '';
        return <MemoizedMyComponent addUrl={addUrl} />;
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
        <div className="sportPage md:my-9 md:gap-8 my-4 w-full">
            <div className="bg-white flex justify-center items-center h-fit md:mx-4 md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl overflow-hidden">
                <Container />
            </div>
        </div>
    );
};

export default index;
