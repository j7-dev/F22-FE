import { Card } from 'antd';
import { Show } from '@refinedev/antd';
import { useCan } from '@/hooks';
import { useShow } from '@refinedev/core';
import ObjectTable from '@/components/general/ObjectTable';
import MoneyLog from '@/components/Admin/MoneyLog';
import LoginDetail from '@/components/Admin/LoginDetail';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { DateTime } from '@/components/PureComponents';
import ReferralLink from '@/components/general/ReferralLink';
import { useParams } from 'react-router-dom';
import { TUser } from '@/types';

const index = () => {
    const { canDelete, canEdit } = useCan();
    const { id } = useParams<{ id: string }>();
    const { queryResult } = useShow({
        resource: 'users',
        id,
        meta: {
            // populate: '*',
        },
    });
    const { data, isLoading } = queryResult;

    const theUser = (data?.data || {}) as TUser;

    const columns = [
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

    return (
        <>
            <Show
                isLoading={isLoading}
                title={`【${theUser?.display_name}】Member Detail`}
                resource="users"
                canDelete={canDelete}
                canEdit={canEdit}
                contentProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        padding: '24px 0px 24px 0px',
                    },
                }}
            >
                <ResponsiveMasonry columnsCountBreakPoints={{ 576: 1, 1080: 2 }}>
                    <Masonry gutter="1.5rem">
                        <div>
                            <Card bordered={false} title="Info">
                                <ObjectTable record={theUser} columns={columns} />
                            </Card>
                        </div>
                        <div>
                            <Card bordered={false} title="Money Log">
                                <MoneyLog user_id={id} />
                            </Card>
                        </div>
                        <div>
                            <Card bordered={false} title="Login History">
                                <LoginDetail user_id={id} />
                            </Card>
                        </div>
                        <div>
                            <Card bordered={false} title="Betting Records"></Card>
                        </div>
                    </Masonry>
                </ResponsiveMasonry>
            </Show>
        </>
    );
};

export default index;
