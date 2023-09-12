import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

type DataType = {
    key: string;
    gameType: string;
    ticket: string;
    totalBet: string;
    validBet: string;
    winLoss: string;
};

const GameType = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Game Type',
            dataIndex: 'gameType',
        },
        {
            title: 'number of people./Ticket',
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
            <p>Game Type</p>
            <Table columns={columns} dataSource={data} />
            <hr className="my-8" />
        </>
    );
};

export default GameType;
