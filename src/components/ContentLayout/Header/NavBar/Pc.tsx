import React from 'react';
import NewsMarquee from '@/components/ContentLayout/NewsMarquee';
import UserInfo from '@/components/ContentLayout/Header/UserInfo';
import LoginModule from '@/components/ContentLayout/Header/LoginModule';
import { useGetMarketingContent } from '@/hooks/useGetMarketingContent';

const Pc: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
    const { data } = useGetMarketingContent({ position: 'header' });
    const marqueeText = data?.map((item) => {
        return item?.content;
    });
    return (
        <div className="pcMenu hidden w-full relative transition-all duration-300 basis-full grow md:flex flex-row gap-16 justify-between items-center">
            <NewsMarquee marqueeText={marqueeText} />
            <div className="userSection flex items-center gap-2.5">
                {isLogin ? <UserInfo /> : ''}
                <LoginModule />
            </div>
        </div>
    );
};

export default Pc;
