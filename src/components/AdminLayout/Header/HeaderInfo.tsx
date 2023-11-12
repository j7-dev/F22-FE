import { useCustom, useApiUrl } from '@refinedev/core';
import { Spin } from 'antd';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import { useTranslation } from 'react-i18next';
import { TTable1, TTable2, TTable3, TTable4 } from './types';

const HeaderInfo = () => {
    const apiUrl = useApiUrl();
    const { t } = useTranslation();
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
    const dataSource = (data?.data?.data || {}) as {
        table1: TTable1;
        table2: TTable2;
        table3: TTable3;
        table4: TTable4;
    };
    const { table1, table2 = [], table3 = [], table4 = [] } = dataSource;

    const betAmountUser = table2.find((item) => item.label === 'bet users');
    const formattedTabled2 = table2.filter((item) => item.label !== 'bet users');
    return (
        <Spin spinning={isFetching}>
            <div className="overflow-x-auto">
                <div className="flex w-[1300px]">
                    <table className="table table-small table-nowrap th-left w-[300px]">
                        <tr>
                            <th className="w-8">{t('total balance')}</th>
                            <td>
                                <SimpleAmount amount={table1?.cashBalanceAmount} />
                            </td>
                        </tr>
                        <tr>
                            <th>{t('total point')}</th>
                            <td>
                                <SimpleAmount amount={table1?.turnoverBonusBalanceAmount} />
                            </td>
                        </tr>
                        <tr>
                            <th>{t('total deposit (users)')}</th>
                            <td>
                                <SimpleAmount amount={table1?.dpAmount} />
                                {` (${table1?.dpUsers})`}
                            </td>
                        </tr>
                        <tr>
                            <th>{t('total withdraw (users)')}</th>
                            <td>
                                <SimpleAmount amount={table1?.wdAmount} />
                                {` (${table1?.wdUsers})`}
                            </td>
                        </tr>
                        <tr>
                            <th>{t('DPWD')}</th>
                            <td>
                                <SimpleAmount amount={table1?.dpWd} />
                            </td>
                        </tr>
                    </table>

                    <table className="table table-fixed table-small table-nowrap th-left w-[600px] ml-4">
                        <tr>
                            <th className="w-1/4"></th>
                            <th>{t('total')}</th>
                            <th>{t('evo')}</th>
                            <th>{t('pp')}</th>
                            <th>{t('bti')}</th>
                            <th>{t('igx')}</th>
                        </tr>

                        {formattedTabled2.map((item) => {
                            const { label = '', total = 0, evo = 0, pp = 0, bti = 0, igx = 0 } = item;
                            return (
                                <tr key={label}>
                                    <th className="w-1/4">{t(label)}</th>
                                    <td>
                                        <SimpleAmount amount={total} /> ({betAmountUser?.total})
                                    </td>
                                    <td>
                                        <SimpleAmount amount={evo} /> ({betAmountUser?.evo})
                                    </td>
                                    <td>
                                        <SimpleAmount amount={pp} /> ({betAmountUser?.pp})
                                    </td>
                                    <td>
                                        <SimpleAmount amount={bti} /> ({betAmountUser?.bti})
                                    </td>
                                    <td>
                                        <SimpleAmount amount={igx} /> ({betAmountUser?.igx})
                                    </td>
                                </tr>
                            );
                        })}
                    </table>

                    <table className="table table-fixed table-small table-nowrap th-left w-[300px] ml-4">
                        <tr>
                            <th></th>
                            <th>{t('pending')}</th>
                            <th>{t('confirmed')}</th>
                        </tr>
                        {table3.map((item) => {
                            const { label, pending, confirmed } = item;
                            return (
                                <tr key={label}>
                                    <th className="w-1/4">{t(label)}</th>
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
                            <th>{t('人數')}</th>
                        </tr>
                        {table4.map((item) => {
                            const { label, count } = item;
                            return (
                                <tr key={label}>
                                    <th className="w-1/4">{t(label)}</th>
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
