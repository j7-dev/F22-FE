import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useDashboard from '../hooks/useDashboard';
import { TLineData, DataType } from '../types';
import { useTranslation } from 'react-i18next';

const index = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useDashboard();
    const winLossData = (data?.data?.data?.winLossRatio || []) as TLineData[];
    const validBetData = (data?.data?.data?.validBet || []) as TLineData[];
    const bettingAmountData = (data?.data?.data?.bettingAmount || []) as TLineData[];
    const onlineMembersData = (data?.data?.data?.onlineMembers || []) as TLineData[];
    const totalDeposit = (data?.data?.data?.totalDeposit || []) as TLineData[];

    const tableData: DataType[] = winLossData.map((item, i) => ({
        date: item.date,
        onlineMembers: (onlineMembersData?.[i]?.value || 0).toLocaleString(),
        bettingAmount: (bettingAmountData?.[i]?.value || 0).toLocaleString(),
        validBet: (validBetData?.[i]?.value || 0).toLocaleString(),
        winLoss: (item?.value || 0).toLocaleString(),
        totalDeposit: (totalDeposit?.[i]?.value || 0).toLocaleString(),
    }));

    const columns: ColumnsType<DataType> = [
        {
            title: t('Date'),
            dataIndex: 'date',
        },
        {
            title: t('Online Members'),
            dataIndex: 'onlineMembers',
        },
        {
            title: t('Betting Amount'),
            dataIndex: 'bettingAmount',
        },
        {
            title: t('Valid Bet'),
            dataIndex: 'validBet',
        },
        {
            title: t('Win / Loss'),
            dataIndex: 'winLoss',
        },
        {
            title: t('Total Deposit'),
            dataIndex: 'totalDeposit',
        },
    ];

    // 只會顯示最近7天  不含今天
    return (
        <>
            <Table loading={isLoading} rowKey="date" columns={columns} dataSource={tableData} pagination={false} />
        </>
    );
};

export default index;
