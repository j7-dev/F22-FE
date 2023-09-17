import { useCustom } from '@refinedev/core';
import { F22_API_URL, F22_TOKEN } from 'utils/env';

interface PostUniqueCheckResponse {
    data: [];
    isAvailable: boolean;
}

export const useGetEvoTableList = () => {
    // console.log('useRefineAPI');
    // const corsURL = 'https://cors-anywhere.herokuapp.com/';
    // const appName = '4w7ga5btl92qgt7e';
    // const appPassword = '1a1e45c3f3a61930f545f2156548e17d';
    const apiUrl = `${F22_API_URL}/evo/tablelist`;
    // console.log('apiUrl', apiUrl);
    // const authHeader = btoa(`${appName}:${appPassword}`);
    const apiToken = F22_TOKEN;
    // console.log('apiToken', apiToken);
    const headers = {
        Authorization: `Bearer ${apiToken}`,
    };
    // console.log('headers', headers);
    const { data, isLoading } = useCustom<PostUniqueCheckResponse>({
        url: apiUrl,
        method: 'get',
        config: {
            headers: headers,
        },
    });

    // 將 data 和 isLoading 包裝在物件中並返回
    const apiData = {
        data,
        isLoading,
    };
    return apiData;
};
