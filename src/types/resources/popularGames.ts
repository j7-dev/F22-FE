import { BaseRecord } from '@refinedev/core';

export type TPopularGamesData = TPopularGames[];

export type TPopularGames = {
    label: string;
    value: string;
    gameData: TPopularGame[];
    openGame?: (item: TEvolutionGame) => () => void;
    openGameLoading?: boolean;
};

export type TPopularGame = TEvolutionGame &
    TPragmaticGame &
    BaseRecord & {
        gameID?: string;
        gameImg?: string;
        category?: string;
        gameProviderName?: string;
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
