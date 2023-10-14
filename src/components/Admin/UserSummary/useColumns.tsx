import type { ColumnsType } from 'antd/es/table';
import Amount from '@/components/Admin/Amount';

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
            render: (v: number) => <Amount amount={v || 0} />,
        },
        {
            title: 'Pay out',
            dataIndex: 'payOut',
            key: 'payOut',
            render: (v: number) => <Amount amount={v || 0} />,
        },
        {
            title: 'win/loss',
            dataIndex: 'winLoss',
            key: 'winLoss',
            render: (v: number) => <Amount amount={v || 0} />,
        },
    ];

    return columns;
};

export default useColumns;
