import { useCustom, useApiUrl } from '@refinedev/core';
import { Spin } from 'antd';
import SimpleAmount from '@/components/Admin/SimpleAmount';

const HeaderInfo = () => {
    const apiUrl = useApiUrl();
    const { data, isFetching } = useCustom({
        url: `${apiUrl}/utility/statistic/today`,
        method: 'get',
        queryOptions: {
            queryKey: ['headerInfo'],
            refetchInterval: 1000 * 10,
            cacheTime: 1000 * 10,
            staleTime: 0,
        },
    });
    const dataSource = data?.data?.data || {};
    const { table1, table2 = [], table3 = [], table4 = [] } = dataSource;

    const betAmountUser = table2.find((item: any) => item.label === 'bet users');
    const formattedTabled2 = table2.filter((item: any) => item.label !== 'bet users');
    return (
        <Spin spinning={isFetching}>
            <div className="overflow-x-auto">
                <div className="flex w-[1300px]">
                    <table className="table table-small table-nowrap th-left w-[300px]">
                        <tr>
                            <th className="w-8">total balance</th>
                            <td>
                                <SimpleAmount amount={table1?.cashBalanceAmount} />
                            </td>
                        </tr>
                        <tr>
                            <th>total point</th>
                            <td>
                                <SimpleAmount amount={table1?.turnoverBonusBalanceAmount} />
                            </td>
                        </tr>
                        <tr>
                            <th>total deposit (users)</th>
                            <td>
                                <SimpleAmount amount={table1?.dpAmount} />
                                {` (${table1?.dpUsers})`}
                            </td>
                        </tr>
                        <tr>
                            <th>total withdraw (users)</th>
                            <td>
                                <SimpleAmount amount={table1?.wdAmount} />
                                {` (${table1?.wdUsers})`}
                            </td>
                        </tr>
                        <tr>
                            <th>DPWD</th>
                            <td>
                                <SimpleAmount amount={table1?.dpWd} />
                            </td>
                        </tr>
                    </table>

                    <table className="table table-fixed table-small table-nowrap th-left w-[600px] ml-4">
                        <tr>
                            <th className="w-1/4"></th>
                            <th>total</th>
                            <th>evo</th>
                            <th>pp</th>
                            <th>bti</th>
                            <th>igx</th>
                        </tr>

                        {formattedTabled2.map((item: any) => {
                            const { label = '', total = 0, evo = 0, pp = 0, bti = 0, igx = 0 } = item;
                            const users = label === 'bet amount(users)' ? `(${betAmountUser.total || 0})` : '';
                            return (
                                <tr key={label}>
                                    <th className="w-1/4">{label}</th>
                                    <td>
                                        <SimpleAmount amount={total} /> {users}
                                    </td>
                                    <td>
                                        <SimpleAmount amount={evo} /> {users}
                                    </td>
                                    <td>
                                        <SimpleAmount amount={pp} /> {users}
                                    </td>
                                    <td>
                                        <SimpleAmount amount={bti} /> {users}
                                    </td>
                                    <td>
                                        <SimpleAmount amount={igx} /> {users}
                                    </td>
                                </tr>
                            );
                        })}
                    </table>

                    <table className="table table-fixed table-small table-nowrap th-left w-[300px] ml-4">
                        <tr>
                            <th></th>
                            <th>pending</th>
                            <th>confirmed</th>
                        </tr>
                        {table3.map((item: any) => {
                            const { label, pending, confirmed } = item;
                            return (
                                <tr key={label}>
                                    <th className="w-1/4">{label}</th>
                                    <td>{pending}</td>
                                    <td>{confirmed}</td>
                                </tr>
                            );
                        })}
                        <tr>
                            <th>&nbsp;</th>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>

                    <table className="table table-small table-nowrap th-left w-[240px] ml-4">
                        <tr>
                            <th>&nbsp;</th>
                            <th>人數</th>
                        </tr>
                        {table4.map((item: any) => {
                            const { label, count } = item;
                            return (
                                <tr key={label}>
                                    <th className="w-1/4">{label}</th>
                                    <td>{count}</td>
                                </tr>
                            );
                        })}
                        <tr>
                            <th>&nbsp;</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>&nbsp;</th>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
        </Spin>
    );
};

export default HeaderInfo;
