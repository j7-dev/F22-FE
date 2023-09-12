import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { searchPropsAtom } from './atom';
import { useAtomValue } from 'jotai';

type DataType = {
    agentId: number;
    newMembers: string;
    numberOfDipositors: string;
    numberOfFirstDiposit: string;
    numberOfDisable: string;
    totalDiposits: string;
    totalWithdraw: string;
    profit: string;
    commissionAmount: string;
};

const DetailedInformation = () => {
    const searchProps = useAtomValue(searchPropsAtom);
    const dateRange = searchProps.dateRange || undefined;

    const columns: ColumnsType<DataType> = [
        {
            title: 'Major Shareholder',
            dataIndex: 'agentId',
        },
        {
            title: 'New Members',
            dataIndex: 'newMembers',
        },
        {
            title: 'Number of Dipositors',
            dataIndex: 'numberOfDipositors',
        },
        {
            title: 'Number of First Diposit',
            dataIndex: 'numberOfFirstDiposit',
        },
        {
            title: 'Number of Disable',
            dataIndex: 'numberOfDisable',
        },
        {
            title: 'Total Diposits',
            dataIndex: 'totalDiposits',
        },
        {
            title: 'Total Withdraw',
            dataIndex: 'totalWithdraw',
        },
        {
            title: 'Profit(DP-WD)',
            dataIndex: 'profit',
        },
        {
            title: 'Commission Amount',
            dataIndex: 'commissionAmount',
        },
        {
            title: '',
            dataIndex: 'action',
        },
    ];

    const data: DataType[] = [];
    return (
        <>
            <p>Detailed Information {dateRange ? dateRange.map((date) => (date ? date.format('YYYY/MM/DD') : '')).join(' ~ ') : ''}</p>
            <Table rowKey="agentId" columns={columns} dataSource={data} />
            <hr className="my-8" />
        </>
    );
};

export default DetailedInformation;
