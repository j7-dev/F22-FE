import { useCustom, useApiUrl } from '@refinedev/core';
import { Spin } from 'antd';

const HeaderInfo = () => {
    const apiUrl = useApiUrl();
    const { data, isFetching } = useCustom({
        url: `${apiUrl}/utility/statistic/today`,
        method: 'get',
        queryOptions: {
            queryKey: ['headerInfo'],
            refetchInterval: 1000 * 10,
            cacheTime: 1000 * 10,
        },
    });
    const dataSource = data?.data?.data || {};
    const { table1, table2 = [], table3 = [], table4 = [] } = dataSource;

    return (
        <Spin spinning={isFetching}>
            <div className="overflow-x-auto">
                <div className="flex w-[1300px]">
                    <table className="table table-small table-nowrap th-left w-[300px]">
                        <tr>
                            <th className="w-8">total balance</th>
                            <td>{(table1?.cashBalanceAmount || 0).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <th>total point</th>
                            <td>{(table1?.turnoverBonusBalanceAmount || 0).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <th>total deposit (users)</th>
                            <td>{`${(table1?.dpAmount || 0).toLocaleString()} (${table1?.dpUsers})`}</td>
                        </tr>
                        <tr>
                            <th>total withdraw (users)</th>
                            <td>{`${(table1?.wdAmount || 0).toLocaleString()} (${table1?.wdUsers})`}</td>
                        </tr>
                        <tr>
                            <th>DPWD</th>
                            <td>{(table1?.dpWd || 0).toLocaleString()}</td>
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

                        {table2.map((item: any) => {
                            const { label = '', total = 0, evo = 0, pp = 0, bti = 0, igx = 0 } = item;
                            return (
                                <tr key={label}>
                                    <th className="w-1/4">{label}</th>
                                    <td>{total.toLocaleString()}</td>
                                    <td>{evo.toLocaleString()}</td>
                                    <td>{pp.toLocaleString()}</td>
                                    <td>{bti.toLocaleString()}</td>
                                    <td>{igx.toLocaleString()}</td>
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
