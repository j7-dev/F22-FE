import type { ColumnsType } from 'antd/es/table';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import { useTranslation } from 'react-i18next';

type DataType = any;

const useColumns = () => {
    const { t } = useTranslation();
    const columns: ColumnsType<DataType> = [
        {
            title: t('Game Provider'),
            dataIndex: 'gameProvider',
            key: 'gameProvider',
        },
        {
            title: t('Transaction Amounts'),
            dataIndex: 'txnAmount',
            key: 'txnAmount',
        },
        {
            title: t('Valid Bet Amount'),
            dataIndex: 'validBetAmount',
            key: 'validBetAmount',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('Pay out'),
            dataIndex: 'payOut',
            key: 'payOut',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
        {
            title: t('win/loss'),
            dataIndex: 'winLoss',
            key: 'winLoss',
            render: (v: number) => <SimpleAmount amount={v} />,
        },
    ];

    return columns;
};

export default useColumns;
