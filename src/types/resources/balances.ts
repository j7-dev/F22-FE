import { BaseType, AmountType, TUser } from '@/types';

export type TBalance = BaseType &
    Omit<AmountType, 'amount'> & {
        user?: TUser;
        amount: string | number;
    };
