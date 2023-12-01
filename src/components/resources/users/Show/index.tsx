import { Card, Tabs, TabsProps, Alert, Popconfirm, Button } from 'antd';
import { Show } from '@refinedev/antd';
import { useShow, useResource, useUpdate } from '@refinedev/core';
import ObjectTable from '@/components/general/ObjectTable';
import MoneyLog from '@/components/Admin/MoneyLog';
import LoginDetail from '@/components/Admin/LoginDetail';
import ListBettingRecords from '@/components/resources/betRecords/List';
import { useParams } from 'react-router-dom';
import { TUser } from '@/types';
import { DollarOutlined } from '@ant-design/icons';
import useDpWdUserInfo from '../List/hooks/useDpWdUserInfo';
import useUserAdditionalInfo from '../List/hooks/useUserAdditionalInfo';
import useColumns from './useColumns';
import NotesForm from './NotesForm';
import { useTranslation } from 'react-i18next';
import { RiCoupon3Line } from 'react-icons/ri';
import CreateCoupon from '@/components/resources/coupons/Create';
import CreateTxn from '@/components/resources/transactionRecords/Create';
import DailyStatistic from '@/pages/Admin/dashboard/dailyStatistic';
import SimpleAmount from '@/components/Admin/SimpleAmount';
import dayjs from 'dayjs';
import { useGetUserRoleType } from '@/hooks';
import UserSummary2 from '@/components/Admin/UserSummary2';

