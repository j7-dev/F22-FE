import { BaseType, AmountType, TUser } from '@/types';

export type TBalance = BaseType &
    AmountType & {
        user?: TUser;
    };
