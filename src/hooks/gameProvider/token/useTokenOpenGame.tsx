import { useCustomMutation } from '@refinedev/core';
import { TGame } from '@/types/games';
import { TMe } from '@/types';
import { API_URL } from '@/utils';

const TOKEN_OPEN_GAME_URL = 'https://api.tgame365.com/api/';

export const useTokenOpenGame = () => {
    const { mutate: openGame, isLoading } = useCustomMutation();

    const handleClick = ({ item, identity }: { item: TGame; identity: TMe }) => {
        console.log('⭐  item:', item);
        //http: api.tgame365.com/api/?gtype=graph&uid=2427051&hash=8b2da7d6cf0bf16793042c186815b9e3

        if (item.openFn === 'iframe') {
            //如果openFn === 'iframe'則打tokenapi/opengame取得uid和hash，再拼接url
            openGame(
                {
                    url: `${API_URL}/api/tokenapi/opengame`,
                    method: 'post',
                    values: {
                        user_id: identity.id,
                        gameCategory: item?.gameCategory,
                    },
                },
                {
                    onSuccess: (entryData: any) => {
                        console.log('⭐  entryData:', entryData);
                        //{"statuscode":"0","message":"OK","user_id":"1","uid":"2429837"}
                        const { uid, hash } = entryData?.data || {};

                        const args = {
                            gtype: item?.gtype,
                            uid,
                            hash,
                        };

                        const params = new URLSearchParams();
                        Object.keys(args).forEach((key) => params.append(key, args[key as keyof typeof args]));
                        const url = `${TOKEN_OPEN_GAME_URL}?${params.toString()}`;
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
        } else {
            //如果openFn !== 'iframe'則打tokenapi/startgame取得url
            openGame(
                {
                    url: `${API_URL}/api/tokenapi/startgame`,
                    method: 'post',
                    values: {
                        user_id: identity.id,
                        gtype: item?.gtype,
                        gameCategory: item?.gameCategory,
                    },
                },
                {
                    onSuccess: (entryData: any) => {
                        console.log('⭐  entryData:', entryData);
                        //{"statuscode":"0","message":"OK","user_id":"1","uid":"2429837"}
                        const { url } = entryData?.data || {};
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
        }
    };

    return {
        handleClick,
        isLoading,
    };
};
