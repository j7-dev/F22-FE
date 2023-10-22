import React from 'react';
// import ComingSoonImg from '@/assets/images/ComingSoon.svg';
// import { useGetBtiOpenGame } from '@/hooks/gameProvider/bti/useGetBtiOpenGame';
import { Spin } from 'antd';
import { API_URL } from '@/utils';
import { useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';

const index: React.FC = () => {
    const { data: user, isFetching } = useGetIdentity<TMe>();
    // const { data, isFetching } = useGetBtiOpenGame();
    if (isFetching) return <Spin size="large" className="w-full h-screen flex justify-center items-center" />;

    // 創建一個新的 <iframe> 元素
    // const iframe = document.createElement('iframe');

    // // 將 API 回應的 HTML 內容設定為 iframe 的內容
    // iframe.srcdoc = data?.data as unknown as string;

    // // 將 <iframe> 添加到你當前的網頁中的某個元素中
    // const container = document.getElementById('bitContent'); // 替換為你的容器元素的 ID
    // container?.appendChild(iframe);

    return (
        <div className="sportPage  sm:my-9 sm:gap-8 my-4 w-full ">
            {/* <div id="bitContent" className="w-full h-full" /> */}
            <div className="rounded-2xl sm:mx-4 sm:py-4 sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
                <iframe src={`${API_URL}/api/bti/opengame?user_id=${user?.id}`} className="w-full h-full" />
            </div>
        </div>
    );
};

export default index;
