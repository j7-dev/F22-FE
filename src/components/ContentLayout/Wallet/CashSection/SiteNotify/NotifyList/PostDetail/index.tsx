import React from 'react';
import { useAtomValue } from 'jotai';
import dayjs from 'dayjs';
import { notifyDetailAtom } from '../../../SiteNotify';

const PostDetail: React.FC = () => {
    const postContent = useAtomValue(notifyDetailAtom);

    return (
        <div className="PostDetail ">
            <div className="postHeader h-10 w-full items-center flex justify-between flex-row bg-[#2B3240] text-white py-2 px-5 font-bold text-[13px]">
                <div className="postTitle">{postContent.title}</div>
                <div className="postDate ">{dayjs(postContent.createdAt).format('YYYY-MM-DD')}</div>
            </div>
            <div className="postContent bg-[#F3F3F4] py-3 px-5 font-bold text-[13px]">{postContent.content}</div>
        </div>
    );
};

export default PostDetail;
