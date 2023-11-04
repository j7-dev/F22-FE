import { Card, Tabs, TabsProps } from 'antd';
import { Show } from '@refinedev/antd';
import { useCan } from '@/hooks';
import { useShow, useResource } from '@refinedev/core';
import ObjectTable from '@/components/general/ObjectTable';
import MoneyLog from '@/components/Admin/MoneyLog';
import LoginDetail from '@/components/Admin/LoginDetail';
import UserBetRecordTable from '@/components/Admin/UserBetRecordTable';
import { useParams } from 'react-router-dom';
import { TUser } from '@/types';
import { Create } from '@/components/resources/transactionRecords';
import { DollarOutlined } from '@ant-design/icons';
import useDpWdUserInfo from '../List/hooks/useDpWdUserInfo';
import useColumns from './useColumns';
import NotesForm from './NotesForm';

const index = () => {
    const { identifier } = useResource();
    const { canDelete, canEdit } = useCan();
    const { id } = useParams<{ id: string }>();
    const { queryResult } = useShow({
        resource: 'users',
        id,
        meta: {
            populate: {
                vip: {
                    fields: ['label', 'turnover_rate'],
                    populate: {
                        discount: {
                            fields: '*',
                        },
                    },
                },
                balances: {
                    fields: '*',
                },
            },
        },
    });
    const { data, isLoading } = queryResult;

    const theUser = (data?.data || {}) as TUser;

    const { data: dpWdUserInfoData } = useDpWdUserInfo({ user_ids: [Number(id)] });
    const { user_id: _user_id, ...dpWdUserInfo } = dpWdUserInfoData?.data?.data?.[0] || {};
    const userData = {
        ...theUser,
        ...dpWdUserInfo,
    };

    const { infoLeftColumns, infoRightColumns } = useColumns();

    const items: TabsProps['items'] = [
        {
            key: 'userInfo',
            label: 'User Info',
            children: (
                <div>
                    <Card bordered={false} title="Info">
                        <div className="mb-12">
                            <p>
                                <DollarOutlined className="mr-2" />
                                Balance Adjustment
                            </p>
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
                        </div>
                        <div className="grid grid-cols-2 xl:grid-cols-2 gap-6">
                            <ObjectTable record={userData} columns={infoLeftColumns} />
                            <ObjectTable record={userData} columns={infoRightColumns} />
                        </div>
                    </Card>
                </div>
            ),
        },
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
                    <UserBetRecordTable user_id={id} />
                </Card>
            ),
        },
        {
            key: 'turnoverBonus',
            label: 'Turnover Bonus',
            children: (
                <Card bordered={false} title="Turnover Bonus">
                    <p>Turnover Bonus Rate: {theUser?.vip?.turnover_rate || 0}%</p>
                    <MoneyLog user_id={id} amount_type="TURNOVER_BONUS" />
                </Card>
            ),
        },
        {
            key: 'userNotes',
            label: 'User Notes',
            children: (
                <Card bordered={false} title="User Notes">
                    <NotesForm user_notes={theUser?.user_notes} />
                </Card>
            ),
        },
    ];

    return (
        <>
            <Show
                isLoading={isLoading}
                title={`【${theUser?.display_name}】 Member Detail`}
                resource={identifier}
                recordItemId={id}
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
                <Tabs defaultActiveKey="moneyLog1" type="card" centered items={items} tabBarStyle={{ marginBottom: '0px' }} />
            </Show>
        </>
    );
};

export default index;
