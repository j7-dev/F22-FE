import RTPData from './RTP.json';

/**
 * 傳入PP遊戲ID，回傳遊戲RTP
 * 否則回傳null
 */
type TRTP = {
    [key: string]: string;
};
export const mappingRTP = (gameID: string) => {
    const RTP: TRTP = RTPData;
    return RTP[gameID as keyof TRTP] ?? null;
};
