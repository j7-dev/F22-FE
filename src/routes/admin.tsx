import { lazy } from 'react';
import { Route } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Admin/home'));
const StatisticReport = lazy(() => import('@/pages/Admin/dashboard/statisticReport'));
const AgentStatistic = lazy(() => import('@/pages/Admin/dashboard/agentStatistic'));
const MemberStatistic = lazy(() => import('@/pages/Admin/dashboard/memberStatistic'));
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
const CommissionSettlement = lazy(() => import('@/pages/Admin/agents/commissionSettlement/List'));
const AffCommissionTransactions = lazy(() => import('@/pages/Admin/agents/affCommissionTransactions'));
const AffTransactions = lazy(() => import('@/pages/Admin/agents/affTransactions'));
const VipSetting = lazy(() => import('@/pages/Admin/systemSetting/vipSetting'));
const ListBettingRecords = lazy(() => import('@/pages/Admin/bettingManagement/List'));
const ListDeposits = lazy(() => import('@/pages/Admin/payments/listDeposits'));
const ListWithdraws = lazy(() => import('@/pages/Admin/payments/listWithdraws'));
const SiteSetting = lazy(() => import('@/pages/Admin/systemSetting/siteSetting/List'));
const ListDiscount = lazy(() => import('@/pages/Admin/discounts/List'));
const CreateDiscount = lazy(() => import('@/pages/Admin/discounts/Create'));
const EditDiscount = lazy(() => import('@/pages/Admin/discounts/Edit'));
const ListDepositBonuses = lazy(() => import('@/pages/Admin/depositBonuses/List'));
const CreateDepositBonuses = lazy(() => import('@/pages/Admin/depositBonuses/Create'));
const EditDepositBonuses = lazy(() => import('@/pages/Admin/depositBonuses/Edit'));

const adminRoutes = () => {
    return (
        <>
            <Route path="/refine/home/" element={<Home />} />

            <Route path="/refine/dashboard/">
                <Route index element={<StatisticReport />} />
                <Route path="statistic-report" element={<StatisticReport />} />
                <Route path="agent-statistic" element={<AgentStatistic />} />
                <Route path="member-statistic" element={<MemberStatistic />} />
            </Route>
            <Route path="/refine/members/">
                <Route index element={<ListMember />} />
                <Route path="list" element={<ListMember />} />
                <Route path="create" element={<CreateMember />} />
                <Route path="show/:id" element={<ShowMember />} />
                <Route path="edit/:id" element={<EditMember />} />
            </Route>

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
                <Route index element={<VipSetting />} />
                <Route path="vips" element={<VipSetting />} />
                <Route path="site-setting" element={<SiteSetting />} />
            </Route>
            <Route path="/refine/promotion/">
                <Route index element={<ListDiscount />} />
                <Route path="discounts" element={<ListDiscount />} />
                <Route path="discounts/create" element={<CreateDiscount />} />
                <Route path="discounts/edit/:id" element={<EditDiscount />} />
                <Route path="deposit-bonuses" element={<ListDepositBonuses />} />
                <Route path="deposit-bonuses/create" element={<CreateDepositBonuses />} />
                <Route path="deposit-bonuses/edit/:id" element={<EditDepositBonuses />} />
            </Route>
        </>
    );
};

export default adminRoutes;
