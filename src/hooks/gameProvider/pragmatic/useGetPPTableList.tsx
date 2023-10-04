import { useApiUrl, useCustom } from '@refinedev/core';
// import { useGetPPImg } from '@/hooks/gameProvider/pragmatic/useGetPPImg';

export const useGetPPTableList = () => {
    const apiUrl = useApiUrl();
    const gameServerDomain = 'https://smart-bet.prerelease-env.biz';

    const { data: fetchData, isLoading } = useCustom({
        url: `${apiUrl}/pp/getcasinogames`,
        method: 'post',
    });
    const data =
        fetchData?.data?.gameList.map((item: any) => {
            return {
                ...item,
                gameProviderName: 'Pragmatic',
                gameImg: `${gameServerDomain}/game_pic/rec/325/${item.gameID}.png`,
            };
        }) || [];

    return {
        data,
        isLoading,
    };
};
