import React, { useEffect } from 'react';
import { useCustom, useApiUrl } from '@refinedev/core';
import { Table, Empty, Form } from 'antd';
import { TBetRecord, TUser } from '@/types';
import UserLink from '@/components/Admin/UserLink';
import { ColumnsType } from 'antd/es/table';
import SimpleAmount from '@/components/Admin/SimpleAmount';

/**
 * TODO 限制後端一次拿100筆之類的
 * TODO 未來做無限滾動
 * TODO 依照時間篩選
 */

const index: React.FC<{ user_id?: number | string | undefined; enabled?: boolean; setEnabled?: any }> = ({ user_id: userId, enabled, setEnabled }) => {
    const apiUrl = useApiUrl();
    const form = Form.useFormInstance();
    const user_id = userId ? userId : form.getFieldValue(['user_id']);

    const { data, isLoading } = useCustom({
        url: `${apiUrl}/utility/betting-records`,
        method: 'get',
        config: {
            query: {
                user_id,
            },
        },
        queryOptions: {
            enabled: userId ? true : enabled,
        },
    });

    useEffect(() => {
        if (!isLoading && setEnabled) {
            setEnabled(false);
        }
    }, [isLoading]);

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
                    render: (v: number) => <SimpleAmount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'Payout',
                    dataIndex: 'total_payout',
                    render: (v: number) => <SimpleAmount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'win/loss',
                    dataIndex: 'total_winloss',
                    render: (v: number) => <SimpleAmount amount={v} />,
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
                    render: (v: number) => <SimpleAmount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'Payout',
                    dataIndex: 'sport_payout',
                    render: (v: number) => <SimpleAmount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'win/loss',
                    dataIndex: 'sport_winloss',
                    render: (v: number) => <SimpleAmount amount={v} />,
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
                    render: (v: number) => <SimpleAmount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'Payout',
                    dataIndex: 'live_payout',
                    render: (v: number) => <SimpleAmount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'win/loss',
                    dataIndex: 'live_winloss',
                    render: (v: number) => <SimpleAmount amount={v} />,
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
                    render: (v: number) => <SimpleAmount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'Payout',
                    dataIndex: 'slot_payout',
                    render: (v: number) => <SimpleAmount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'win/loss',
                    dataIndex: 'slot_winloss',
                    render: (v: number) => <SimpleAmount amount={v} />,
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
                    render: (v: number) => <SimpleAmount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'Payout',
                    dataIndex: 'games_payout',
                    render: (v: number) => <SimpleAmount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'win/loss',
                    dataIndex: 'games_winloss',
                    render: (v: number) => <SimpleAmount amount={v} />,
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
                    render: (v: number) => <SimpleAmount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'Payout',
                    dataIndex: 'igx_payout',
                    render: (v: number) => <SimpleAmount amount={v} />,
                },
                {
                    align: 'center',
                    title: 'win/loss',
                    dataIndex: 'igx_winloss',
                    render: (v: number) => <SimpleAmount amount={v} />,
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
};

export default index;
