import { DateTime } from '@/components/PureComponents';
import ReferralLink from '@/components/general/ReferralLink';
import { TVip } from '@/types';
import VipLink from '@/components/Admin/VipLink';

export const infoLeftColumns = [
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
        key: 'vip',
        title: 'vip',
        dataIndex: 'vip',
        render: (vip: TVip) => <VipLink vip={vip} />,
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
        key: 'uuid',
        title: 'UUID',
        dataIndex: 'uuid',
    },
];

export const infoRightColumns = [
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
