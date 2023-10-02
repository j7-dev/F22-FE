export type TPopularGames = {
    label: string;
    value: string;
    gameData: TPopularGame[];
};

export type TPopularGame = {
    gameID?: string;
    gameImg?: string;
};
