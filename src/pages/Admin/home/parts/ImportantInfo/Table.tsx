import { useCustom, useApiUrl } from '@refinedev/core';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Table = () => {
    const apiUrl = useApiUrl();
    const { data, isLoading } = useCustom({
        url: `${apiUrl}/utility/statistic/important`,
        method: 'get',
        queryOptions: {
            retry: 0,
            staleTime: 1000 * 60 * 5,
        },
    });
    const dataSource = data?.data?.data;
    const columns = ['today', 'yesterday', 'thisWeek', 'lastWeek', 'thisMonth', 'lastMonth'];

    return (
        <div className="relative">
            <Spin tip="Loading..." size="large" spinning={isLoading} indicator={<LoadingOutlined />}>
                <table className="table mt-8 mb-16">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Today</th>
                            <th>Yesterday</th>
                            <th>This Week</th>
                            <th>Last Week</th>
                            <th>This Month.</th>
                            <th>Last Month.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Affiliate's information */}
                        <tr>
                            <th rowSpan={2}>Affiliate's information</th>
                            <th>General Agent (Person)</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.agentInfo_topAgent?.[column]}</td>
                            ))}
                        </tr>
                        <tr>
                            <th>Agent (Person)</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.agentInfo_agent?.[column]}</td>
                            ))}
                        </tr>
                        {/* New Members */}
                        <tr>
                            <th rowSpan={2}>New Members</th>
                            <th>Total members</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.newMembers_totalMembers?.[column]}</td>
                            ))}
                        </tr>
                        <tr>
                            <th>Amount for the deposit members</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.newMembers_amountForDepositMembers?.[column]}</td>
                            ))}
                        </tr>
                        {/* Turnover information */}
                        <tr>
                            <th rowSpan={2}>Turnover information</th>
                            <th>Total</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.turnoverInfo_total?.[column]}</td>
                            ))}
                        </tr>
                        <tr>
                            <th>Total members</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.turnoverInfo_totalMember?.[column]}</td>
                            ))}
                        </tr>
                        {/* Betting information */}
                        <tr>
                            <th rowSpan={2}>Betting information</th>
                            <th>Valid Bet Amount</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.bettingInfo_validBetAmount?.[column]}</td>
                            ))}
                        </tr>
                        <tr>
                            <th>Win / Loss</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.bettingInfo_winLoss?.[column]}</td>
                            ))}
                        </tr>
                        {/* Deposit information */}
                        <tr>
                            <th rowSpan={3}>Deposit information</th>
                            <th>Total</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.depositInfo_total?.[column]}</td>
                            ))}
                        </tr>
                        <tr>
                            <th>Total members</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.depositInfo_totalMember?.[column]}</td>
                            ))}
                        </tr>
                        <tr>
                            <th>Total Quantity</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.depositInfo_totalQty?.[column]}</td>
                            ))}
                        </tr>
                        {/* Withdrawal information */}
                        <tr>
                            <th rowSpan={3}>Withdrawal information</th>
                            <th>Total</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.withdrawInfo_total?.[column]}</td>
                            ))}
                        </tr>
                        <tr>
                            <th>Total members</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.withdrawInfo_totalMember?.[column]}</td>
                            ))}
                        </tr>
                        <tr>
                            <th>Total Quantity</th>
                            {columns.map((column) => (
                                <td key={column}>{dataSource?.withdrawInfo_totalQty?.[column]}</td>
                            ))}
                        </tr>
                    </tbody>
                    <tfoot className="bg-green-200">
                        <tr>
                            <th colSpan={2} className="text-green-800">
                                Total revenue (Total deposit - Total withdrawal)
                            </th>
                            {columns.map((column) => (
                                <td key={column}>{Number(dataSource?.depositInfo_total?.[column]) - Number(dataSource?.withdrawInfo_total?.[column])}</td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </Spin>
        </div>
    );
};

export default Table;
