import React from 'react';
import { TFaq } from '@/types/resources';
const PostDetail: React.FC<{ postData: TFaq }> = ({ postData }) => {
    return (
        <div className="PostDetail ">
            <div className="postHeader h-10 w-full items-center flex justify-between flex-row bg-[#2B3240] text-white py-2 px-5 font-bold text-[13px]">
                <div className="postTitle">{postData?.title}</div>
                <div className="postDate ">{postData?.createdAt}</div>
            </div>
            <div className="postContent bg-[#F3F3F4] py-3 px-5 font-bold text-[13px]">{postData?.content}</div>
        </div>
    );
};

export default PostDetail;
