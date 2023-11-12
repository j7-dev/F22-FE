export type TTable1 = {
    cashBalanceAmount: number;
    turnoverBonusBalanceAmount: number;
    dpAmount: number;
    dpUsers: number;
    wdAmount: number;
    wdUsers: number;
    dpWd: number;
};

export type TTable2 = {
    label: string;
    total: number;
    evo: number;
    pp: number;
    bti: number;
    igx: number;
}[];

export type TTable3 = {
    label: string;
    pending: number;
    confirmed: number;
}[];

export type TTable4 = {
    label: string;
    count: number;
}[];
