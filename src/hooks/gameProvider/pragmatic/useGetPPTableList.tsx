import { useApiUrl, useCustom } from '@refinedev/core';
import { mappingGameCategory } from '@/utils/GameCategory';
import { mappingRTP } from '@/utils/providerData/PPGameRTP';
// import { useGetPPImg } from '@/hooks/gameProvider/pragmatic/useGetPPImg';
import ProviderS_PragmaticPlay from '@/assets/images/game_provider/ProviderS_PragmaticPlay.svg';
import { TGame } from '@/types/games';
import { useGetSiteSetting } from '@/hooks/useGetSiteSetting';

export const useGetPPTableList = () => {
    //取得網站設定support_game_providers是否有包含PP
    const { support_game_providers } = useGetSiteSetting();
    const inSupport = support_game_providers.includes('PP');

    const apiUrl = useApiUrl();
    const gameServerDomain = 'https://smart-bet.prerelease-env.biz';

    const {
        data: fetchData,
        isLoading,
        isFetching,
    } = useCustom<{ gameList: TGame[] }>({
        url: `${apiUrl}/pp/getcasinogames`,
        method: 'post',
        queryOptions: {
            staleTime: 1000 * 60 * 60 * 24,
            cacheTime: 1000 * 60 * 60 * 24,
            enabled: inSupport,
        },
    });
    const data =
        fetchData?.data?.gameList
            //只篩選出Live games和Scratch card兩個分類
            ?.filter((item) => item.typeDescription === 'Live games' || item.typeDescription === 'Scratch card')
            .map((item: TGame) => {
                return {
                    ...item,
                    gameCategory: mappingGameCategory({ gameProviderName: 'pragmaticPlay', gameProviderCategory: item.typeDescription }),
                    gameProviderName: 'pragmaticPlay',
                    gameImg: `${gameServerDomain}/game_pic/rec/325/${item.gameID}.png`,
                    gameListFavIcon: ProviderS_PragmaticPlay,
                    gameRTP: mappingRTP(item.gameID as string),
                };
            }) || ([] as TGame[]);
    return {
        data,
        isLoading,
        isFetching,
    };
};
