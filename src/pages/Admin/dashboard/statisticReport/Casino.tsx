import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

type DataType = {
    key: string;
    casino: string;
    ticket: string;
    totalBet: string;
    validBet: string;
    winLoss: string;
};

const Casino = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Casino',
            dataIndex: 'casino',
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
            <p>Casino</p>
            <Table columns={columns} dataSource={data} />
            <hr className="my-8" />
        </>
    );
};

export default Casino;
