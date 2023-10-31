import { BaseType, TRole, TVip, TBalance, TDepositBonus } from '@/types';

export const USER_NOTES_FIELDS = new Array(6).fill(0).map((_, i) => i);

export type TUserNote = {
    [key: (typeof USER_NOTES_FIELDS)[number]]: string;
};

export type TMe = TUser & {
    deposit: number;
    validBetAmount: number;
};

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
    role: TRole;
    vip?: TVip;
    balances?: TBalance[];
    angent?: TUser;
    top_agent?: TUser;
    allow_payments?: string[] | null;
    allow_game_providers?: string[] | null;
    favorite_games?: TFavoriteGames | null;
    user_notes?: TUserNote;
    bank_account?: TBankAccount;
    deposit_bonus?: TDepositBonus | null;
};

export const BANK_ACCOUNT_FIELDS = ['bank_name', 'bank_code', 'bank_account_number', 'owner_real_name'] as const;

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
