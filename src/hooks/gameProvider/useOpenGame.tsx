import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useCustomMutation, useGetIdentity, useGetLocale } from '@refinedev/core';
import { useAtomValue, useSetAtom } from 'jotai';
import { API_URL } from '@/utils';
import { TPopularGame } from '@/types/games/popularGames';
import { IsLoginAtom, popupIsOpenAtom } from '@/components/ContentLayout/Header/LoginModule';

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
    const { data: identity } = useGetIdentity<{ id: number; username: string }>();
    const { mutate: openGame, isLoading } = useCustomMutation();
    const isLogin = useAtomValue(IsLoginAtom);
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    const locale = useGetLocale();
    const currentLocale = locale();

    const handleClick = (item: TPopularGame) => () => {
        if (!isLogin) {
            setPopupIsOpen(true);
            return;
        } else if (identity) {
            if (item.gameProviderName === 'Evolution') {
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
            } else if (item.gameProviderName === 'Pragmatic') {
                openGame(
                    {
                        url: `${API_URL}/api/pp/opengame?language=${currentLocale}&symbol=${item?.gameID || ''}&user_id=${identity?.id}`,
                        method: 'post',
                        values: {},
                    },
                    {
                        onSuccess: (entryData) => {
                            console.log('entryData', entryData);
                            window.open(entryData.data.gameURL, '_blank');
                            // console.log('URL', entryData);
                        },
                        // onError: (error) => {
                        //     console.log('error', error);
                        // },
                    },
                );
            } else if (item.gameProviderName === 'Golf') {
                console.log('Golf');

                openGame(
                    {
                        url: `https://api7854.igxv2.net/get_otp_id.aspx?api_key=D04967AF6CC44EDB9C5FF32D23837350&agent_code=KR0801SB&login_id=${identity?.id}&name=${identity?.username}&channel=WEB`,
                        method: 'post',
                        values: {},
                    },
                    {
                        onSuccess: (data) => {
                            //TODO 沒意外應該是這樣=>等後端開API出來再測試
                            console.log('data', data);
                            const otp_id = data.data.otp_id;
                            //创建一个 FormData 对象
                            const formData = new FormData();
                            formData.append('otp_id', otp_id);
                            formData.append('login_id', identity?.id as unknown as string);
                            formData.append('lang', currentLocale as string);
                            openGame({
                                url: 'https://pw.igxv2.net/api/auth_login.aspx',
                                method: 'post',
                                config: {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                },
                                values: formData,
                            });
                        },
                        onError: (error) => {
                            console.log('error', error);
                        },
                    },
                );
            }
        }
    };

    return { isLoading, handleClick, gameconfig, setGameconfig };
};
