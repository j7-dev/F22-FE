import { useGetIdentity, useUpdate } from '@refinedev/core';
import { useSetAtom } from 'jotai';
import { popupIsOpenAtom } from '@/components/ContentLayout/Header/LoginModule';
import { TGame } from '@/types/games';
import { TMe } from '@/types';
// import { useQueryClient } from '@tanstack/react-query';

export const useSetFavorite = () => {
    // const queryClient = useQueryClient();

    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const { data: user } = useGetIdentity<TMe>();
    const { mutate, isLoading } = useUpdate();
    const handleClick = (item: TGame) => () => {
        if (!user) {
            setPopupIsOpen(true);
            return;
        }
        const gameProviderName = item.gameProviderName;
        const gameID = item.gameID;
        //取得目前的favorite_games
        const favorite_games_obj = user?.favorite_games || {};
        const favorite_games = favorite_games_obj?.[gameProviderName as string] || [];
        const new_favorite_games = [...favorite_games, gameID];
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
                onSuccess: (dataSuccess) => {
                    // Let's celebrate!
                    console.log('🚀~onSuccess', dataSuccess);
                    // queryClient.invalidateQueries(['getUserIdentity']);
                },
            },
        );
    };

    return { handleClick, isLoading };
};
