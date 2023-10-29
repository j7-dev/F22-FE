import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { searchPropsAtom } from './atom';
import { useAtomValue } from 'jotai';

type DataType = {
    agentId: number;
    newMembers: string;
    numberOfDepositors: string;
    numberOfFirstDeposit: string;
    numberOfDisable: string;
    totalDeposits: string;
    totalWithdraw: string;
    profit: string;
    commissionAmount: string;
};

const DetailedInformation = () => {
    const searchProps = useAtomValue(searchPropsAtom);
    const dateRange = searchProps.dateRange || undefined;

    const columns: ColumnsType<DataType> = [
        {
            title: 'Agent DisPlayname',
            dataIndex: 'agentId',
        },
        {
            title: 'Register',
            children: [
                {
                    title: 'Register',
                    dataIndex: 'register',
                },
                {
                    title: 'Number of first-time depositors',
                    dataIndex: 'numberOfFirstTimeDepositors',
                },
                {
                    title: 'First-time Deposit Rate',
                    dataIndex: 'firstTimeDepositRate',
                },
            ],
        },
        {
            title: 'Deposit',
            children: [
                {
                    title: 'Number of Depositors',
                    dataIndex: 'numberOfDepositors',
                },
                {
                    title: 'Deposit times',
                    dataIndex: 'depositTimes',
                },
                {
                    title: 'Deposit ratio',
                    dataIndex: 'depositRatio',
                },
                {
                    title: 'Deposit Amount',
                    dataIndex: 'depositAmount',
                },
            ],
        },
        {
            title: 'Withdrawal',
            children: [
                {
                    title: 'Number of Withdrawals',
                    dataIndex: 'numberOfWithdrawals',
                },
                {
                    title: 'Withdrawal times',
                    dataIndex: 'withdrawalTimes',
                },
                {
                    title: 'Withdrawal Amount',
                    dataIndex: 'withdrawalAmount',
                },
                {
                    title: 'Withdrawal Rate',
                    dataIndex: 'withdrawalRate',
                },
            ],
        },
        {
            title: 'Revenue',
            children: [
                {
                    title: 'Revenue',
                    dataIndex: 'revenue',
                },
                {
                    title: 'Revenue Rate',
                    dataIndex: 'revenueRate',
                },
            ],
        },
        {
            title: 'Total Bet & Turnover',
            children: [
                {
                    title: 'Total Bet Amount',
                    dataIndex: 'totalBetAmount',
                },
                {
                    title: 'Average Rolling Rate',
                    dataIndex: 'averageRollingRate',
                },
            ],
        },
        {
            title: 'Bonus',
            children: [
                {
                    title: 'Cash Bonus',
                    dataIndex: 'cashBonus',
                },
                {
                    title: 'Point Bonus',
                    dataIndex: 'pointBonus',
                },
                {
                    title: 'Bonus Rate',
                    dataIndex: 'bonusRate',
                },
            ],
        },
        {
            title: 'Agent Commission',
            children: [
                {
                    title: 'Agent Commission',
                    dataIndex: 'agentCommission',
                },
                {
                    title: 'Agent Withdrawal',
                    dataIndex: 'agentWithdrawal',
                },
                {
                    title: 'Rate',
                    dataIndex: 'rate',
                },
            ],
        },
        {
            title: 'Actual revenue',
            children: [
                {
                    title: 'Actual revenue',
                    dataIndex: 'actualRevenue',
                },
                {
                    title: 'Rate',
                    dataIndex: 'rate',
                },
            ],
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
