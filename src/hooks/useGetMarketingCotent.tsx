import { useList } from '@refinedev/core';
export const useGetMarketingCotent = ({ position }: { position: string }) => {
    const { data: fetchData, isLoading } = useList({
        resource: 'cms-marketing-contents', //TODO 這邊後端要改正確拼法
        meta: {
            populate: '*',
        },
        filters: [
            {
                field: 'position',
                operator: 'eq',
                value: position,
            },
        ],
    });

    const data = fetchData?.data.map((item) => {
        return {
            content: item?.content,
        };
    });
    return {
        data,
        isLoading,
    };
};
