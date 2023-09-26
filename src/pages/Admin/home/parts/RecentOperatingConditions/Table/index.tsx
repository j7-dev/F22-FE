import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useDashboard from '../hooks/useDashboard';
import { TLineData, DataType } from '../types';

const index = () => {
    const { data, isLoading } = useDashboard();
    const winLossData = (data?.data?.data?.winLossRatio || []) as TLineData[];
    const validBetData = (data?.data?.data?.validBet || []) as TLineData[];
    const bettingAmountData = (data?.data?.data?.bettingAmount || []) as TLineData[];
    const onlineMembersData = (data?.data?.data?.onlineMembers || []) as TLineData[];
    const totalDeposit = (data?.data?.data?.totalDeposit || []) as TLineData[];

    const tableData: DataType[] = winLossData.map((item, i) => ({
        date: item.date,
        onlineMembers: onlineMembersData[i].value.toLocaleString(),
        bettingAmount: bettingAmountData[i].value.toLocaleString(),
        validBet: validBetData[i].value.toLocaleString(),
        winLoss: item.value.toLocaleString(),
        totalDeposit: totalDeposit[i].value.toLocaleString(),
    }));

    const columns: ColumnsType<DataType> = [
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Online Members',
            dataIndex: 'onlineMembers',
        },
        {
            title: 'Betting Amount',
            dataIndex: 'bettingAmount',
        },
        {
            title: 'Valid Bet',
            dataIndex: 'validBet',
        },
        {
            title: 'Win / Loss',
            dataIndex: 'winLoss',
        },
        {
            title: 'Total Deposit',
            dataIndex: 'totalDeposit',
        },
    ];

    // 只會顯示最近7天  不含今天
    return (
        <>
            <Table loading={isLoading} rowKey="date" columns={columns} dataSource={tableData} pagination={false} />;
        </>
    );
};

export default index;
