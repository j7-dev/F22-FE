import React from 'react';
import { useSetAtom } from 'jotai';
import { Spin, Empty, Button } from 'antd';
import { useGetBtiOperatorToken } from '@/hooks/gameProvider/bti/useGetBtiOperatorToken';
import { signInAtom } from '@/components/ContentLayout/Header/LoginModule';

const index: React.FC = () => {
    const setSignIn = useSetAtom(signInAtom);
    const { identity, data: token, isFetching } = useGetBtiOperatorToken();
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
        return <iframe style={{ border: 'none' }} src={`https://prod20290-125166753.442hattrick.com/ko/korean-view${addUrl}#Live`} className="w-full h-full" />;
    };

    return (
        <div className="inPlayPage sm:my-9 sm:gap-8 my-4 w-full h-screen">
            <div className="bg-white flex justify-center items-center h-full sm:mx-4 sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl overflow-hidden">
                <Container />
            </div>
        </div>
    );
};

export default index;
