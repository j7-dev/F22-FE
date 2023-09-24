import { TUser, BaseType, AmountType } from '@/types';

export const transactionTypes = ['BET', 'DEPOSIT', 'WITHDRAW', 'MANUAL', 'COUPON'] as const;
export const transactionBy = ['SYSTEM', 'ADMIN', 'USER'] as const;
export const transactionStatus = ['SUCCESS', 'FAILED', 'CANCEL', 'PENDING', 'REJECTED'] as const;

type TTransactionType = (typeof transactionTypes)[number];
type TTransactionBy = (typeof transactionBy)[number];
type TTransactionStatus = (typeof transactionBy)[number];

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
    };

export type TTransactionFields = TTransaction & {
    description?: string;
    user: TUser;
    updated_by_user_id?: number;
    allowNegative?: boolean;
};
