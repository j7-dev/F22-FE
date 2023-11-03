import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TPopularGamesData, TPopularGames, TGame } from '@/types/games';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';
import { useGetEVOTableList } from '@/hooks/gameProvider/evolution/useGetEVOTableList';
import { gameCategories } from '@/utils/GameCategory';
import { sampleSize } from 'lodash-es';
import { TGameCategory } from '@/types/games/gameCategory';
import btiIcon from '@/assets/images/game_provider/bti_icon.png';
import igxIcon from '@/assets/images/game_provider/igx_icon.png';
import { tokenData } from '@/utils/providerData/Token';

export const useGetPopularGames = () => {
    const { t } = useTranslation();
    //取得pp遊戲資料
    const { data: ppData, isFetching: ppLoading } = useGetPPTableList();
    //取得evo遊戲資料
    const { data: evoData, isFetching: evoLoading } = useGetEVOTableList();

    //取得所有資料後再重組
    const isLoading = evoLoading || ppLoading;

    //只取得Slot Games 18款遊戲資料
    const slotGames = isLoading ? [] : ([...ppData].filter((item) => item.gameCategory === 'slot') || [])?.slice(0, 16);

    //只取得Live Casino 18款遊戲資料
    const liveGamesData = isLoading ? [] : ([...evoData, ...ppData.filter((item) => item.gameCategory === 'casino')] || [])?.slice(0, 16);
    //設定Sport Games 為BTI
    const sportGamesData = [
        {
            gameName: t('Sports'),
            gameCategory: 'sports',
            gameProviderName: 'sports',
            gameImg: btiIcon,
        },
    ];
    //InPlay Games 為BTI#live
    const inPlayGamesData = [
        {
            gameName: t('In Play'),
            gameCategory: 'inPlay',
            gameProviderName: 'inPlay',
            gameImg: btiIcon,
        },
    ];
    //Golf Games 為IGX
    const golfGamesData = [
        {
            gameName: t('Golf'),
            gameCategory: 'golf',
            gameProviderName: 'golf',
            gameImg: igxIcon,
        },
    ];

    //取得Token遊戲資料
    const tokenGamesData = tokenData;
    //重組所有遊戲資料
    const allGamesArray = useMemo(() => {
        return isLoading ? [] : [...liveGamesData, ...slotGames, ...sportGamesData, ...inPlayGamesData, ...golfGamesData, ...tokenGamesData];
    }, [isLoading]);

    // 獲取隨機的6個元素
    const sixPoplarAllGames = useMemo(() => {
        return sampleSize(allGamesArray, 16);
    }, [isLoading]);

    //根據gameCategories map出PopularGamesData
    const PopularGamesData: TPopularGamesData = [
        {
            label: 'All Games',
            value: 'allGames',
            gameData: sixPoplarAllGames as TGame[],
        },
        ...(gameCategories
            .filter((CategoryItem: TGameCategory) => CategoryItem.value !== 'events') //過濾掉events
            .map((CategoryItem: TGameCategory) => {
                return {
                    label: CategoryItem.label,
                    value: CategoryItem.value,
                    gameData: sampleSize(
                        allGamesArray.filter((game) => game?.gameCategory === CategoryItem?.value),
                        16,
                    ),
                };
            }) as TPopularGames[]),
    ];
    return { PopularGamesData, isLoading };
};
