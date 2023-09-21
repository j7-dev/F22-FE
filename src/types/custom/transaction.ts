import { TUser } from '@/types';

export type TTransction = {
    id: number;
    type: 'BET' | 'DEPOSIT' | 'WITHDRAW' | 'MANUAL' | 'COUPON';
    by: 'SYSTEM' | 'ADMIN' | 'USER';
    title: string | null;
    description: string | null;
    amount: number;
    status: 'SUCCESS' | 'FAILED' | 'CANCEL' | 'PENDING' | 'REJECTED';
    createdAt: string;
    updatedAt: string;
    currency: string;
    user?: TUser;
};
