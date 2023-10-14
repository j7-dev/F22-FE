import React from 'react';
import Amount from '@/components/Admin/Amount';
import { useGetSiteSetting } from '@/hooks';
import dayjs from 'dayjs';
import { useList, useCustom, useApiUrl } from '@refinedev/core';
import { TBetRecord, TTransaction } from '@/types';
import { Table } from 'antd';
import useColumns from './useColumns';

const index: React.FC<{ user_id: number | undefined }> = React.memo(({ user_id }) => {
    const siteSetting = useGetSiteSetting();
    const support_game_providers = siteSetting?.support_game_providers || [];
    const { data } = useList({
        resource: 'transaction-records',
        filters: [
            {
                field: 'user.id',
                operator: 'eq',
                value: user_id,
            },
            {
                field: 'type',
                operator: 'eq',
                value: 'DEPOSIT',
            },
        ],
        sorters: [
            {
                field: 'createdAt',
                order: 'desc',
            },
        ],
        pagination: {
            pageSize: 1,
        },
        queryOptions: {
            staleTime: 1000 * 60 * 60 * 24,
        },
    });
    const latestDeposit = data?.data?.[0] as TTransaction | undefined;

    const apiUrl = useApiUrl();

    const { data: txnsData, isLoading: txnsIsLoading } = useCustom({
        url: `${apiUrl}/utility/betting-records`,
        method: 'get',
        config: {
            query: {
                user_id,
                startTime: latestDeposit?.createdAt,
                pageSize: 1000,
            },
        },
    });
    const txns = (txnsData?.data?.data || []) as TBetRecord[];

    const dataSource = support_game_providers.map((gameProvider) => {
        const validBetAmount = txns.reduce((acc: number, cur: TBetRecord) => {
            if (cur.game_provider === gameProvider && cur.status === 'DEBIT') {
                return acc + cur.amount;
            }
            return acc;
        }, 0);

        // ENHANCE: 須注意並非所有 transaction 都是 credit

        const payOut =
            txns.reduce((acc: number, cur: TBetRecord) => {
                if (cur.game_provider === gameProvider && cur.status === 'CREDIT') {
                    return acc + cur.amount;
                }
                return acc;
            }, 0) * -1; // 付出去為負數

        const txnAmountRefIds = [...new Set(txns.filter((t) => t.game_provider === gameProvider).map((t) => t.transaction_ref_id))];

        return {
            gameProvider,
            txnAmount: txnAmountRefIds.length,
            validBetAmount,
            winLoss: validBetAmount + payOut,
            payOut,
        };
    });

    const columns = useColumns();

    return (
        <div>
            {latestDeposit ? (
                <div>
                    <p>
                        Latest Deposit: <Amount amount={latestDeposit?.amount} className="bg-yellow-200 px-3" /> at <u>{dayjs(latestDeposit?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</u>
                    </p>
                    <p>
                        Date: from <u>{dayjs(latestDeposit?.createdAt).format('YYYY-MM-DD')}</u> to <u>{dayjs().format('YYYY-MM-DD')}</u>
                    </p>
                </div>
            ) : (
                'This user has no deposit record'
            )}
            <Table
                loading={txnsIsLoading}
                size="small"
                dataSource={dataSource}
                columns={columns}
                summary={(pageData) => {
                    const totalTxnAmount = pageData.reduce((acc: number, cur) => acc + cur.txnAmount, 0);
                    const totalValidBetAmount = pageData.reduce((acc: number, cur) => acc + cur.validBetAmount, 0);
                    const totalWinLoss = pageData.reduce((acc: number, cur) => acc + cur.winLoss, 0);
                    const totalPayOut = pageData.reduce((acc: number, cur) => acc + cur.payOut, 0);

                    return (
                        <Table.Summary fixed>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>{totalTxnAmount}</Table.Summary.Cell>
                                <Table.Summary.Cell index={2}>
                                    <Amount amount={totalValidBetAmount} />
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                    <Amount amount={totalPayOut} />
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={4}>
                                    <Amount amount={totalWinLoss} />
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    );
                }}
            />
        </div>
    );
});

export default index;