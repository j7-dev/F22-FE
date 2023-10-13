import { Card, Tabs, TabsProps, Collapse } from 'antd';
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
import { Create } from '@/components/resources/transactionRecords';
import { DollarOutlined } from '@ant-design/icons';

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

                <Collapse
                    bordered={false}
                    className="bg-white my-12"
                    items={[
                        {
                            key: 'balanceAdjustment',
                            label: (
                                <span className="font-semibold text-base relative -top-0.5">
                                    <DollarOutlined className="mr-2" />
                                    Balance Adjustment
                                </span>
                            ),
                            children: (
                                <Create
                                    title={<></>}
                                    goBack={<></>}
                                    breadcrumb={null}
                                    contentProps={{
                                        style: {
                                            boxShadow: 'none',
                                            padding: '0rem',
                                        },
                                    }}
                                />
                            ),
                        },
                    ]}
                />
                <div>
                    <Tabs defaultActiveKey="moneyLog1" type="card" centered items={items} tabBarStyle={{ marginBottom: '0px' }} />
                </div>
            </Show>
        </>
    );
};

export default index;
