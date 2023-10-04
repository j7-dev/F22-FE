import { useMemo } from 'react';
import { useList } from '@refinedev/core';
import { getGameTypeImg } from '@/components/ContentLayout/Games/Game/GameImg';
import { TPopularGame } from '@/types/resources/popularGames';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';
import { useOpenGame } from '@/hooks/gameProvider/evolution/useOpenGame';
import { getRandomIndexes } from '@/hooks/gameProvider/getRandomIndexes';
import { gameCategories, mappingGameCategory } from '@/utils/GameCategory';

//TODO 完善gameCategories與mappingGameCategory的整合

export const useGetPopularGames = () => {
    //取得pp遊戲資料
    const { data: ppData, isLoading: ppLoading } = useGetPPTableList();
    //重組Slot Games遊戲資料
    const slotGames =
        (ppData || [])?.slice(0, 6).map((item: TPopularGame) => {
            return {
                ...item,
                gameID: item.gameID,
                gameImg: item.gameImg,
                category: mappingGameCategory({
                    gameProviderName: 'PP',
                    // gameProviderCategory: item.typeDescription,
                }),
            };
        }) || [];

    //取得evo遊戲資料
    const { data: evoData, isLoading: evoLoading } = useList({
        resource: 'evo/tablelist',
    });
    //重組Live Casino遊戲資料
    const liveGamesData = useMemo(() => {
        return (evoData?.data || []).slice(0, 6).map((item: TPopularGame) => {
            return {
                ...item,
                gameID: item['Table ID'],
                gameImg: getGameTypeImg(item['Game Type'] as string),
                category: mappingGameCategory({
                    gameProviderName: 'EVO',
                    // gameProviderCategory: item.typeDescription,
                }),
            };
        });
    }, [evoLoading]);

    //重組所有遊戲資料
    const allGamesArray = [...liveGamesData, ...slotGames] as TPopularGame[];
    // 獲取隨機的6個元素
    //TODO 有個BUG，切換語言時會多一個遊戲=>觸發重新渲染時會多一個?
    const randomIndexes = getRandomIndexes(allGamesArray, 6);
    const sixPoplarAllGames = randomIndexes.map((index) => allGamesArray[index]);

    //取得openGame(Evo)
    const { isLoading: openGameLodaing, handleClick } = useOpenGame();
    const PopularGamesData = [
        {
            label: 'All Games',
            value: 'allGames',
            gameData: sixPoplarAllGames, //隨機取得所有遊戲中的6個
            openGameLoading: openGameLodaing,
            openGame: handleClick,
        },
        ...gameCategories.map((CategoryItem) => ({
            label: CategoryItem.label,
            value: CategoryItem.value,
            gameData: allGamesArray.filter((game) => game?.category === CategoryItem?.value),
            openGameLoading: openGameLodaing,
            openGame: handleClick,
        })),
    ];

    const loading = !(evoLoading || ppLoading);
    return { PopularGamesData, loading };
};
