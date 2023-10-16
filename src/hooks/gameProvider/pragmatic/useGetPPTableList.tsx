import { useApiUrl, useCustom } from '@refinedev/core';
import { mappingGameCategory } from '@/utils/GameCategory';
import { mappingRTP } from '@/utils/providerData/PPGameRTP';
// import { useGetPPImg } from '@/hooks/gameProvider/pragmatic/useGetPPImg';
import ProviderS_PragmaticPlay from '@/assets/images/game_provider/ProviderS_PragmaticPlay.svg';
import { TGame } from '@/types/games';

export const useGetPPTableList = () => {
    const apiUrl = useApiUrl();
    const gameServerDomain = 'https://smart-bet.prerelease-env.biz';

    const {
        data: fetchData,
        isLoading,
        isFetching,
    } = useCustom({
        url: `${apiUrl}/pp/getcasinogames`,
        method: 'post',
    });
    const data =
        fetchData?.data?.gameList.map((item: TGame) => {
            return {
                ...item,
                gameCategory: mappingGameCategory({ gameProviderName: 'PP' }),
                gameProviderName: 'pragmatic',
                gameImg: `${gameServerDomain}/game_pic/rec/325/${item.gameID}.png`,
                gameListFavIcon: ProviderS_PragmaticPlay,
                gameRTP: mappingRTP(item.gameID as string),
            };
        }) || [];

    return {
        data,
        isLoading,
        isFetching,
    };
};
