import React from 'react';
import { DateTime } from '@/components/PureComponents';
import ReferralLink from '@/components/general/ReferralLink';

export const infoColumns = [
    {
        key: 'id',
        title: 'ID',
        dataIndex: 'id',
    },
    {
        key: 'username',
        title: 'Username',
        dataIndex: 'username',
    },
    {
        key: 'email',
        title: 'Email',
        dataIndex: 'email',
    },
    {
        key: 'display_name',
        title: 'Display Name',
        dataIndex: 'display_name',
    },
    {
        key: 'phone',
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        key: 'gender',
        title: 'Gender',
        dataIndex: 'gender',
    },
    {
        key: 'birthday',
        title: 'Birthday',
        dataIndex: 'birthday',
    },
    {
        key: 'uuid',
        title: 'UUID',
        dataIndex: 'uuid',
    },
    {
        key: 'referralLink',
        title: 'Referral Link',
        dataIndex: 'uuid',
        render: (uuid: string) => <ReferralLink uuid={uuid} />,
    },
    {
        key: 'allow_payments',
        title: 'Allow Payments',
        dataIndex: 'allow_payments',
        render: (allow_payments: string[] | null) => (allow_payments || []).join(', '),
    },
    {
        key: 'allow_game_providers',
        title: 'Allow Game Providers',
        dataIndex: 'allow_game_providers',
        render: (allow_game_providers: string[] | null) => (allow_game_providers || []).join(', '),
    },
    {
        key: 'createdAt',
        title: 'Created At',
        dataIndex: 'createdAt',
        render: (createdAt: string) => <DateTime value={createdAt} />,
    },
    {
        key: 'updatedAt',
        title: 'Updated At',
        dataIndex: 'updatedAt',
        render: (updatedAt: string) => <DateTime value={updatedAt} />,
    },
];
