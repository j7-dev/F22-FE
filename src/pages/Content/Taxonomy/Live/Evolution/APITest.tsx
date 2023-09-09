import axios from 'axios';

export const APITest = async () => {
    const corsURL = 'https://cors-anywhere.herokuapp.com/';
    const appName = '4w7ga5btl92qgt7e';
    const appPassword = '1a1e45c3f3a61930f545f2156548e17d';
    const apiUrl = `https://stage-admin.asia-live.com/api/lobby/v1/${appName}/tablelist`;
    const authHeader = btoa(`${appName}:${appPassword}`);
    const headers = {
        Authorization: `Basic ${authHeader}`,
    };

    try {
        const response = await axios.get(corsURL + apiUrl, { headers });
        const extractedData = response.data;
        console.log(extractedData);
    } catch (error) {
        console.error('資料獲取失敗', error);
    }

    return;
};
