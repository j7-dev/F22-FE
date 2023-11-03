import type { ColumnsType } from 'antd/es/table';

type DataType = any;

const useColumns = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Game Provider',
            dataIndex: 'gameProvider',
            key: 'gameProvider',
        },
        {
            title: 'Transaction Amounts',
            dataIndex: 'txnAmount',
            key: 'txnAmount',
        },
        {
            title: 'Valid Bet Amount',
            dataIndex: 'validBetAmount',
            key: 'validBetAmount',
            render: (v: number) => (v || 0).toLocaleString(),
        },
        {
            title: 'Pay out',
            dataIndex: 'payOut',
            key: 'payOut',
            render: (v: number) => (v || 0).toLocaleString(),
        },
        {
            title: 'win/loss',
            dataIndex: 'winLoss',
            key: 'winLoss',
            render: (v: number) => (v || 0).toLocaleString(),
        },
    ];

    return columns;
};

export default useColumns;
