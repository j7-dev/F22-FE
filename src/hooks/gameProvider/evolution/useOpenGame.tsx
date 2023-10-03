import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useCustomMutation, useGetIdentity } from '@refinedev/core';
import { API_URL } from '@/utils';
import { TEvolutionGames } from '@/types/resources/popularGames';

const defaultConfig = {
    uuid: '123456789',
    player: {
        id: '1',
        update: true,
        firstName: 'evo',
        lastName: 'test',
        country: 'KR',
        nickname: 'evo',
        language: 'ko',
        currency: 'KRW',
        session: {
            id: '3ede6595ccf746bab923457b1bb48784',
            ip: '192.168.0.1',
        },
    },
    config: {
        game: {
            category: '',
            interface: 'view1',
            table: {
                id: '',
            },
        },
        channel: {
            wrapped: false,
            mobile: false,
        },
    },
};
export const useOpenGame = () => {
    const [gameconfig, setGameconfig] = useState(defaultConfig);
    const { data: identity } = useGetIdentity<{ id: number }>();
    const { mutate: openGame, isLoading } = useCustomMutation();

    const handleClick = (item: TEvolutionGames) => () => {
        if (identity) {
            const newGameConfig = cloneDeep(gameconfig);
            newGameConfig.config.game.category = item['Game Type'] as string;
            newGameConfig.config.game.table.id = item['Table ID'] as string;
            newGameConfig.player.id = identity.id.toString();
            openGame(
                {
                    url: `${API_URL}/api/evo/opengame`,
                    method: 'post',
                    values: newGameConfig,
                },
                {
                    onSuccess: (entryData) => {
                        window.open(entryData.data.entry, '_blank');
                        // console.log('URL', entryData);
                    },
                    // onError: (error) => {
                    //     console.log('error', error);
                    // },
                },
            );
        }
    };

    return { isLoading, handleClick, gameconfig, setGameconfig };
};
