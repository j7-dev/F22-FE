import { useList } from '@refinedev/core';
import { getGameTypeImg } from '@/components/ContentLayout/Games/Game/GameImg';

export const useGetEVOTableList = () => {
    const { data: fetchData, isLoading } = useList({
        resource: 'evo/tablelist',
    });
    const data =
        fetchData?.data.map((item: any) => {
            return {
                ...item,
                gameProviderName: 'Evolution',
                gameImg: getGameTypeImg(item['Game Type'] as string),
            };
        }) || [];

    return { data, isLoading };
};
