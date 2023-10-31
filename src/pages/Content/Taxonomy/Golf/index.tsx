import React from 'react';
import { useSetAtom } from 'jotai';
import { Spin, Empty, Button } from 'antd';
import { useIgxTopId } from '@/hooks/gameProvider/IGX/useIgxTopId';
import { signInAtom } from '@/components/ContentLayout/Header/LoginModule';
// import { useGetLocale } from '@refinedev/core';

const index: React.FC = () => {
    const setSignIn = useSetAtom(signInAtom);
    //取得網站預設語言
    // const locale = useGetLocale();
    // const currentLocale = locale();
    //取得IGX的otp_id跟gameServer
    const { identity, isFetching, otpId, gameServer } = useIgxTopId();
    console.log('🚀 ~ otpId:', otpId);

    const addUrl = `${gameServer}?otp_id=${otpId}&login_id=${identity?.id}&lang=ko-KR`;
    if (isFetching) return <Spin size="large" className="w-full h-screen flex justify-center items-center" />;
    console.log('🚀 ~ addUrl:', addUrl);

    //如果未登入則不顯示,登入則顯示iframe
    const Container = () => {
        if (!identity)
            return (
                <Empty description="Please Login">
                    <Button onClick={() => setSignIn(true)}>Login</Button>
                </Empty>
            );
        if (gameServer) window.open(addUrl);
        return <>{/* <iframe src={addUrl} name="output_frame" id="output_frame" className="w-full h-full border-0" /> */}</>;
    };
    //取得id = header的元素高度
    // const header = document.getElementById('header');
    // const headerHeight = header?.clientHeight;
    return (
        <div className="IGXPage sm:my-9 sm:gap-8 my-4 w-full h-screen">
            <div className="bg-white flex justify-center items-center h-full sm:mx-4 sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl overflow-hidden">
                <Container />
            </div>
        </div>
    );
};

export default index;
