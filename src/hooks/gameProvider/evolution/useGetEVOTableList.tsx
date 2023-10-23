import { useList } from '@refinedev/core';
import { getGameTypeImg } from '@/components/ContentLayout/Games/Game/GameImg';
import { mappingGameCategory } from '@/utils/GameCategory';
import { mappingCasinoCategory, mappingCasinoCategoryIcon } from '@/utils/GameCategory/casinoCategory';
import { TGame } from '@/types/games';

export const useGetEVOTableList = () => {
    const {
        data: fetchData,
        isLoading,
        isFetching,
    } = useList<TGame>({
        resource: 'evo/tablelist',
        queryOptions: {
            staleTime: 1000 * 60 * 60 * 24,
            cacheTime: 1000 * 60 * 60 * 24,
        },
    });
    //Casino 的遊戲商加上統一的formProviderCategory來分類
    //近來的資料先排除rng-類別並加上gameProviderName和gameImg
    const data =
        (fetchData?.data || undefined)
            ?.filter((item) => !(item['Game Type'] as string).startsWith('rng-'))
            .map((item: TGame) => {
                return {
                    ...item,
                    gameName: item['Table Name'],
                    gameID: item['Table ID'],
                    gameImg: getGameTypeImg(item['Game Type'] as string),
                    gameCategory: mappingGameCategory({ gameProviderName: 'evolution' }),
                    gameProviderName: 'evolution',
                    casinoCategory: mappingCasinoCategory({ category: item['Game Type'] as string }),
                    casinoCategoryIcon: mappingCasinoCategoryIcon({ category: item['Game Type'] as string }),
                };
            }) || [];

    return { data, isLoading, isFetching };
};
