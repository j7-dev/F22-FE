import { BaseType, TRole, TVip, TBalance } from '@/types';

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
};
