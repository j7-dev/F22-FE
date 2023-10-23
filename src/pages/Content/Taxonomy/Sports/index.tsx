import React from 'react';
import { Spin, Empty, Button } from 'antd';
// import { useGetBtiOperatorToken } from '@/hooks/gameProvider/bti/useGetBtiOperatorToken';
import { API_URL } from '@/utils';
import { useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';

const index: React.FC = () => {
    const { data: identity, isFetching } = useGetIdentity<TMe>();
    // const { data: token, isFetching } = useGetBtiOperatorToken();
    // const operatorToken = token?.data?.data?.attributes?.token;
    // const addUrl = operatorToken ? `?operatorToken=${operatorToken}` : '';

    if (isFetching) return <Spin size="large" className="w-full h-screen flex justify-center items-center" />;
    //如果未登入則不顯示,登入則顯示iframe
    const Container = () => {
        if (!identity)
            return (
                <Empty description="Please Login">
                    <Button>Login</Button>
                </Empty>
            );
        return <iframe src={`${API_URL}/api/bti/opengame/?user_id=${identity?.id} `} className="w-full h-full" />;
    };

    return (
        <div className="sportPage sm:my-9 sm:gap-8 my-4 w-full h-full">
            <div className="bg-white sm:mx-4 sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl sm:py-4">
                <Container />
            </div>
        </div>
    );
};

export default index;
