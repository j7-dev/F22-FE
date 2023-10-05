import { useList } from '@refinedev/core';
import { getGameTypeImg } from '@/components/ContentLayout/Games/Game/GameImg';
import { mappingGameCategory } from '@/utils/GameCategory';

export const useGetEVOTableList = () => {
    const { data: fetchData, isLoading } = useList({
        resource: 'evo/tablelist',
    });
    //Casino 的遊戲商加上統一的formProviderCategory來分類
    //近來的資料先排除rng-類別並加上gameProviderName和gameImg
    const data =
        fetchData?.data
            .filter((item) => !item['Game Type'].startsWith('rng-'))
            .map((item: any) => {
                return {
                    ...item,
                    gameID: item['Table ID'],
                    gameImg: getGameTypeImg(item['Game Type'] as string),
                    formProviderCategory: item['Game Type'],
                    gameCategory: mappingGameCategory({ gameProviderName: 'EVO' }),
                    gameProviderName: 'Evolution',
                };
            }) || [];

    return { data, isLoading };
};
