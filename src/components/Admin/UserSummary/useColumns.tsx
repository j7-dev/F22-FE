import type { ColumnsType } from 'antd/es/table';
import { useGetSiteSetting } from '@/hooks';
import Amount from '@/components/Admin/Amount';

type DataType = any;

const useColumns = () => {
    const siteSetting = useGetSiteSetting();
    const currency = siteSetting?.default_currency || 'KRW';
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
            render: (v: number) => <Amount amount={v || 0} currency={currency} symbol />,
        },
        {
            title: 'WINLOSS',
            dataIndex: 'winLoss',
            key: 'winLoss',
            render: (v: number) => <Amount amount={v || 0} currency={currency} symbol />,
        },
        {
            title: 'WIN',
            dataIndex: 'win',
            key: 'win',
            render: (v: number) => <Amount amount={v || 0} currency={currency} symbol />,
        },
    ];

    return columns;
};

export default useColumns;
