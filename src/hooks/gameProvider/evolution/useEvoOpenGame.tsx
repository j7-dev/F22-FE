/**
 * EVO開啟遊戲hook
 * 不用傳入參數
 * 將方法handleClick 與 isLoading狀態封裝成openGameFn物件暴露出去
 */
import { useCustomMutation } from '@refinedev/core';
import { TGame } from '@/types/games';
import { TMe } from '@/types';
import { API_URL } from '@/utils';

const evoGameConfig = {
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

export const useEvoOpenGame = () => {
    const { mutate: openGame, isLoading } = useCustomMutation();

    const handleClick = ({ item, identity: _ }: { item: TGame; identity: TMe }) => {
        evoGameConfig.config.game.category = item['Game Type'] as string;
        evoGameConfig.config.game.table.id = item['Table ID'] as string;
        openGame(
            {
                url: `${API_URL}/api/evo/opengame`,
                method: 'post',
                values: evoGameConfig,
            },
            {
                onSuccess: (entryData) => {
                    const url = entryData.data.entry;
                    //判斷是否為safari
                    const isSmartBet = /smartbet/i.test(navigator.userAgent);
                    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                    if (isSafari || isSmartBet) {
                        //當前頁面跳轉
                        window.location.href = url;
                    } else {
                        //否則開新分頁
                        window.open(url, '_blank');
                    }
                },
                onError: (error) => {
                    console.log('error', error);
                },
            },
        );
    };

    return {
        handleClick,
        isLoading,
    };
};
