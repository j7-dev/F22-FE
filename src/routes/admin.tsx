import { Route } from 'react-router-dom';
import Home from '@/pages/Admin/home';
import { StatisticReport, AgentStatistic, MemberStatistic } from '@/pages/Admin/dashboard';
import { ListMember, CreateMember, ShowMember, EditMember, BalanceAdjustment } from '@/pages/Admin/members';
import { ListAgent, CreateAgent, EditAgent, AffCommissionTransactions, AffTransactions, ListCommission, CreateCommission, ShowCommission, EditCommission, CommissionSettlement } from '@/pages/Admin/agents';
import { ListDeposits, ListWithdraws } from '@/pages/Admin/payments';
import { ListBettingRecords } from '@/pages/Admin/bettingManagement';
import { VipSetting } from '@/pages/Admin/systemSetting';

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
                <Route path="balance-adjustment" element={<BalanceAdjustment />} />
            </Route>

            <Route path="/refine/:roleType/">
                <Route index element={<ListAgent />} />
                <Route path="list" element={<ListAgent />} />
                <Route path="create" element={<CreateAgent />} />
                <Route path="show/:id" element={<ShowMember />} />
                <Route path="edit/:id" element={<EditAgent />} />
                <Route path="commissions" element={<ListCommission />} />
                <Route path="commissions/create" element={<CreateCommission />} />
                <Route path="commissions/show/:id" element={<ShowCommission />} />
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
                <Route path="list-betting-records" element={<ListBettingRecords />} />
            </Route>
            <Route path="/refine/system-setting/">
                <Route index element={<VipSetting />} />
                <Route path="vips" element={<VipSetting />} />
            </Route>
        </>
    );
};

export default adminRoutes;
