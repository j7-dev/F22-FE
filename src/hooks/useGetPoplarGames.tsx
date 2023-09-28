import { useList } from '@refinedev/core';
import { getGameTypeImg } from '@/components/ContentLayout/Games/Game/GameImg';
import { TPoplarGame } from '@/types/resources/poplarGames';

export const useGetPoplarGames = () => {
    const { data, isLoading: evoLoading } = useList({
        resource: 'evo/tablelist',
    });
    const liveGamesData = data?.data.slice(0, 6).map((item) => {
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
            gameData: [
                {
                    gameID: '1',
                    gameImg: '',
                },
            ],
        },
    ];
    const loading = { evoLoading };
    return { poplarGamesData, loading };
};
