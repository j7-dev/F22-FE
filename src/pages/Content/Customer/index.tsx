import React, { useEffect } from 'react';
import ServiceCenter from '@/components/ContentLayout/Customer/ServiceCenter';
import PostList from '@/components/ContentLayout/Customer/PostList';

const customer: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full bg-[#F6F7F7]">
            <div className="flex flex-row gap-5 md:flex-nowrap flex-wrap max-w-[1260px] w-full m-auto justify-start items-start p-5 pb-10">
                <div className="md:max-w-[300px] w-full ">
                    <ServiceCenter />
                </div>
                <div className="md:max-w-[900px] w-full">
                    <PostList />
                </div>
            </div>
        </div>
    );
};

export default customer;
