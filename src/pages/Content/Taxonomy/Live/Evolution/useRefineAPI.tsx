import { useCustom } from '@refinedev/core';

interface PostUniqueCheckResponse {
    data: [];
    isAvailable: boolean;
}

export const useRefineAPI = () => {
    const corsURL = 'https://cors-anywhere.herokuapp.com/';
    const appName = '4w7ga5btl92qgt7e';
    const appPassword = '1a1e45c3f3a61930f545f2156548e17d';
    const apiUrl = `https://stage-admin.asia-live.com/api/lobby/v1/${appName}/tablelist`;
    const authHeader = btoa(`${appName}:${appPassword}`);
    const headers = {
        Authorization: `Basic ${authHeader}`,
    };

    const { data, isLoading } = useCustom<PostUniqueCheckResponse>({
        url: corsURL + apiUrl,
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
