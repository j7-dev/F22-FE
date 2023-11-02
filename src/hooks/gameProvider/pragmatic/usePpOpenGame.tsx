/**
 * PP開啟遊戲hook
 * 不用傳入參數
 * 將方法handleClick 與 isLoading狀態封裝成openGameFn物件暴露出去
 */
import { useCustomMutation, useGetLocale } from '@refinedev/core';
import { API_URL } from '@/utils';
import { TGame } from '@/types/games';
import { TMe } from '@/types';

export const usePpOpenGame = () => {
    const { mutate: openGame, isLoading } = useCustomMutation();

    const locale = useGetLocale();
    const currentLocale = locale();

    const handleClick = ({ item, identity }: { item: TGame; identity: TMe }) => {
        openGame(
            {
                url: `${API_URL}/api/pp/opengame?language=${currentLocale}&symbol=${item?.gameID || ''}&user_id=${identity?.id}`,
                method: 'post',
                values: {},
            },
            {
                onSuccess: (entryData) => {
                    const url = entryData.data.gameURL;
                    const a = document.createElement('a');
                    document.body.appendChild(a);
                    a.style.display = 'none';
                    a.href = url;
                    a.target = '_blank';
                    a.click();
                    document.body.removeChild(a);

                    // window.open(entryData.data.gameURL, '_blank');
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
