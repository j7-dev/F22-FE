import { TUser, BaseType } from '@/types';

export type TTransction = BaseType & {
    type: 'BET' | 'DEPOSIT' | 'WITHDRAW' | 'MANUAL' | 'COUPON';
    by: 'SYSTEM' | 'ADMIN' | 'USER';
    title: string | null;
    description: string | null;
    amount: number;
    status: 'SUCCESS' | 'FAILED' | 'CANCEL' | 'PENDING' | 'REJECTED';
    currency: string;
    user?: TUser;
    updated_by_user_id?: number;
};
