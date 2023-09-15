import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DataType } from './types';
import { FakeAlert } from '@/components/PureComponents';
import { tableData } from '../atom';

const index = () => {
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
            <FakeAlert />
            <Table rowKey="date" columns={columns} dataSource={tableData} pagination={false} />;
        </>
    );
};

export default index;
