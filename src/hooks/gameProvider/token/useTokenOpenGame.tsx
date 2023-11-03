import { useCustomMutation } from '@refinedev/core';
import { TGame } from '@/types/games';
import { TMe } from '@/types';
import { API_URL } from '@/utils';

/**

 */
export const useTokenOpenGame = () => {
    const { mutate: openGame, isLoading } = useCustomMutation();

    const handleClick = ({ item: _, identity }: { item: TGame; identity: TMe }) => {
        //http: api.tgame365.com/api/?gtype=graph&uid=2427051&hash=8b2da7d6cf0bf16793042c186815b9e3
        openGame(
            {
                url: `${API_URL}/api/tokenapi/opengame`,
                method: 'post',
                values: {
                    user_id: identity.id,
                },
            },
            {
                onSuccess: (entryData) => {
                    console.log('⭐  entryData:', entryData);
                    // const url = entryData.data.entry;
                    // //判斷是否為safari
                    // const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                    // if (isSafari) {
                    // 		//當前頁面跳轉
                    // 		window.location.href = url;
                    // } else {
                    // 		//否則開新分頁
                    // 		window.open(url, '_blank');
                    // }
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
