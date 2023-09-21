import { useCustom } from '@refinedev/core';

interface PPTableListResponse {
    gameList: [];
    isAvailable: boolean;
}

export const useGetPPTableList = () => {
    // console.log('useRefineAPI');
    const corsURL = 'https://cors-anywhere.herokuapp.com/';
    // const apiUrl = `${F22_API_URL}/evo/tablelist`;
    // // const authHeader = btoa(`${appName}:${appPassword}`);
    // const apiToken = F22_TOKEN;
    // const headers = {
    //     Authorization: `Bearer ${apiToken}`,
    // };
    const apiUrl = 'https://api.prerelease-env.biz/IntegrationService/v3/http/CasinoGameAPI/getCasinoGames';
    const params = {
        secureLogin: 'smbt_smartbet',
        hash: 'b7096972d63a5be14f489d334d594e6a',
    };
    //hash 算法 secret key=testKey
    //secureLogin=smbt_smartbettestKey =>做md5加密

    // console.log('params', params);
    // console.log('headers', headers);
    const { data, isLoading } = useCustom<PPTableListResponse>({
        url: `${corsURL}${apiUrl}?secureLogin=${params.secureLogin}&hash=${params.hash}`,
        method: 'post',
        // config: {
        //     query: { title: params },
        // },
    });

    // 將 data 和 isLoading 包裝在物件中並返回
    const apiData = {
        data,
        isLoading,
    };
    return apiData;
};
