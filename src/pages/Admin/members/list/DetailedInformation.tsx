import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { searchPropsAtom } from './atom';
import { useAtomValue } from 'jotai';
import { DataType } from './types';

const DetailedInformation = () => {
    const searchProps = useAtomValue(searchPropsAtom);
    const dateRange = searchProps.dateRange || undefined;

    const columns: ColumnsType<DataType> = [
        {
            title: 'NO.',
            dataIndex: 'agentId',
        },
        {
            title: 'Member Account ',
            dataIndex: 'memberAccount ',
        },
        {
            title: 'Agent Account',
            dataIndex: 'agentAccount',
        },
        {
            title: 'Total Bet Count',
            dataIndex: 'totalBetCount',
        },
        {
            title: 'Total Profit Amount',
            dataIndex: 'totalProfitAmount',
        },
        {
            title: 'Total Bet Amount',
            dataIndex: 'totalBetAmount',
        },
        {
            title: 'Total Valid Bet Amount',
            dataIndex: 'totalValidBetAmount',
        },
        {
            title: 'Total Deposit Amount',
            dataIndex: 'totalDepositAmount',
        },
        {
            title: 'Total Withdraw Amount(Including Amount still Applying)',
            dataIndex: 'totalWithdrawAmount',
        },
        {
            title: 'Total Bonus Amount',
            dataIndex: 'totalBonusAmount',
        },
        {
            title: 'Total Discount Amount',
            dataIndex: 'totalDiscountAmount',
        },
        {
            title: 'Total AnyTime Discount Amount',
            dataIndex: 'totalAnyTimeDiscountAmount',
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
