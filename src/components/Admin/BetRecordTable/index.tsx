import React from 'react';
import { useCustom, useApiUrl } from '@refinedev/core';
import { Table } from 'antd';
import { DateTime } from '@/components/PureComponents';
import Amount from '@/components/Admin/Amount';
import { TBetRecord } from '@/types';

const index: React.FC<{ user_id: string | number | undefined }> = React.memo(({ user_id }) => {
    const apiUrl = useApiUrl();
    // TODO 限制後端一次拿100筆之類的
    // 目前做無限滾動

    const { data, isLoading } = useCustom({
        url: `${apiUrl}/utility/betting-records`,
        method: 'get',
        config: {
            query: {
                user_id,
            },
        },
    });
    if (!user_id) return <p>can't get user_id</p>;

    const dataSource: TBetRecord[] = data?.data?.data || [];

    const columns = [
        {
            title: 'updatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (updatedAt: string) => <DateTime value={updatedAt} />,
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'game_provider',
            dataIndex: 'game_provider',
            key: 'game_provider',
            render: (game_provider: string, record: TBetRecord) => (
                <span>
                    {game_provider} #{record.game_provider_transaction_id}
                </span>
            ),
        },
        {
            title: 'amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number, record: TBetRecord) => <Amount amount={amount} currency={record.currency} symbol />,
        },
        {
            title: 'Transaction Id',
            dataIndex: 'game_provider_transaction_id',
            key: 'game_provider_transaction_id',
        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: string) => <DateTime value={createdAt} />,
        },
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="uuid"
            loading={isLoading}
            pagination={{
                pageSize: 100,
            }}
        />
    );
});

export default index;
