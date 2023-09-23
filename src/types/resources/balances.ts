import { BaseType } from '@/types';

export type TBalance = BaseType & {
    amount: number;
    currency: string;
};
