import React from 'react';
import { Spin } from 'antd';
import { useGetBtiOperatorToken } from '@/hooks/gameProvider/bti/useGetBtiOperatorToken';
const index: React.FC = () => {
    // const { data: user, isFetching } = useGetIdentity<TMe>();
    const { data: token, isFetching } = useGetBtiOperatorToken();
    const operatorToken = token?.data?.data;
    console.log('🚀 ~ operatorToken:', operatorToken);

    if (isFetching) return <Spin size="large" className="w-full h-screen flex justify-center items-center" />;

    return (
        <div className="sportPage  md:my-9 md:gap-8 my-4 w-full ">
            <iframe src={`https://prod20290-125166753.442hattrick.com`} className="w-full h-full" />
        </div>
    );
};

export default index;
