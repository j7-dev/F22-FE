import { gameProviderTxnEnum } from '@/utils';

export type TGameProvider = {
    label: string;
    value: string;
    gameCategories: string[];
    providerData?: TProviderData;
};

export type TGameProviderTxnEnum = keyof typeof gameProviderTxnEnum;

export type TProviderData = {
    providerMainImg?: string;
    providerSmallIcon?: string;
    providerFavIcon?: string;
    providerWhiteIcon?: string;
    providerDescribe?: string;
    providerPath?: string;
};

export type TGame = TEvolutionGame &
    TPragmaticGame &
    TToken & {
        gameID?: string;
        casinoCategory?: string; //casino 遊戲分類
        casinoCategoryIcon?: string; //casino 遊戲分類 icon
        gameCategory?: string; //七大遊戲分類
        gameProviderName?: string;
        gameImg?: string;
        gameListFavIcon?: string;
        isFavorite?: boolean;
    };

export type TEvolutionGame = {
    'Table Name'?: string;
    'Table ID'?: string;
    'Direct Launch Table ID'?: string;
    'Game Type'?: string;
    'Bet Limit'?: {
        KRW: {
            symbol: string;
            min: number;
            max: number;
        };
    };
};

export type TPragmaticGame = {
    gameID?: string;
    gameName?: string;
    gameTypeID?: string;
    typeDescription?: string;
    technology?: string;
    platform?: string;
    demoGameAvailable?: boolean;
    aspectRatio?: string;
    technologyID?: string;
    gameIdNumeric?: number;
    jurisdictions?: string[];
    gameRTP?: number;
};
export type TToken = {
    gtype?: string;
    openFn?: 'blank' | 'iframe';
};
