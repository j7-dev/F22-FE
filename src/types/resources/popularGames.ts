export type TPopularGames = {
    label: string;
    value: string;
    gameData: TPopularGame[];
    openGame?: (item: TEvolutionGames) => () => void;
    openGameLoading?: boolean;
};

export type TPopularGame = TEvolutionGames & {
    gameID?: string;
    gameImg?: string;
};

export type TEvolutionGames = {
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
