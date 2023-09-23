import { HomeOutlined, LineChartOutlined, UserAddOutlined, TransactionOutlined, AuditOutlined, SettingOutlined } from '@ant-design/icons';
import { PiUsersThree } from 'react-icons/pi';

export const resources = [
    {
        name: 'home',
        identifier: 'home',
        list: '/refine/home',
        meta: {
            label: 'Home',
            icon: <HomeOutlined />,
        },
    },
    {
        name: 'dashboard',
        meta: {
            label: 'Dashboard 資訊看板',
            icon: <LineChartOutlined />,
        },
    },
    {
        name: 'statistic-report',
        identifier: 'statistic-report',
        list: '/refine/dashboard/statistic-report',
        meta: {
            parent: 'dashboard',
            label: 'Statistic Report 統計報表',
        },
    },
    {
        name: 'agent-statistic',
        identifier: 'agent-statistic',
        list: '/refine/dashboard/agent-statistic',
        meta: {
            parent: 'dashboard',
            label: 'Agent Statistic 代理績效報表',
        },
    },
    {
        name: 'member-statistic',
        identifier: 'member-statistic',
        list: '/refine/dashboard/member-statistic',
        meta: {
            parent: 'dashboard',
            label: 'Member Statistic 會員績效報表',
        },
    },
    {
        name: 'members',
        meta: {
            label: 'Member Management 會員管理',
            icon: <PiUsersThree />,
        },
    },
    {
        name: 'users',
        identifier: 'members-list',
        list: '/refine/members/list',
        create: '/refine/members/create',
        show: '/refine/members/show/:id',
        edit: '/refine/members/edit/:id',
        delete: '/refine/members/delete/:id',
        meta: {
            parent: 'members',
            label: 'All Members 會員查詢',
        },
    },

    {
        name: 'balance-adjustment',
        identifier: 'balance-adjustment',
        list: '/refine/members/balance-adjustment',
        meta: {
            parent: 'members',
            label: 'Balance Adjustment 人工存提',
        },
    },

    {
        name: 'agents',
        meta: {
            label: 'Member Management 代理商管理',
            icon: <UserAddOutlined />,
        },
    },
    {
        name: 'balance-adjustment',
        identifier: 'balance-adjustment',
        list: '/refine/agents/list',
        meta: {
            parent: 'agents',
            label: 'Balance Adjustment 人工存提',
        },
    },
    {
        name: 'users',
        identifier: 'agents-create',
        list: '/refine/agents/create',
        meta: {
            parent: 'agents',
            label: 'Create Agent 新增代理商',
        },
    },
    {
        name: 'commissions',
        identifier: 'commissions',
        list: '/refine/agents/commissions',
        show: '/refine/agents/commissions/show/:id',
        create: '/refine/agents/commissions/create',
        edit: '/refine/agents/commissions/edit/:id',
        delete: '/refine/agents/commissions/delete/:id',
        meta: {
            parent: 'agents',
            label: 'Commission Setting 佣金設定',
        },
    },
    {
        name: 'commission-settlement',
        identifier: 'commission-settlement',
        list: '/refine/agents/commission-settlement',
        meta: {
            parent: 'agents',
            label: 'Commission Settlement 佣金計算',
        },
    },

    {
        name: 'aff-transactions',
        identifier: 'aff-transactions',
        list: '/refine/agents/aff-transactions',
        meta: {
            parent: 'agents',
            label: 'AFF Transactions 代理交易紀錄查詢',
        },
    },
    {
        name: 'aff-commission-transactions',
        identifier: 'aff-commission-transactions',
        list: '/refine/agents/aff-commission-transactions',
        meta: {
            parent: 'agents',
            label: 'AFF Commission Transactions 代理佣金交易紀錄',
        },
    },
    {
        name: 'payments',
        meta: {
            label: 'Payments 支付管理',
            icon: <TransactionOutlined />,
        },
    },
    {
        name: 'transaction-records',
        identifier: 'deposits-list',
        list: '/refine/payments/deposits/list',
        meta: {
            parent: 'payments',
            label: 'All Deposits 公司入款審核',
        },
    },
    {
        name: 'transaction-records',
        identifier: 'withdraws-list',
        list: '/refine/payments/withdraws/list',
        meta: {
            parent: 'payments',
            label: 'All Withdraws 取款審核',
        },
    },
    {
        name: 'betting-management',
        meta: {
            label: 'Betting Management 注單管理',
            icon: <AuditOutlined />,
        },
    },
    {
        name: 'betting-records',
        identifier: 'betting-records/list',
        list: '/refine/betting-management/betting-records/list',
        meta: {
            parent: 'betting-management',
            label: 'All Betting Records 投注記錄查詢',
        },
    },
    {
        name: 'system-setting',
        meta: {
            label: 'System Setting 系統設定',
            icon: <SettingOutlined />,
        },
    },
    {
        name: 'vips',
        identifier: 'vips',
        list: '/refine/system-setting/vips',
        create: '/refine/system-setting/vips/create',
        edit: '/refine/system-setting/vips/edit/:id',
        delete: '/refine/system-setting/vips/delete/:id',
        meta: {
            parent: 'system-setting',
            label: 'VIP Upgrade Rule VIP等級管理',
        },
    },
];
