import React from 'react';
import BetRecordTable from '@/components/Admin/BetRecordTable';
import Amount from '@/components/Admin/Amount';
import dayjs from 'dayjs';
import { useList } from '@refinedev/core';
import { TTransaction } from '@/types';

const index: React.FC<{ user_id: number | undefined }> = React.memo(({ user_id }) => {
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

    return (
        <div>
            {latestDeposit ? (
                <div>
                    Latest Deposit: <Amount amount={0} /> at {dayjs(latestDeposit?.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </div>
            ) : (
                'This user has no deposit record'
            )}
            <BetRecordTable user_id={user_id} />
        </div>
    );
});

export default index;
