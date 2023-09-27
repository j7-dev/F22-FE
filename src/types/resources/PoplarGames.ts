export type TPoplarGames = {
    data: {
        label: string;
        value: string;
        gameData: TPoplarGame;
    }[];
};

export type TPoplarGame = {
    gameID: string;
    gameImg: string;
}[];
