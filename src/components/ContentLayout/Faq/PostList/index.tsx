import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import PostDetail from './PostDetail';
import { TFaq } from '@/types/resources';

const index: React.FC<{
    categoryData?: TFaq[];
}> = ({ categoryData }) => {
    const { t } = useTranslation();
    const [isShowContent, setIsShowContent] = useState(false);
    const [postContent, setPostContent] = useState({} as TFaq);
    const handleSetPost = (content: TFaq) => {
        setPostContent(content);
        setIsShowContent(true);
    };

    useEffect(() => {
        setIsShowContent(false);
        setPostContent({} as TFaq);
    }, [categoryData]);
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="pageHeader font-bold text-[#2B3240] text-sm p-2.5">{t(categoryData?.[0].category?.value as string)}</div>
            {isShowContent && <PostDetail postData={postContent} />}
            <div className="pageContent w-full flex flex-col">
                <div className="tableHeader h-10 w-full items-center flex flex-row bg-[#2B3240] text-white p-2 font-bold text-[13px]">
                    <div className="tableNo w-20 text-center">{t('No')}</div>
                    <div className="tableTitle w-8/12">{t('Title')}</div>
                    <div className="tableDate w-48 text-center">{t('Date Created')}</div>
                </div>
                <div className="tableContent ">
                    {categoryData?.map((item) => (
                        <div key={nanoid()} className="contentList min-h-[40px] w-full items-center flex flex-row  p-2 font-bold text-[13px]">
                            <div className="tableNo w-20 text-center">{item.id}</div>
                            <div className="tableTitle w-8/12 hover:text-[#78D39D] cursor-pointer" onClick={() => handleSetPost(item)}>
                                {t(item.title)}
                            </div>
                            <div className="tableDate w-48 text-center">{item.createdAt}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default index;
