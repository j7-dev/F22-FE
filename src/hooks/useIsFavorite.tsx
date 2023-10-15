import { useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';
import { TGame } from '@/types/games';

/**
 * 用此來判斷遊戲是否為收藏遊戲
 * 如果用戶未登入則回傳false
 * 如果用戶登入且有收藏該遊戲則回傳true
 * @param game 為單筆遊戲資料
 * @returns boolean
 */
export const useIsFavorite = (game: TGame) => {
    const { data: user } = useGetIdentity<TMe>();
    if (!user) return false;
    const gameProviderName = game.gameProviderName;
    const gameID = game.gameID;
    const favoriteGame = user?.favorite_games || {};
    if (favoriteGame[gameProviderName as string]?.includes(gameID as string)) return true;
    return false;
};
