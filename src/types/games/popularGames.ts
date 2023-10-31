import { TGame } from './';

export type TPopularGamesData = TPopularGames[];

export type TPopularGames = {
    label: string;
    value: string;
    gameData: TGame[];
};
