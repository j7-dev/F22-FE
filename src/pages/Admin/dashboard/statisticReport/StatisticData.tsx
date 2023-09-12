import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

type DataType = {
    key: string;
    onlineMembers: string;
    ticket: string;
    totalBet: string;
    validBet: string;
    winLoss: string;
};

const StatisticData = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Online Members',
            dataIndex: 'onlineMembers',
        },
        {
            title: 'Ticket',
            dataIndex: 'ticket',
        },
        {
            title: 'Total Bet',
            dataIndex: 'totalBet',
        },
        {
            title: 'Valid Bet',
            dataIndex: 'validBet',
        },
        {
            title: 'Win / Loss',
            dataIndex: 'winLoss',
        },
    ];

    const data: DataType[] = [];
    return (
        <>
            <p>Statistic Data</p>
            <Table columns={columns} dataSource={data} />
            <hr className="my-8" />
        </>
    );
};

export default StatisticData;
