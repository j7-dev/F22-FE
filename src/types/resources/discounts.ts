import { BaseType, TVip } from '@/types';

export type TDiscount = BaseType & {
    vips: TVip[];
    valid_bet_amount_threshold: number;
    discount_limit: number;
    amount_type: string;
    currency: string;
    ratio: any;
};
