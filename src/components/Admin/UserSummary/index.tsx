import React from 'react';
import { useGetSiteSetting } from '@/hooks';
import dayjs from 'dayjs';
import { useList } from '@refinedev/core';
import { TTransaction, TUser } from '@/types';
import { Table, Button, Modal } from 'antd';
import useColumns from './useColumns';
import { ExportOutlined } from '@ant-design/icons';
import { useModal } from '@refinedev/antd';
import ListBettingRecords from '@/components/resources/betRecords/List';
import { gameProviderTxnEnum } from '@/utils';
import SimpleAmount from '@/components/Admin/SimpleAmount';

type TGameProviderTxnEnum = keyof typeof gameProviderTxnEnum;

const index: React.FC<{ user: TUser | undefined }> = React.memo(({ user }) => {
    const user_id = user?.id;
    const siteSetting = useGetSiteSetting();
    const support_game_providers = (siteSetting?.support_game_providers || []) as TGameProviderTxnEnum[];
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
            staleTime: 1000 * 60 * 5,
        },
    });
    const latestDeposit = data?.data?.[0] as TTransaction | undefined;

    const { data: txnResult, isLoading } = useList({
        resource: 'transaction-records',
        filters: [
            {
                field: 'user.id',
                operator: 'eq',
                value: user_id,
            },
            {
                field: 'type',
                operator: 'in',
                value: ['DEBIT', 'CREDIT'],
            },
        ],
        meta: {
            populate: {
                user: '*',
            },
        },
        sorters: [
            {
                field: 'createdAt',
                order: 'desc',
            },
        ],
        queryOptions: {
            staleTime: 1000 * 60 * 5,
        },
    });

    const allTxns = (txnResult?.data || []) as TTransaction[];

    const dataSource = support_game_providers.map((gameProvider) => {
        const validBetAmount =
            allTxns.reduce((acc: number, cur: TTransaction) => {
                if (cur.by === gameProviderTxnEnum?.[gameProvider] && cur.type === 'DEBIT') {
                    return acc + cur.amount;
                }
                return acc;
            }, 0) * -1; // 投注金額為正數

        const payOut =
            allTxns.reduce((acc: number, cur: TTransaction) => {
                if (cur.by === gameProviderTxnEnum?.[gameProvider] && cur.type === 'CREDIT') {
                    return acc + cur.amount;
                }
                return acc;
            }, 0) * -1; // 付出去為負數

        const txnAmountRefIds = [...new Set(allTxns.filter((t) => t.by === gameProviderTxnEnum?.[gameProvider]).map((t) => t?.ref_id))];

        return {
            gameProvider,
            txnAmount: txnAmountRefIds.length,
            validBetAmount,
            winLoss: validBetAmount + payOut,
            payOut,
        };
    });

    const filteredDataSource = dataSource.filter((d) => d.txnAmount !== 0 || d.validBetAmount !== 0 || d.winLoss !== 0 || d.payOut !== 0);

    const columns = useColumns();

    const { modalProps, show } = useModal();

    return (
        <div>
            {latestDeposit ? (
                <div>
                    <p>
                        Latest Deposit:{' '}
                        <span className="bg-yellow-200 px-3">
                            <SimpleAmount amount={latestDeposit?.amount} />
                        </span>{' '}
                        at <u>{dayjs(latestDeposit?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</u>
                    </p>
                    <p>
                        Date: from <u>{dayjs(latestDeposit?.createdAt).format('YYYY-MM-DD')}</u> to <u>{dayjs().format('YYYY-MM-DD')}</u>
                    </p>
                    <Button type="primary" onClick={() => show()}>
                        Betting Records
                        <ExportOutlined className="ml-2" />
                    </Button>
                </div>
            ) : (
                'This user has no deposit record'
            )}
            <Table
                loading={isLoading}
                size="small"
                dataSource={filteredDataSource}
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
                                    <SimpleAmount amount={totalValidBetAmount} />
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                    <SimpleAmount amount={totalPayOut} />
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={4}>
                                    <SimpleAmount amount={totalWinLoss} />
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    );
                }}
            />
            <Modal
                {...modalProps}
                centered
                width={1600}
                footer={null}
                title={
                    <>
                        <u>{user?.display_name}</u> bet records from <u>{dayjs(latestDeposit?.createdAt).format('YYYY-MM-DD')}</u> to <u>{dayjs().format('YYYY-MM-DD')}</u>
                    </>
                }
            >
                <ListBettingRecords user_id={user_id as number} />
            </Modal>
        </div>
    );
});

export default index;
