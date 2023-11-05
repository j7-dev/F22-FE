import type { ColumnsType } from 'antd/es/table';
import SimpleAmount from '@/components/Admin/SimpleAmount';

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
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: 'Pay out',
            dataIndex: 'payOut',
            key: 'payOut',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: 'win/loss',
            dataIndex: 'winLoss',
            key: 'winLoss',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
    ];

    return columns;
};

export default useColumns;
