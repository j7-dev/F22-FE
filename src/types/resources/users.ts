import { BaseType, TRole, TVip, TBalance, TDepositBonus, TTransaction } from '@/types';

export const USER_NOTES_FIELDS = new Array(6).fill(0).map((_, i) => i);

export type TUserNote = {
    [key: (typeof USER_NOTES_FIELDS)[number]]: string;
};

export type TMe = TUser & {
    deposit: number;
    validBetAmount: number;
};

export const USER_STATUSES = ['UNCONFIRMED', 'ACTIVE', 'INACTIVE', 'OUT'] as const;

type TUSER_STATUSES = (typeof USER_STATUSES)[number];

export type TUser = BaseType & {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: false;
    display_name: string | null;
    phone: string | null;
    gender: string | null;
    birthday: string | null;
    uuid: string;
    role: TRole;
    vip?: TVip;
    balances?: TBalance[];
    agent?: TUser;
    referral?: TUser;
    allow_payments?: string[] | null;
    allow_game_providers?: string[] | null;
    favorite_games?: TFavoriteGames | null;
    user_notes?: TUserNote;
    bank_account?: TBankAccount;
    deposit_bonus?: TDepositBonus | null;
    last_deposit?: TTransaction | null;
    commission_rate?: number;
    is_test: boolean;
    user_status?: TUSER_STATUSES;
};

export const BANK_ACCOUNT_FIELDS = ['bank_name', 'bank_account_number', 'owner_real_name'] as const;

type BankAccountField = (typeof BANK_ACCOUNT_FIELDS)[number];

export type TBankAccount = {
    [key in BankAccountField]: string;
};

export type TFavoriteGames = {
    [key: string]: string[];
};

export type TRegisterPayload = {
    username: string;
    email: string;
    password: string;
    phone: string;
    bank_account: TBankAccount;
};
