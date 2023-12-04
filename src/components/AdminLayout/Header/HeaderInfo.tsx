import { useEffect } from 'react';
import { useCustom, useApiUrl } from '@refinedev/core';
import { Spin } from 'antd';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import { useTranslation } from 'react-i18next';
import { TTable1, TTable2, TTable3, TTable4 } from './types';
import { useAudio, playAudioCondition } from './utils';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

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
    const { Audio, play } = useAudio();

    useEffect(() => {
        sessionStorage.setItem('table3', JSON.stringify(table3));

        const isChange = playAudioCondition(table3);
        if (isChange) {
            play();
        }
    }, [JSON.stringify(table3)]);

    return (
        <Spin spinning={isFetching}>
            <div className="overflow-x-auto" style={{ maxWidth: 'calc(100vw - 6rem)' }}>
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
                            <th>{t('token')}</th>
                        </tr>

                        {formattedTabled2.map((item) => {
                            const { label = '', total = 0, evo = 0, pp = 0, bti = 0, token = 0 } = item;
                            const fields = [
                                {
                                    label: 'total',
                                    amount: total,
                                },
                                {
                                    label: 'evo',
                                    amount: evo,
                                },
                                {
                                    label: 'pp',
                                    amount: pp,
                                },
                                {
                                    label: 'bti',
                                    amount: bti,
                                },
                                {
                                    label: 'token',
                                    amount: token,
                                },
                            ];

                            return (
                                <tr key={label}>
                                    <th className="w-1/4">{t(label)}</th>
                                    {fields.map((field) => {
                                        const userText = label === 'bet amount(users)' ? `(${betAmountUser?.[field.label as keyof typeof betAmountUser]})` : '';
                                        return (
                                            <td key={field.label}>
                                                <SimpleAmount amount={field.amount} /> {userText}
                                            </td>
                                        );
                                    })}
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
                            const link = getLink(label);
                            return (
                                <tr key={label}>
                                    <th className="w-1/4">
                                        <Link to={link}>
                                            {t(label)} <ArrowRightOutlined />
                                        </Link>
                                    </th>
                                    <td className={pending > 0 ? 'bg-red-300' : ''}>{pending}</td>
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
            <Audio />
        </Spin>
    );
};

function getLink(label: string) {
    switch (label) {
        case 'deposit':
            return '/refine/payments/deposit/list';
        case 'withdraw':
            return '/refine/payments/withdraw/list';
        case 'register':
            return '/refine/members/list';
        default:
            return '/refine/home';
    }
}

export default HeaderInfo;
