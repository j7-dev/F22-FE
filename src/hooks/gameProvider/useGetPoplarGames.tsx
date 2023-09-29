import { useList } from '@refinedev/core';
import { getGameTypeImg } from '@/components/ContentLayout/Games/Game/GameImg';
import { TPoplarGame } from '@/types/resources/poplarGames';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';

export const useGetPoplarGames = () => {
    const { data: evoData, isLoading: evoLoading } = useList({
        resource: 'evo/tablelist',
    });
    const { data: ppData, isLoading: ppLoading } = useGetPPTableList();

    const ppGamesData = ppData?.slice(0, 6).map((item: any) => {
        return {
            gameID: item.gameID,
            gameImg: item.gameImg,
        };
    }) as TPoplarGame[];

    const liveGamesData = evoData?.data.slice(0, 6).map((item) => {
        return {
            gameID: item['Table ID'],
            gameImg: getGameTypeImg(item['Game Type']),
        };
    }) as TPoplarGame[];

    const allGamesArray = liveGamesData ? [...liveGamesData] : ([] as TPoplarGame[]);
    const poplarGamesData = [
        {
            label: 'All Games',
            value: 'allGames',
            gameData: allGamesArray,
        },

        {
            label: 'Sport',
            value: 'sport',
            gameData: [],
        },
        {
            label: 'Live Casino',
            value: 'liveCasino',
            gameData: liveGamesData,
        },
        {
            label: 'Slot Games',
            value: 'slotGames',
            gameData: ppGamesData,
        },
    ];
    const loading = !(evoLoading || ppLoading);
    return { poplarGamesData, loading };
};
