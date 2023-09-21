type rollover = {
    rolloveDate: string;
    rolloveGame: string;
    rolloveAmount: string;
    request: string;
    [key: string]: any;
};

export const rolloverHistoryTitle = [
    { label: 'Rollove Date', value: 'rolloveDate' },
    { label: 'Rollove Game', value: 'rolloveGame' },
    { label: 'Rollove Amount', value: 'rolloveAmount' },
    { label: 'Request', value: 'request' },
];
export const rolloverHistory: rollover[] = [
    {
        rolloveDate: '2023/12/31',
        rolloveGame: 'Baccarat SW',
        rolloveAmount: '100',
        request: 'success',
    },
    {
        rolloveDate: '2023/12/31',
        rolloveGame: 'Baccarat SW',
        rolloveAmount: '100',
        request: 'success',
    },
    {
        rolloveDate: '2023/12/31',
        rolloveGame: 'Baccarat SW',
        rolloveAmount: '100',
        request: 'success',
    },
    {
        rolloveDate: '2023/12/31',
        rolloveGame: 'Baccarat SW',
        rolloveAmount: '100',
        request: 'success',
    },
    {
        rolloveDate: '2023/12/31',
        rolloveGame: 'Baccarat SW',
        rolloveAmount: '100',
        request: 'success',
    },
];
