import { lazy } from 'react';
import { Route } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Admin/home'));
const AgentDailyStatistic = lazy(() => import('@/pages/Admin/dashboard/agentDailyStatistic'));
const DailyStatistic = lazy(() => import('@/pages/Admin/dashboard/dailyStatistic'));
const ListMember = lazy(() => import('@/pages/Admin/members/List'));
const CreateMember = lazy(() => import('@/pages/Admin/members/Create'));
const ShowMember = lazy(() => import('@/pages/Admin/members/Show'));
const EditMember = lazy(() => import('@/pages/Admin/members/Edit'));
const ListAgent = lazy(() => import('@/pages/Admin/agents/List'));
const CreateAgent = lazy(() => import('@/pages/Admin/agents/Create'));
const EditAgent = lazy(() => import('@/pages/Admin/agents/Edit'));
const ListCommission = lazy(() => import('@/pages/Admin/agents/commissionSetting/List'));
const CreateCommission = lazy(() => import('@/pages/Admin/agents/commissionSetting/Create'));
const EditCommission = lazy(() => import('@/pages/Admin/agents/commissionSetting/Edit'));
const CommissionSettlement = lazy(() => import('@/pages/Admin/agents/commissionSettlement'));
const AffCommissionTransactions = lazy(() => import('@/pages/Admin/agents/affCommissionTransactions'));
const AffTransactions = lazy(() => import('@/pages/Admin/agents/affTransactions'));
const ListBettingRecords = lazy(() => import('@/pages/Admin/bettingManagement/List'));
const ListDeposits = lazy(() => import('@/pages/Admin/payments/listDeposits'));
const ListWithdraws = lazy(() => import('@/pages/Admin/payments/listWithdraws'));
const SiteSetting = lazy(() => import('@/pages/Admin/systemSetting/siteSetting/List'));
const ListVips = lazy(() => import('@/pages/Admin/systemSetting/vipSetting/List'));
const CreateVips = lazy(() => import('@/pages/Admin/systemSetting/vipSetting/Create'));
const EditVips = lazy(() => import('@/pages/Admin/systemSetting/vipSetting/Edit'));
const ListDepositBonuses = lazy(() => import('@/pages/Admin/depositBonuses/List'));
const CreateDepositBonuses = lazy(() => import('@/pages/Admin/depositBonuses/Create'));
const EditDepositBonuses = lazy(() => import('@/pages/Admin/depositBonuses/Edit'));
const ListSiteNotifications = lazy(() => import('@/pages/Admin/systemSetting/siteNotifications/List'));
const CreateSiteNotifications = lazy(() => import('@/pages/Admin/systemSetting/siteNotifications/Create'));
const EditSiteNotifications = lazy(() => import('@/pages/Admin/systemSetting/siteNotifications/Edit'));
const ListCoupons = lazy(() => import('@/pages/Admin/coupons/List'));
const CreateCoupons = lazy(() => import('@/pages/Admin/coupons/Create'));
const EditCoupons = lazy(() => import('@/pages/Admin/coupons/Edit'));

const adminRoutes = (role: string) => {
    return (
        <>
            <Route path="/refine/home/" element={<Home />} />

            <Route path="/refine/dashboard/">
                <Route index element={<DailyStatistic />} />
                <Route path="daily-statistic" element={<DailyStatistic />} />
                <Route path="agent-daily-statistic" element={<AgentDailyStatistic />} />
            </Route>
            <Route path="/refine/members/">
                <Route index element={<ListMember />} />
                <Route path="list" element={<ListMember />} />
                <Route path="create" element={<CreateMember />} />
                <Route path="show/:id" element={<ShowMember />} />
                <Route path="edit/:id" element={<EditMember />} />
            </Route>

            {role === 'admin' && (
                <>
                    <Route path="/refine/:roleType/">
                        <Route index element={<ListAgent />} />
                        <Route path="list" element={<ListAgent />} />
                        <Route path="create" element={<CreateAgent />} />
                        <Route path="show/:id" element={<ShowMember />} />
                        <Route path="edit/:id" element={<EditAgent />} />
                        <Route path="commissions" element={<ListCommission />} />
                        <Route path="commissions/create" element={<CreateCommission />} />
                        <Route path="commissions/edit/:id" element={<EditCommission />} />

                        <Route path="commission-settlement" element={<CommissionSettlement />} />
                        <Route path=":type/aff-transactions" element={<AffTransactions />} />
                        <Route path="aff-commission-settlement" element={<AffCommissionTransactions />} />
                    </Route>

                    <Route path="/refine/payments/">
                        <Route index element={<ListDeposits />} />
                        <Route path=":type/list" element={<ListDeposits />} />
                        <Route path=":type/list" element={<ListWithdraws />} />
                    </Route>
                    <Route path="/refine/betting-management/">
                        <Route index element={<ListBettingRecords />} />
                        <Route path="betting-records" element={<ListBettingRecords />} />
                    </Route>
                    <Route path="/refine/system-setting/">
                        <Route index element={<ListVips />} />
                        <Route path="vips" element={<ListVips />} />
                        <Route path="vips/create" element={<CreateVips />} />
                        <Route path="vips/edit/:id" element={<EditVips />} />
                        <Route path="site-setting" element={<SiteSetting />} />
                        <Route path="site-notifications" element={<ListSiteNotifications />} />
                        <Route path="site-notifications/create" element={<CreateSiteNotifications />} />
                        <Route path="site-notifications/edit/:id" element={<EditSiteNotifications />} />
                    </Route>
                    <Route path="/refine/promotion/">
                        <Route index path="deposit-bonuses" element={<ListDepositBonuses />} />
                        <Route path="deposit-bonuses/create" element={<CreateDepositBonuses />} />
                        <Route path="deposit-bonuses/edit/:id" element={<EditDepositBonuses />} />
                        <Route index path="coupons" element={<ListCoupons />} />
                        <Route path="coupons/create" element={<CreateCoupons />} />
                        <Route path="coupons/edit/:id" element={<EditCoupons />} />
                    </Route>
                </>
            )}
        </>
    );
};

export default adminRoutes;
