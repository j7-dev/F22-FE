import { Card, Tabs, TabsProps } from 'antd';
import { Show } from '@refinedev/antd';
import { useCan } from '@/hooks';
import { useShow } from '@refinedev/core';
import ObjectTable from '@/components/general/ObjectTable';
import MoneyLog from '@/components/Admin/MoneyLog';
import LoginDetail from '@/components/Admin/LoginDetail';
import BetRecordTable from '@/components/Admin/BetRecordTable';
import { useParams } from 'react-router-dom';
import { TUser, TDiscount } from '@/types';
import { infoLeftColumns, infoRightColumns } from './infoColumns';
import TurnoverBonusTable from '@/components/Admin/TurnoverBonusTable';

const index = () => {
    const { canDelete, canEdit } = useCan();
    const { id } = useParams<{ id: string }>();
    const { queryResult } = useShow({
        resource: 'users',
        id,
        meta: {
            populate: {
                vip: {
                    fields: ['label'],
                    populate: {
                        discount: {
                            fields: '*',
                        },
                    },
                },
            },
        },
    });
    const { data, isLoading } = queryResult;

    const theUser = (data?.data || {}) as TUser;
    const discount = (theUser?.vip?.discount || { ratio: [] }) as TDiscount;

    const items: TabsProps['items'] = [
        {
            key: 'moneyLog',
            label: 'Money Log',
            children: (
                <Card bordered={false} title="Money Log">
                    <MoneyLog user_id={id} />
                </Card>
            ),
        },
        {
            key: 'loginDetail',
            label: 'Login History',
            children: (
                <Card bordered={false} title="Login History">
                    <LoginDetail user_id={id} />
                </Card>
            ),
        },
        {
            key: 'betRecordTable',
            label: 'Betting Records',
            children: (
                <Card bordered={false} title="Betting Records">
                    <BetRecordTable user_id={id} />
                </Card>
            ),
        },
        {
            key: 'turnoverBonus',
            label: 'Turnover Bonus',
            children: (
                <Card bordered={false} title="Turnover Bonus">
                    <TurnoverBonusTable discount={discount} />
                </Card>
            ),
        },
        {
            key: 'userNotes',
            label: 'User Notes',
            children: <Card bordered={false} title="User Notes"></Card>,
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
                <div>
                    <Card bordered={false} title="Info">
                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
                            <ObjectTable record={theUser} columns={infoLeftColumns} />
                            <ObjectTable record={theUser} columns={infoRightColumns} />
                        </div>
                    </Card>
                </div>
                <div>
                    <Tabs className="mt-12" defaultActiveKey="moneyLog1" type="card" centered items={items} tabBarStyle={{ marginBottom: '0px' }} />
                </div>
            </Show>
        </>
    );
};

export default index;
