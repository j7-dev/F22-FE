import { HomeOutlined, LineChartOutlined, UserAddOutlined, TransactionOutlined, AuditOutlined, SettingOutlined } from '@ant-design/icons';
import { PiUsersThree } from 'react-icons/pi';

export const resources = [
    {
        name: 'home',
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
        list: '/refine/dashboard/statistic-report',
        meta: {
            parent: 'dashboard',
            label: 'Statistic Report 統計報表',
        },
    },
    {
        name: 'agent-statistic',
        list: '/refine/dashboard/agent-statistic',
        meta: {
            parent: 'dashboard',
            label: 'Agent Statistic 代理績效報表',
        },
    },
    {
        name: 'member-statistic',
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
        name: 'list-agents',
        list: '/refine/agents/list',
        meta: {
            parent: 'agents',
            label: 'Balance Adjustment 人工存提',
        },
    },
    {
        name: 'create-agents',
        list: '/refine/agents/create',
        meta: {
            parent: 'agents',
            label: 'Balance Adjustment 新增代理商',
        },
    },
    {
        name: 'commission-setting',
        list: '/refine/agents/commission-setting',
        meta: {
            parent: 'agents',
            label: 'Commission Setting 佣金設定',
        },
    },
    {
        name: 'commission-settlement',
        list: '/refine/agents/commission-settlement',
        meta: {
            parent: 'agents',
            label: 'Commission Settlement 佣金計算',
        },
    },

    {
        name: 'aff-transactions',
        list: '/refine/agents/aff-transactions',
        meta: {
            parent: 'agents',
            label: 'AFF Transactions 代理交易紀錄查詢',
        },
    },
    {
        name: 'aff-commission-transactions',
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
        name: 'list-deposits',
        list: '/refine/payments/list-deposits',
        meta: {
            parent: 'payments',
            label: 'All Deposits 公司入款審核',
        },
    },
    {
        name: 'list-withdraws',
        list: '/refine/payments/list-withdraws',
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
        name: 'list-betting-records',
        list: '/refine/betting-management/list-betting-records',
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
