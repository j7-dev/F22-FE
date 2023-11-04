/**切換分類邏輯
 * 第一層Provider分類
 * 第二層細項遊戲分類
 * 傳入第一層分類名稱與第二層分類名稱
 * 傳入遊戲列表
 * 回傳遊戲列表
 */
import { TGame } from '@/types/games';
import { useIsFavorite } from '@/hooks/useIsFavorite';

type filterGameProp = {
    provider?: string;
    category?: string;
    gameData: TGame[];
};
export const useGameFilter = () => {
    //取得判斷收藏遊戲方法
    const { isFavorite } = useIsFavorite();
    const filterGame =
        ({ provider, category, gameData }: filterGameProp) =>
        () => {
            //如果為all遊戲直接返回全部Data
            if (category === 'all') return gameData.filter((item) => item?.gameProviderName === provider);
            //如果為Favorite遊戲渲染Favorite Data
            if (category === 'favorite') return gameData.filter((item) => item?.gameProviderName === provider && isFavorite(item as TGame)) as [];
            //如果為其他分類，則渲染該分類的DataList
            return gameData.filter((item) => item?.gameProviderName === provider && item?.casinoCategory === category);
        };
    return { filterGame };
};
