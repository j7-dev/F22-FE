import { useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';
import { TGame } from '@/types/games';

/**
 *
 * 暴露一個函式用來判斷是否為收藏遊戲
 * 如果用戶未登入則回傳空false
 * 如果用戶登入且有收藏該遊戲則回傳true
 * @param game 為遊戲資料
 * @returns isFavorite void
 */
export const useIsFavorite = () => {
    //取得用戶資料
    const { data: user } = useGetIdentity<TMe>();
    const isFavorite = (game: TGame) => {
        //如果未登入則回傳false
        if (!user) return false;
        //取得目前的favorite_games
        const favorite_games_obj = user?.favorite_games || {};
        //判斷favorite_games_obj裡面的[game?.gameProviderName]是一個包含gameID的陣列
        //回傳true或false
        return favorite_games_obj?.[game?.gameProviderName as string]?.includes(game?.gameID as string);
    };
    return { isFavorite };
};
