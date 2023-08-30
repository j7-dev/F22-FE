import React from 'react';
import { useAtomValue } from 'jotai';
import { postContentAtom } from '@/components/Layout/Customer/ServiceCenter';

const PostDetail: React.FC = () => {
    const postContent = useAtomValue(postContentAtom);

    return (
        <div className="PostDetail ">
            <div className="postHeader h-10 w-full items-center flex justify-between flex-row bg-[#2B3240] text-white py-2 px-5 font-bold text-[13px]">
                <div className="postTitle">{postContent.title}</div>
                <div className="postDate ">{postContent.date}</div>
            </div>
            <div className="postContent bg-[#F3F3F4] py-3 px-5 font-bold text-[13px]">
                {postContent.content}
            </div>
        </div>
    );
};

export default PostDetail;
