type cash = {
    cashDate: string;
    cashFor: string;
    cashAmount: string;
    request: string;
    [key: string]: any;
};

export const cashHistoryTitle = [
    { label: 'cash Date', value: 'cashDate' },
    { label: 'cash For', value: 'cashFor' },
    { label: 'cash Amount', value: 'cashAmount' },
    { label: 'Request', value: 'request' },
];
export const cashHistory: cash[] = [
    {
        cashDate: '2023/12/31',
        cashFor: 'Deposit',
        cashAmount: '100',
        request: 'success',
    },
    {
        cashDate: '2023/12/31',
        cashFor: 'Deposit',
        cashAmount: '100',
        request: 'success',
    },
    {
        cashDate: '2023/12/31',
        cashFor: 'Withdraw',
        cashAmount: '100',
        request: 'success',
    },
    {
        cashDate: '2023/12/31',
        cashFor: 'Deposit',
        cashAmount: '100',
        request: 'success',
    },
    {
        cashDate: '2023/12/31',
        cashFor: 'Withdraw',
        cashAmount: '100',
        request: 'success',
    },
];
