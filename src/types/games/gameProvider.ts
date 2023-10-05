export type TGameProvider = {
    label: string;
    value: string;
    gameCategories: string[];
    providerData: TProviderData;
};

export type TProviderData = {
    providerMainImg: string;
    providerSmallImg: string;
    providerFavIcon: string;
    providerDescribe: string;
    providerPath?: string;
};

export type TGame = TEvolutionGame &
    TPragmaticGame & {
        formProviderCategory?: string; //casino 遊戲商定義的遊戲分類
        gameProviderName?: string;
        gameImg?: string;
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
};