const index = () => {
    const roleType = useGetUserRoleType();
    const { t } = useTranslation();
    const { identifier } = useResource();
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
                agent: {
                    fields: ['display_name', 'username'],
                },
                referral: {
                    fields: ['display_name', 'username'],
                },
                last_deposit: {
                    fields: ['amount', 'created_at'],
                    populate: {
                        deposit_bonus: {
                            fields: '*',
                        },
                    },
                },
            },
        },
    });
    const { data, isLoading } = queryResult;

    const theUser = (data?.data || {}) as TUser;

    const { data: dpWdUserInfoData } = useDpWdUserInfo({ user_ids: [Number(id)] });
    const { data: userAdditionalInfo } = useUserAdditionalInfo({ user_id: Number(id) });

    const { user_id: _user_id, ...dpWdUserInfo } = dpWdUserInfoData?.data?.data?.[0] || {};
    const userData = {
        ...theUser,
        ...dpWdUserInfo,
        ...userAdditionalInfo,
    };

    const { infoLeftColumns, infoRightColumns } = useColumns();

    const latestDeposit = theUser?.last_deposit;
    const depositBonus = latestDeposit?.deposit_bonus;

    const { mutate } = useUpdate();

    const handleRemoveDepositBonus = () => {
        mutate({
            resource: 'users',
            values: {
                last_deposit: null,
            },
            id: theUser?.id,
        });
    };

    const items: TabsProps['items'] = [
        {
            key: 'userInfo',
            label: t('User Info'),
            children: (
                <div>
                    <Card bordered={false} title={t('Info')}>
                        <div className="grid grid-cols-2 xl:grid-cols-2 gap-6">
                            <ObjectTable record={userData} columns={infoLeftColumns} />
                            <ObjectTable record={userData} columns={infoRightColumns} />
                        </div>
                        <Alert
                            className="mt-4"
                            message={latestDeposit ? t("User's Deposit Bonus") : t('No Deposit Bonus')}
                            description={
                                latestDeposit ? (
                                    <>
                                        <p>
                                            {t('Latest Deposit')}:{' '}
                                            <span className="bg-yellow-200 px-3">
                                                <SimpleAmount amount={latestDeposit?.amount || 0} />
                                            </span>{' '}
                                            <u>{dayjs(latestDeposit?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</u>
                                        </p>
                                        <p>{depositBonus?.label}</p>
                                        <p>
                                            {t('Allow Game Categories')}: {depositBonus?.allow_game_categories?.join(', ')}
                                        </p>
                                        {roleType === 'admin' && (
                                            <Popconfirm title={t('Confirm?')} description="Remove user's deposit bonus?" onConfirm={handleRemoveDepositBonus} okText="Yes" cancelText="No">
                                                <Button type="primary">{t("Remove user's deposit bonus")}</Button>
                                            </Popconfirm>
                                        )}
                                    </>
                                ) : (
                                    ''
                                )
                            }
                            type={latestDeposit ? 'info' : 'success'}
                            showIcon
                        />
                    </Card>
                </div>
            ),
        },
        {
            key: 'moneyLog',
            label: t('Money Log'),
            children: (
                <Card bordered={false} title={t('Money Log')}>
                    <MoneyLog user_id={id} />
                </Card>
            ),
        },
        {
            key: 'loginDetail',
            label: t('Login History'),
            children: (
                <Card bordered={false} title={t('Login History')}>
                    <LoginDetail user_id={id} />
                </Card>
            ),
        },
        {
            key: 'betRecordTable',
            label: t('Betting Records'),
            children: (
                <Card bordered={false} title={t('Betting Records')}>
                    <ListBettingRecords user_id={id} title={<></>} breadcrumb={null} />
                </Card>
            ),
        },
        {
            key: 'turnoverBonus',
            label: t('Turnover Bonus'),
            children: (
                <Card bordered={false} title={t('Turnover Bonus')}>
                    <p>
                        {t('Turnover Bonus Rate')}: {theUser?.vip?.turnover_rate || 0}%
                    </p>
                    <MoneyLog user_id={id} amount_type="TURNOVER_BONUS" />
                </Card>
            ),
        },
        {
            key: 'userNotes',
            label: t('User Notes'),
            children: (
                <Card bordered={false} title={t('User Notes')}>
                    <NotesForm user_notes={theUser?.user_notes} />
                </Card>
            ),
        },
        {
            key: 'balanceAdjustment',
            label: t('Balance Adjustment'),
            children: (
                <Card bordered={false} title={t('Balance Adjustment')}>
                    <div className="mb-8">
                        <p>
                            <RiCoupon3Line className="mr-2" />
                            {t('Coupon')}
                        </p>
                        <CreateCoupon
                            title={<></>}
                            goBack={<></>}
                            breadcrumb={null}
                            contentProps={{
                                style: {
                                    boxShadow: 'none',
                                    padding: '0rem',
                                    marginTop: '-4rem',
                                    backgroundColor: 'transparent',
                                },
                            }}
                        />
                    </div>
                    <div className="mb-8">
                        <p>
                            <DollarOutlined className="mr-2" />
                            {t('Balance Adjustment')}
                        </p>
                        <CreateTxn
                            title={<></>}
                            goBack={<></>}
                            breadcrumb={null}
                            contentProps={{
                                style: {
                                    boxShadow: 'none',
                                    padding: '0rem',
                                    marginTop: '-4rem',
                                    backgroundColor: 'transparent',
                                },
                            }}
                        />
                    </div>
                </Card>
            ),
        },
        {
            key: 'daily-statistic',
            label: t('Daily Statistic'),
            children: <DailyStatistic user_id={Number(id)} />,
        },
        {
            key: 'referral-infomation',
            label: t('Referral Information'),
            children: <UserSummary2 user_id={Number(id)} />,
        },
    ];

    return (
        <>
            <Show
                isLoading={isLoading}
                title={`【${theUser?.username}】 ${t('Member Detail')}`}
                resource={identifier}
                recordItemId={id}
                canDelete={roleType === 'admin'}
                canEdit={roleType === 'admin'}
                contentProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        padding: '0px 0px 24px 0px',
                    },
                }}
            >
                {roleType === 'admin' ? (
                    <Tabs className="-mt-8" defaultActiveKey="moneyLog1" type="card" centered items={items} tabBarStyle={{ marginBottom: '0px' }} />
                ) : (
                    <div>
                        <Card bordered={false} title={t('Info')}>
                            <div className="grid grid-cols-2 xl:grid-cols-2 gap-6">
                                <ObjectTable record={userData} columns={infoLeftColumns} />
                                <ObjectTable record={userData} columns={infoRightColumns} />
                            </div>
                        </Card>
                    </div>
                )}
            </Show>
        </>
    );
};

export default index;
