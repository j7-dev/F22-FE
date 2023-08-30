import React from 'react';
import ServiceMenu from '@/components/Layout/Customer/ServiceCenter';
import PostList from '@/components/Layout/Customer/PostList';

const customer: React.FC = () => (
    <div className="w-full bg-[#F6F7F7]">
        <div className="flex flex-row gap-5 max-w-[1260px] w-full m-auto justify-start items-start p-5 ">
            <div className="max-w-[300px] w-full">
                <ServiceMenu />
            </div>
            <div className="max-w-[900px] w-full">
                <PostList />
            </div>
        </div>
    </div>
);

export default customer;
