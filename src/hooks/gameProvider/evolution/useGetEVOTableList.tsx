// import { useList } from '@refinedev/core';
// import { useTranslation } from 'react-i18next';
// import { mappingGameCategory } from '@/utils/GameCategory';
// import { mappingCasinoCategory, mappingCasinoCategoryIcon } from '@/utils/GameCategory/casinoCategory';
import { TGame } from '@/types/games';
import { useGetSiteSetting } from '@/hooks/useGetSiteSetting';
// import { useGetImage } from './useGetImage';
import evoLobbyImg from '@/assets/images/game_provider/01EVO.png';
export const useGetEVOTableList = () => {
    // const { t } = useTranslation();
    //取得網站設定support_game_providers是否有包含EVO
    const { support_game_providers } = useGetSiteSetting();
    const inSupport = support_game_providers.includes('EVO');

    // const { data: fetchData, isFetching } = useList<TGame>({
    //     resource: 'evo/tablelist',
    //     queryOptions: {
    //         staleTime: 1000 * 60 * 60 * 24,
    //         cacheTime: 1000 * 60 * 60 * 24,
    //         enabled: inSupport,
    //     },
    // });
    //原始資料
    // const listData = fetchData?.data || [];
    //Evo Lobby
    //Casino 的遊戲商加上統一的formProviderCategory來分類
    //轉化資料=>近來的資料先排除rng-類別並加上gameProviderName和gameImg
    const data = inSupport
        ? [
              // ...listData
              //     .filter((item) => !(item['Game Type'] as string).startsWith('rng-'))
              //     .map((item: TGame) => {
              //         return {
              //             ...item,
              //             gameName: t(item['Table Name'] as string, { ns: 'evo' }),
              //             gameID: item['Direct Launch Table ID'],
              //             gameImg: useGetImage(item['Table Name'] as string),
              //             gameCategory: mappingGameCategory({ gameProviderName: 'evolution' }),
              //             gameProviderName: 'evolution',
              //             casinoCategory: mappingCasinoCategory({ category: item['Game Type'] as string }),
              //             casinoCategoryIcon: mappingCasinoCategoryIcon({ category: item['Game Type'] as string }),
              //         };
              //     }),
              {
                  gameName: 'Evolution Lobby',
                  gameImg: evoLobbyImg,
                  gameID: 'evolutionLobby',
                  gameCategory: 'casino',
                  gameProviderName: 'evolution',
                  casinoCategory: 'all',
              },
          ]
        : ([] as TGame[]);
    return { data };
};
