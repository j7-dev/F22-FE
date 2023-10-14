import { useApiUrl, useCustom } from '@refinedev/core';
import { mappingGameCategory } from '@/utils/GameCategory';
// import { useGetPPImg } from '@/hooks/gameProvider/pragmatic/useGetPPImg';
import ProviderS_PragmaticPlay from '@/assets/images/game_provider/providerS_PragmaticPlay.svg';
import { TGame } from '@/types/games';
export const useGetPPTableList = () => {
    const apiUrl = useApiUrl();
    const gameServerDomain = 'https://smart-bet.prerelease-env.biz';

    const { data: fetchData, isLoading } = useCustom({
        url: `${apiUrl}/pp/getcasinogames`,
        method: 'post',
    });
    const data =
        fetchData?.data?.gameList.map((item: TGame) => {
            return {
                ...item,
                gameCategory: mappingGameCategory({ gameProviderName: 'PP' }),
                gameProviderName: 'Pragmatic',
                gameImg: `${gameServerDomain}/game_pic/rec/325/${item.gameID}.png`,
                gameListFavIcon: ProviderS_PragmaticPlay,
            };
        }) || [];

    return {
        data,
        isLoading,
    };
};
