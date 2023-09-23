import React from 'react';
import { useTranslation } from 'react-i18next';
import { useList, useGetIdentity } from '@refinedev/core';
// import { serviceCenterAtom, isShowContentAtom, postContentAtom, PostContent } from '@/components/ContentLayout/Customer/ServiceCenter';
// import SinglePost from '@/components/ContentLayout/Customer/PostList/PostDetail';
// import { useAtom, useAtomValue, useSetAtom } from 'jotai';
// import { nanoid } from 'nanoid';
import { TsiteNotify, TUser } from '@/types/custom/user';
import NotifyList from './NotifyList';
//TODO 站內信先拿其他版型覆蓋，待改寫
const index: React.FC = () => {
    const { t } = useTranslation();
    // const serviceCenterValue = useAtomValue(serviceCenterAtom);
    // const [isShowContent, setIsShowContent] = useAtom(isShowContentAtom);
    // const setPostContent = useSetAtom(postContentAtom);
    const { data: identity } = useGetIdentity<TUser>();
    console.log('identity', identity);
    const { data: siteNotify, isLoading } = useList<TsiteNotify>({
        resource: 'cms-posts',
        meta: {
            populate: '*',
        },
        filters: [
            {
                field: 'post_type',
                operator: 'eq',
                value: 'site-notify',
            },
        ],
    });
    console.log('siteNotify', siteNotify);
    const siteNotifyData = siteNotify?.data as [];

    // const handleClick = (data: PostContent) => {
    //     setIsShowContent(true);
    //     setPostContent(data);
    // };
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="pageHeader font-bold text-[#2B3240] text-sm p-2.5">{t('站内信쪽지')}</div>
            {/* {isShowContent && <SinglePost />} */}
            {isLoading ? 'isLoading...' : <NotifyList siteNotifyData={siteNotifyData} />}
        </div>
    );
};

export default index;
