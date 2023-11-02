import { HomeOutlined, LineChartOutlined, UserAddOutlined, TransactionOutlined, AuditOutlined, SettingOutlined } from '@ant-design/icons';
import { PiUsersThree } from 'react-icons/pi';
import { CiDiscount1 } from 'react-icons/ci';

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
        name: 'daily-statistic',
        identifier: 'daily-statistic',
        list: '/refine/dashboard/daily-statistic',
        meta: {
            parent: 'dashboard',
            label: 'Daily Statistic 每日統計',
        },
    },
    {
        name: 'agent-daily-statistic',
        identifier: 'agent-daily-statistic',
        list: '/refine/dashboard/agent-daily-statistic',
        meta: {
            parent: 'dashboard',
            label: 'Agent Daily Statistic 代理每日統計',
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
        name: 'agent',
        meta: {
            label: 'Member Management 代理商管理',
            icon: <UserAddOutlined />,
        },
    },
    {
        name: 'users',
        identifier: 'agents-create',
        list: '/refine/agent/list',
        create: '/refine/agent/create',
        show: '/refine/agent/show/:id',
        edit: '/refine/agent/edit/:id',
        delete: '/refine/agent/delete/:id',
        meta: {
            parent: 'agent',
            label: 'All Agents 代理商管理',
        },
    },
    // {
    //     name: 'commissions',
    //     identifier: 'commissions',
    //     list: '/refine/agent/commissions',
    //     show: '/refine/agent/commissions/show/:id',
    //     create: '/refine/agent/commissions/create',
    //     edit: '/refine/agent/commissions/edit/:id',
    //     delete: '/refine/agent/commissions/delete/:id',
    //     meta: {
    //         parent: 'agent',
    //         label: 'Commission Setting 佣金設定',
    //     },
    // },
    {
        name: 'commission-settlement',
        identifier: 'commission-settlement',
        list: '/refine/agent/commission-settlement',
        meta: {
            parent: 'agent',
            label: 'Commission Settlement 佣金計算',
        },
    },

    // {
    //     name: 'transaction-records',
    //     identifier: 'aff-transactions',
    //     list: '/refine/agent/all/aff-transactions',
    //     meta: {
    //         parent: 'agent',
    //         label: 'AFF Transactions 代理交易紀錄查詢',
    //     },
    // },
    // {
    //     name: 'aff-commission-transactions',
    //     identifier: 'aff-commission-transactions',
    //     list: '/refine/agent/all/aff-commission-transactions',
    //     meta: {
    //         parent: 'agent',
    //         label: 'AFF Commission Transactions 代理佣金交易紀錄',
    //     },
    // },
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
        list: '/refine/payments/deposit/list',
        meta: {
            parent: 'payments',
            label: 'All Deposits 公司入款審核',
        },
    },
    {
        name: 'transaction-records',
        identifier: 'withdraws-list',
        list: '/refine/payments/withdraw/list',
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
        identifier: 'betting-records',
        list: '/refine/betting-management/betting-records',
        meta: {
            parent: 'betting-management',
            label: 'All Betting Records 投注記錄查詢',
        },
    },
    {
        name: 'promotion',
        meta: {
            label: 'Promotion 優惠管理',
            icon: <CiDiscount1 />,
        },
    },
    {
        name: 'deposit-bonuses',
        identifier: 'deposit-bonuses',
        list: '/refine/promotion/deposit-bonuses',
        create: '/refine/promotion/deposit-bonuses/create',
        edit: '/refine/promotion/deposit-bonuses/edit/:id',
        delete: '/refine/promotion/deposit-bonuses/delete/:id',
        meta: {
            parent: 'promotion',
            label: 'Deposit Bonus 存款紅利',
        },
    },
    {
        name: 'discounts',
        identifier: 'discounts',
        list: '/refine/promotion/discounts',
        create: '/refine/promotion/discounts/create',
        edit: '/refine/promotion/discounts/edit/:id',
        delete: '/refine/promotion/discounts/delete/:id',
        meta: {
            parent: 'promotion',
            label: 'Turnover Bonus 返水設定',
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
    {
        name: 'site-setting',
        identifier: 'site-setting',
        list: '/refine/system-setting/site-setting',
        edit: '/refine/system-setting/site-setting/edit/',
        meta: {
            parent: 'system-setting',
            label: 'Settings 設定',
        },
    },
];
