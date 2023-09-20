export type TUser = {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: false;
    createdAt: string;
    updatedAt: string;
    display_name: string | null;
    phone: string | null;
    gender: string | null;
    birthday: string | null;
    role: TRole;
    vip?: TVip;
    balances?: TBalance[];
};

export type TVip = {
    activated: boolean;
    createdAt: string;
    currency: string;
    deposit_downgrade_threshold: number;
    deposit_upgrade_threshold: number;
    id: number;
    label: string;
    order: number;
    updatedAt: string;
    upgrade_award: number;
    upgrade_evaluation_interval: number;
    valid_bet_amount_downgrade_threshold: number;
    valid_bet_amount_upgrade_threshold: number;
    vip_duration: number;
};
export type TBalance = {
    amount: number;
    createdAt: string;
    currency: string;
    id: number;
    updatedAt: string;
};
export type TRole = {
    id: number;
    name: string;
    description: string | null;
    type: string;
    createdAt: string;
    updatedAt: string;
};
