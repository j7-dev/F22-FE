import { TUser, BaseType, AmountType } from '@/types';

export const transactionTypes = ['DEPOSIT', 'WITHDRAW', 'MANUAL', 'COUPON', 'DEBIT', 'CREDIT'] as const;
export const transactionBy = ['SYSTEM', 'ADMIN', 'USER'] as const;
export const transactionStatus = ['SUCCESS', 'FAILED', 'CANCEL', 'PENDING', 'REJECTED'] as const;

export type TTransactionType = (typeof transactionTypes)[number];
export type TTransactionBy = (typeof transactionBy)[number];
export type TTransactionStatus = (typeof transactionStatus)[number];

export type TTransaction = BaseType &
    AmountType & {
        type: TTransactionType;
        by: TTransactionBy;
        title: string | null;
        description: string | null;
        status: TTransactionStatus;
        user?: TUser;
        updated_by_user_id?: number;
        bet_record?: any;
        balance_after_mutate?: number | null;
    };

export type TTransactionFields = TTransaction & {
    description?: string;
    user: TUser;
    updated_by_user_id?: number;
    allowNegative?: boolean;
};
