import React from 'react';
import { useTranslation } from 'react-i18next';
import { useList } from '@refinedev/core';
import { atom, useAtomValue } from 'jotai';
import { TSiteNotify } from '@/types';
import NotifyList from './NotifyList';
import PostDetail from './NotifyList/PostDetail';

export const isShowDetailAtom = atom(false);
export const notifyDetailAtom = atom<TSiteNotify>({
    title: '',
    content: '',
    createdAt: '',
    id: 0,
    post_type: 'siteNotify',
});

const index: React.FC = () => {
    const { t } = useTranslation();
    const isShowContent = useAtomValue(isShowDetailAtom);

    const { data: siteNotify, isLoading } = useList<TSiteNotify>({
        resource: 'cms-posts',
        meta: {
            populate: '*',
        },
        filters: [
            {
                field: 'post_type',
                operator: 'eq',
                value: 'siteNotify',
            },
        ],
    });

    const siteNotifyData = siteNotify?.data as [];

    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="pageHeader font-bold text-[#2B3240] text-sm p-2.5">{t('站内信쪽지')}</div>
            {isShowContent && <PostDetail />}
            {isLoading ? 'isLoading...' : <NotifyList siteNotifyData={siteNotifyData} />}
        </div>
    );
};

export default index;
