import { BaseRecord } from '@refinedev/core';
import { TEvolutionGame, TPragmaticGame } from './';

export type TPopularGamesData = TPopularGames[]

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
