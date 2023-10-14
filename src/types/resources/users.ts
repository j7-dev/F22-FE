import { BaseType, TRole, TVip, TBalance } from '@/types';

export const USER_NOTES_FIELDS = ['NOTE1', 'NOTE2', 'NOTE3', 'NOTE4', 'NOTE5', 'NOTE6'];

export type TUserNote = {
    [key: (typeof USER_NOTES_FIELDS)[number]]: string;
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
    user_notes?: TUserNote;
};
