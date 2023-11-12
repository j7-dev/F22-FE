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
            label: 'Dashboard',
            icon: <LineChartOutlined />,
        },
    },
    {
        name: 'daily-statistic',
        identifier: 'daily-statistic',
        list: '/refine/dashboard/daily-statistic',
        meta: {
            parent: 'dashboard',
            label: 'Daily Statistic',
        },
    },
    {
        name: 'agent-daily-statistic',
        identifier: 'agent-daily-statistic',
        list: '/refine/dashboard/agent-daily-statistic',
        meta: {
            parent: 'dashboard',
            label: 'Agent Daily Statistic',
        },
    },
    {
        name: 'members',
        meta: {
            label: 'Member Management',
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
            label: 'All Members',
        },
    },
    {
        name: 'agent',
        meta: {
            label: 'Agent Management',
            icon: <UserAddOutlined />,
        },
    },
    {
        name: 'users',
        identifier: 'agents-create',
        list: '/refine/agent/list',
        create: '/refine/agent/create',
        edit: '/refine/agent/edit/:id',
        delete: '/refine/agent/delete/:id',
        meta: {
            parent: 'agent',
            label: 'All Agents',
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
            label: 'Commission Settlement',
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
            label: 'Payments',
            icon: <TransactionOutlined />,
        },
    },
    {
        name: 'transaction-records',
        identifier: 'deposits-list',
        list: '/refine/payments/deposit/list',
        meta: {
            parent: 'payments',
            label: 'All Deposits',
        },
    },
    {
        name: 'transaction-records',
        identifier: 'withdraws-list',
        list: '/refine/payments/withdraw/list',
        meta: {
            parent: 'payments',
            label: 'All Withdraws',
        },
    },
    {
        name: 'betting-management',
        meta: {
            label: 'Betting Management',
            icon: <AuditOutlined />,
        },
    },
    {
        name: 'betting-records',
        identifier: 'betting-records',
        list: '/refine/betting-management/betting-records',
        meta: {
            parent: 'betting-management',
            label: 'All Betting Records',
        },
    },
    {
        name: 'promotion',
        meta: {
            label: 'Promotion',
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
            label: 'Deposit Bonus',
        },
    },
    {
        name: 'coupons',
        identifier: 'coupons',
        list: '/refine/promotion/coupons',
        create: '/refine/promotion/coupons/create',
        edit: '/refine/promotion/coupons/edit/:id',
        delete: '/refine/promotion/coupons/delete/:id',
        meta: {
            parent: 'promotion',
            label: 'Coupons',
        },
    },
    // {
    //     name: 'discounts',
    //     identifier: 'discounts',
    //     list: '/refine/promotion/discounts',
    //     create: '/refine/promotion/discounts/create',
    //     edit: '/refine/promotion/discounts/edit/:id',
    //     delete: '/refine/promotion/discounts/delete/:id',
    //     meta: {
    //         parent: 'promotion',
    //         label: 'Turnover Bonus 返水設定',
    //     },
    // },
    {
        name: 'system-setting',
        meta: {
            label: 'System Setting',
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
            label: 'VIP Upgrade Rule',
        },
    },
    // {
    //     name: 'site-setting',
    //     identifier: 'site-setting',
    //     list: '/refine/system-setting/site-setting',
    //     edit: '/refine/system-setting/site-setting/edit/',
    //     meta: {
    //         parent: 'system-setting',
    //         label: 'Settings',
    //     },
    // },
    {
        name: 'cms-posts',
        identifier: 'site-notifications',
        list: '/refine/system-setting/site-notifications',
        create: '/refine/system-setting/site-notifications/create',
        edit: '/refine/system-setting/site-notifications/edit/:id',
        delete: '/refine/system-setting/site-notifications/delete/:id',
        meta: {
            parent: 'system-setting',
            label: 'Site Notify',
        },
    },
];
