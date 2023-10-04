import React from 'react';
import { useCustom, useApiUrl } from '@refinedev/core';
import { Table } from 'antd';
import { DateTime } from '@/components/PureComponents';
import Amount from '@/components/Admin/Amount';

type TRecord = {
    status: string;
    game_provider: string;
    createdAt: string;
    updatedAt: string;
    currency: string;
    stake: number;
    actual_stake: number;
    winloss: number;
    game_provider_transaction_id: number;
    is_finish: boolean | null;
};

const index: React.FC<{ user_id: string | number | undefined }> = ({ user_id }) => {
    const apiUrl = useApiUrl();
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

    const dataSource: TRecord[] = data?.data?.data || [];

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
            render: (game_provider: string, record: TRecord) => (
                <span>
                    {game_provider} #{record.game_provider_transaction_id}
                </span>
            ),
        },
        {
            title: 'stake',
            dataIndex: 'stake',
            key: 'stake',
            render: (stake: number, record: TRecord) => <Amount amount={stake} currency={record.currency} symbol />,
        },
        {
            title: 'actual_stake',
            dataIndex: 'actual_stake',
            key: 'actual_stake',
            render: (actual_stake: number, record: TRecord) => <Amount amount={actual_stake} currency={record.currency} symbol />,
        },
        {
            title: 'winloss',
            dataIndex: 'winloss',
            key: 'winloss',
            render: (winloss: number, record: TRecord) => <Amount amount={winloss} currency={record.currency} symbol />,
        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: string) => <DateTime value={createdAt} />,
        },
    ];

    return <Table dataSource={dataSource} columns={columns} rowKey="uuid" loading={isLoading} />;
};

export default index;
