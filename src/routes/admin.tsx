import { Route } from 'react-router-dom';
import Home from '@/pages/Admin/home';
import { StatisticReport, AgentStatistic, MemberStatistic } from '@/pages/Admin/dashboard';
import { ListMember, CreateMember, BalanceAdjustment } from '@/pages/Admin/members';
import { ListAgent, CreateAgent, AffCommissionTransactions, AffTransactions, CommissionSetting, CommissionSettlement } from '@/pages/Admin/agents';
import { ListDeposits, ListWithdraws } from '@/pages/Admin/payments';
import { ListBettingRecords } from '@/pages/Admin/bettingManagement';
import { VipSetting } from '@/pages/Admin/systemSetting';
import { AntdInferencer } from '@refinedev/inferencer/antd';

const adminRoutes = () => {
    return (
        <>
            <Route path="/refine/home" element={<Home />} />

            <Route path="/refine/dashboard">
                <Route index element={<StatisticReport />} />
                <Route path="statistic-report" element={<StatisticReport />} />
                <Route path="agent-statistic" element={<AgentStatistic />} />
                <Route path="member-statistic" element={<MemberStatistic />} />
            </Route>
            <Route path="/refine/members">
                <Route index element={<ListMember />} />
                <Route path="list" element={<ListMember />} />
                <Route path="create" element={<CreateMember />} />
                <Route path="balance-adjustment" element={<BalanceAdjustment />} />
            </Route>

            <Route path="/refine/agents">
                <Route index element={<ListAgent />} />
                <Route path="list" element={<ListAgent />} />
                <Route path="create" element={<CreateAgent />} />
                <Route path="commission-setting" element={<CommissionSetting />} />
                <Route path="commission-settlement" element={<CommissionSettlement />} />
                <Route path="aff-transactions" element={<AffTransactions />} />
                <Route path="aff-commission-transactions" element={<AffCommissionTransactions />} />
            </Route>

            <Route path="/refine/payments">
                <Route index element={<ListDeposits />} />
                <Route path="list-deposits" element={<ListDeposits />} />
                <Route path="list-withdraws" element={<ListWithdraws />} />
            </Route>
            <Route path="/refine/betting-management">
                <Route index element={<ListBettingRecords />} />
                <Route path="list-betting-records" element={<ListBettingRecords />} />
            </Route>
            <Route path="/refine/system-setting">
                <Route index element={<VipSetting />} />
                <Route path="vips" element={<VipSetting />} />
                <Route path="vips/create" element={<AntdInferencer />} />
                <Route path="vips/edit/:id" element={<AntdInferencer />} />
                <Route path="vips/delete/:id" element={<AntdInferencer />} />
            </Route>
        </>
    );
};

export default adminRoutes;
