import React from 'react';
import { useCustom, useApiUrl } from '@refinedev/core';
import { Table, Empty } from 'antd';
import Amount from '@/components/Admin/Amount';
import { TBetRecord, TUser } from '@/types';
import UserLink from '@/components/Admin/UserLink';
import { ColumnsType } from 'antd/es/table';

/**
 * TODO 限制後端一次拿100筆之類的
 * TODO 未來做無限滾動
 */

const index: React.FC<{ user_id: string | number | undefined }> = React.memo(({ user_id }) => {
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
    if (!user_id) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="please select user" />;

    const dataSource: TBetRecord[] = data?.data?.data || [];

    const columns: ColumnsType<any> = [
        {
            align: 'center',
            title: 'User',
            dataIndex: 'user',
            render: (user: TUser) => <UserLink user={user} />,
        },
        {
            title: 'Total',
            dataIndex: 'total',
            children: [
                {
                    align: 'center',
                    title: 'Valid Bet Amount',
                    dataIndex: 'total_validbetamount',
                    render: (v: number) => <Amount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'Payout',
                    dataIndex: 'total_payout',
                    render: (v: number) => <Amount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'win/loss',
                    dataIndex: 'total_winloss',
                    render: (v: number) => <Amount amount={v} />,
                },
            ],
        },
        {
            title: 'Sport',
            dataIndex: 'sport',
            children: [
                {
                    align: 'center',
                    title: 'Valid Bet Amount',
                    dataIndex: 'sport_validbetamount',
                    render: (v: number) => <Amount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'Payout',
                    dataIndex: 'sport_payout',
                    render: (v: number) => <Amount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'win/loss',
                    dataIndex: 'sport_winloss',
                    render: (v: number) => <Amount amount={v} />,
                },
            ],
        },
        {
            title: 'Live',
            dataIndex: 'live',
            children: [
                {
                    align: 'center',
                    title: 'Valid Bet Amount',
                    dataIndex: 'live_validbetamount',
                    render: (v: number) => <Amount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'Payout',
                    dataIndex: 'live_payout',
                    render: (v: number) => <Amount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'win/loss',
                    dataIndex: 'live_winloss',
                    render: (v: number) => <Amount amount={v} />,
                },
            ],
        },
        {
            title: 'Slot',
            dataIndex: 'slot',
            children: [
                {
                    align: 'center',
                    title: 'Valid Bet Amount',
                    dataIndex: 'slot_validbetamount',
                    render: (v: number) => <Amount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'Payout',
                    dataIndex: 'slot_payout',
                    render: (v: number) => <Amount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'win/loss',
                    dataIndex: 'slot_winloss',
                    render: (v: number) => <Amount amount={v} />,
                },
            ],
        },
        {
            title: 'Games',
            dataIndex: 'games',
            children: [
                {
                    align: 'center',
                    title: 'Valid Bet Amount',
                    dataIndex: 'games_validbetamount',
                    render: (v: number) => <Amount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'Payout',
                    dataIndex: 'games_payout',
                    render: (v: number) => <Amount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'win/loss',
                    dataIndex: 'games_winloss',
                    render: (v: number) => <Amount amount={v} />,
                },
            ],
        },
        {
            title: 'IGX',
            dataIndex: 'igx',
            children: [
                {
                    align: 'center',
                    title: 'Valid Bet Amount',
                    dataIndex: 'igx_validbetamount',
                    render: (v: number) => <Amount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'Payout',
                    dataIndex: 'igx_payout',
                    render: (v: number) => <Amount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'win/loss',
                    dataIndex: 'igx_winloss',
                    render: (v: number) => <Amount amount={v} />,
                },
            ],
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
            size="small"
            bordered
            scroll={{ x: 2400 }}
        />
    );
});

export default index;
