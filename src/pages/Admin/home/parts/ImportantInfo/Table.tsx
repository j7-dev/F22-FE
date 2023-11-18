import { useCustom, useApiUrl } from '@refinedev/core';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import SimpleAmount from '@/components/Admin/SimpleAmount';

const Table = () => {
    const { t } = useTranslation();
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
                            <th>{t('Today')}</th>
                            <th>{t('Yesterday')}</th>
                            <th>{t('This Week')}</th>
                            <th>{t('Last Week')}</th>
                            <th>{t('This Month')}</th>
                            <th>{t('Last Month')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Agent's information */}
                        <tr>
                            <th rowSpan={4}>{t('New Members')}</th>
                            <th>{t('New Top Agents')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.agentInfo_newTopAgent?.[column]} />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th>{t('New Agents')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.agentInfo_newAgent?.[column]} />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th>{t('New members')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.newMembers_newMembers?.[column]} />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th>{t('Amount for the deposit members')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.newMembers_amountForDepositMembers?.[column]} />
                                </td>
                            ))}
                        </tr>
                        {/* Turnover information */}
                        <tr>
                            <th rowSpan={2}>{t('Turnover information')}</th>
                            <th>{t('Total')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.turnoverInfo_total?.[column]} />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th>{t('Total members')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.turnoverInfo_totalMember?.[column]} />
                                </td>
                            ))}
                        </tr>
                        {/* Betting information */}
                        <tr>
                            <th rowSpan={2}>{t('Betting information')}</th>
                            <th>{t('Valid Bet Amount')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.bettingInfo_validBetAmount?.[column]} />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th>{t('Win / Loss')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.bettingInfo_winLoss?.[column]} />
                                </td>
                            ))}
                        </tr>
                        {/* Deposit information */}
                        <tr>
                            <th rowSpan={3}>{t('Deposit information')}</th>
                            <th>{t('Total')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.depositInfo_total?.[column]} />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th>{t('Total members')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.depositInfo_totalMember?.[column]} />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th>{t('Total Quantity')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.depositInfo_totalQty?.[column]} />
                                </td>
                            ))}
                        </tr>
                        {/* Withdrawal information */}
                        <tr>
                            <th rowSpan={3}>{t('Withdrawal information')}</th>
                            <th>{t('Total')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.withdrawInfo_total?.[column]} />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th>{t('Total members')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.withdrawInfo_totalMember?.[column]} />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th>{t('Total Quantity')}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={dataSource?.withdrawInfo_totalQty?.[column]} />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                    <tfoot className="bg-green-200">
                        <tr>
                            <th colSpan={2} className="text-green-800">
                                {t('Total revenue (Total deposit - Total withdrawal)')}
                            </th>
                            {columns.map((column) => (
                                <td key={column}>
                                    <SimpleAmount amount={Number(dataSource?.depositInfo_total?.[column]) - Number(dataSource?.withdrawInfo_total?.[column])} />
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </Spin>
        </div>
    );
};

export default Table;
