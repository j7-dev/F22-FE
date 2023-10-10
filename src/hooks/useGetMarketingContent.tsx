import { useList } from '@refinedev/core';
export const useGetMarketingContent = ({ position }: { position: string }) => {
    const { data: fetchData, isLoading } = useList({
        resource: 'cms-marketing-contents',
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
