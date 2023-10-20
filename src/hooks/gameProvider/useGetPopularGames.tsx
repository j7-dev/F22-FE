import { useMemo } from 'react';
import { TPopularGamesData, TPopularGame, TPopularGames } from '@/types/games/popularGames';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';
import { useOpenGame } from '@/hooks/gameProvider/useOpenGame';
import { useGetEVOTableList } from '@/hooks/gameProvider/evolution/useGetEVOTableList';
// import { getRandomIndexes } from '@/hooks/gameProvider/getRandomIndexes';
import { gameCategories } from '@/utils/GameCategory';
import igxImg from '@/assets/images/game_provider/igx_icon.png';
import { sampleSize } from 'lodash-es';
import { TGameCategory } from '@/types/games/gameCategory';

export const useGetPopularGames = () => {
    //取得openGame函式
    const { isLoading: openGameLoading, handleClick } = useOpenGame();
    //取得pp遊戲資料
    const { data: ppData, isLoading: ppLoading } = useGetPPTableList();
    //取得evo遊戲資料
    const { data: evoData, isLoading: evoLoading } = useGetEVOTableList();

    //取得所有資料後再重組
    const isLoading = evoLoading || ppLoading;

    //只取得Slot Games 18款遊戲資料
    const slotGames = isLoading ? [] : (ppData || [])?.slice(0, 16);

    // console.log('slotGames:', slotGames);

    //只取得Live Casino 18款遊戲資料
    const liveGamesData = isLoading ? [] : (evoData || []).slice(0, 16);

    //重組一個假的Golf遊戲資料
    const golfGamesData = [
        {
            gameID: 'Golf',
            gameImg: igxImg,
            gameProviderName: 'Golf',
            gameCategory: 'golf',
        },
    ];

    //重組所有遊戲資料
    const allGamesArray = useMemo(() => {
        return isLoading ? [] : [...liveGamesData, ...slotGames, ...golfGamesData];
    }, [isLoading]);
    // console.log('🚀  allGamesArray:', allGamesArray);

    // 獲取隨機的6個元素
    const sixPoplarAllGames = useMemo(() => {
        return sampleSize(allGamesArray, 16);
    }, [isLoading]);

    //根據gameCategories map出PopularGamesData
    const PopularGamesData: TPopularGamesData = [
        {
            label: 'All Games',
            value: 'allGames',
            gameData: sixPoplarAllGames as TPopularGame[],
            openGameLoading: openGameLoading,
            openGame: handleClick,
        },
        ...(gameCategories.map((CategoryItem: TGameCategory) => ({
            label: CategoryItem.label,
            value: CategoryItem.value,
            gameData: allGamesArray.filter((game) => game?.gameCategory === CategoryItem?.value),
            openGameLoading: openGameLoading,
            openGame: handleClick,
        })) as TPopularGames[]),
    ];
    return { PopularGamesData, isLoading };
};
