import { useList } from '@refinedev/core';
import { TCmsPost } from '@/types/resources/cmsPosts';

export const useGetMarketingContent = ({ position }: { position: string }) => {
    const { data: fetchData, isLoading } = useList<TCmsPost>({
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
            ...item,
            content: item?.content,
        };
    });
    return {
        data,
        isLoading,
    };
};
