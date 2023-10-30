/**
 * 傳送Vonage SMS
 */
import { useCustom } from '@refinedev/core';

const vonage_API_URL = 'https://api.nexmo.com/verify';
const API_KEY = '16b74f26';
const API_SECRET = 'QYvufA1DDonOs82G';

export const useVonageSMS = () => {
    const handleSendSMS = async (phoneNumber: string) => {
        const { data } = useCustom({
            method: 'get',
            url: `${vonage_API_URL}/json`,
            config: {
                query: {
                    api_key: API_KEY,
                    api_secret: API_SECRET,
                    number: phoneNumber,
                    brand: 'F22',
                },
            },
        });
        return data;
    };
    return { handleSendSMS };
};
