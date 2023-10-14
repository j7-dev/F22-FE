import { BaseType, TRole, TVip, TBalance } from '@/types';

export const USER_NOTES_FIELDS = ['NOTE1', 'NOTE2', 'NOTE3', 'NOTE4', 'NOTE5', 'NOTE6'];

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
    favorite_games?: any | null;
    user_notes?: TUserNote;
    bank_account?: TBankAccount;
};

export const BANK_ACCOUNT_FIELDS = ['bank_name', 'bank_code', 'bank_account_number', 'owner_real_name'] as const;

type BankAccountField = (typeof BANK_ACCOUNT_FIELDS)[number];

export type TBankAccount = {
    [key in BankAccountField]: string;
};
