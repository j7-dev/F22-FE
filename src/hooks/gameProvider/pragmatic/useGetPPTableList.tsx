import { useApiUrl, useCustom } from '@refinedev/core';
import { useTranslation } from 'react-i18next';
import { mappingGameCategory } from '@/utils/GameCategory';
import { mappingRTP } from '@/utils/providerData/PPGameRTP';
// import { useGetPPImg } from '@/hooks/gameProvider/pragmatic/useGetPPImg';
import ProviderS_PragmaticPlay from '@/assets/images/game_provider/ProviderS_PragmaticPlay.svg';
import { TGame } from '@/types/games';
import { useGetSiteSetting } from '@/hooks/useGetSiteSetting';
//TODO getCasinoGames的回傳會提供lobby ID=>測試
export const useGetPPTableList = () => {
    const { t } = useTranslation();
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
            //只篩選出Live games / Scratch card / Video Slots / Classic Slot4個分類
            ?.filter((item) => item.typeDescription === 'Live games' || item.typeDescription === 'Scratch card' || item.typeDescription === 'Video Slots' || item.typeDescription === 'Classic Slot')
            .map((item: TGame) => {
                return {
                    ...item,
                    gameName: t(item.gameName as string, { ns: 'pp' }),
                    gameCategory: mappingGameCategory({ gameProviderName: 'pragmaticPlay', gameProviderCategory: item.typeDescription }),
                    gameProviderName: 'pragmaticPlay',
                    casinoCategory: 'all', //TODO 之後在區分他的分類
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
