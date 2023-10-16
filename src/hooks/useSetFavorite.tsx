import { useGetIdentity, useUpdate } from '@refinedev/core';
import { useSetAtom } from 'jotai';
import { popupIsOpenAtom } from '@/components/ContentLayout/Header/LoginModule';
import { TGame } from '@/types/games';
import { TMe } from '@/types';
import { useQueryClient } from '@tanstack/react-query';

export const useSetFavorite = (item: TGame) => {
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const queryClient = useQueryClient();
    const { data: user } = useGetIdentity<TMe>();
    const { mutate, isLoading } = useUpdate();
    //取得目前的favorite_games
    const favorite_games_obj = user?.favorite_games || {};

    const handleClick = (isSetToFavorite: boolean) => {
        console.log('⭐  item:', item);

        if (!user) {
            setPopupIsOpen(true);
            return;
        }
        const gameProviderName = item.gameProviderName;
        const gameID = item.gameID;

        const favorite_games = favorite_games_obj?.[gameProviderName as string] || [];

        const get_new_favorite_games = () => {
            if (isSetToFavorite) {
                return [...new Set([...favorite_games, gameID])];
            } else {
                return favorite_games.filter((id) => id !== gameID);
            }
        };
        const new_favorite_games = get_new_favorite_games();
        mutate(
            {
                resource: 'users',
                values: {
                    favorite_games: {
                        ...favorite_games_obj,
                        [gameProviderName as string]: new_favorite_games,
                    },
                },
                id: user?.id as number,
            },
            {
                onError: (error) => {
                    // An error occurred!
                    console.log(error);
                },
                onSuccess: () => {
                    // Let's celebrate!
                    queryClient.invalidateQueries(['getUserIdentity']);
                },
            },
        );
    };

    const isFavorite = favorite_games_obj?.[item?.gameProviderName as string]?.includes(item?.gameID as string);

    return { handleClick, isLoading, isFavorite };
};
