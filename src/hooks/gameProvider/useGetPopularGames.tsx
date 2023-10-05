import { useMemo } from 'react';
import { TPopularGame, TPopularGamesData } from '@/types/games/popularGames';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';
import { useOpenGame } from '@/hooks/gameProvider/useOpenGame';
import { useGetEVOTableList } from '@/hooks/gameProvider/evolution/useGetEVOTableList';
// import { getRandomIndexes } from '@/hooks/gameProvider/getRandomIndexes';
import { gameCategories, mappingGameCategory } from '@/utils/GameCategory';
import igxImg from '@/assets/images/game_provider/igx_icon.png';
import { sampleSize } from 'lodash-es';

//TODO BUG =>allGamesArray順序會亂跳

export const useGetPopularGames = () => {
    //取得openGame函式
    const { isLoading: openGameLoading, handleClick } = useOpenGame();
    //取得pp遊戲資料
    const { data: ppData, isLoading: ppLoading } = useGetPPTableList();
    //取得evo遊戲資料
    const { data: evoData, isLoading: evoLoading } = useGetEVOTableList();

    //取得所有資料後再重組
    const isLoading = evoLoading || ppLoading;

    // console.log('loading:為true');
    //重組Slot Games遊戲資料
    const slotGames = isLoading
        ? []
        : (ppData || [])?.slice(0, 6).map((item: TPopularGame, i: number) => {
              return {
                  ...item,
                  index: i,
                  gameID: item.gameID,
                  category: mappingGameCategory({ gameProviderName: 'PP' }),
              };
          });

    // console.log('slotGames:', slotGames);

    //重組Live Casino遊戲資料
    const liveGamesData = isLoading
        ? []
        : (evoData || []).slice(0, 6).map((item: TPopularGame, i) => {
              return {
                  ...item,
                  index: i,
                  gameID: item['Table ID'],
                  category: mappingGameCategory({ gameProviderName: 'EVO' }),
              };
          });

    //重組一個假的Golf遊戲資料
    const golfGamesData = [
        {
            gameID: 'Golf',
            gameImg: igxImg,
            gameProviderName: 'Golf',
            category: 'golf',
        },
    ];

    // console.log('liveGamesData:', liveGamesData);
    // const allGames = [...(ppData || []), ...(evoData || [])];
    // console.log('allGames', allGames);
    //重組所有遊戲資料
    const allGamesArray = useMemo(() => {
        return isLoading ? [] : [...liveGamesData, ...slotGames, ...golfGamesData];
    }, [isLoading]);
    // console.log('🚀  allGamesArray:', allGamesArray);

    // 獲取隨機的6個元素
    //TODO 有個BUG，切換語言時會多一個遊戲=>觸發重新渲染時會多一個?

    const sixPoplarAllGames = useMemo(() => {
        return sampleSize(allGamesArray, 6);
    }, [isLoading]);

    //根據gameCategories map出PopularGamesData
    const PopularGamesData: TPopularGamesData = [
        {
            label: 'All Games',
            value: 'allGames',
            gameData: sixPoplarAllGames, //隨機取得所有遊戲中的6個
            openGameLoading: openGameLoading,
            openGame: handleClick,
        },
        ...gameCategories.map((CategoryItem) => ({
            label: CategoryItem.label,
            value: CategoryItem.value,
            gameData: allGamesArray.filter((game) => game?.category === CategoryItem?.value),
            openGameLoading: openGameLoading,
            openGame: handleClick,
        })),
    ];
    // console.log('allGamesArray:', allGamesArray);
    return { PopularGamesData, isLoading };
};
