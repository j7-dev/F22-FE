import { useList } from '@refinedev/core';

export const useGetNoteBox = () => {
    const { data, isLoading } = useList({
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
    const dataCount = data?.total || 0;
    return {
        data,
        isLoading,
        dataCount,
    };
};
