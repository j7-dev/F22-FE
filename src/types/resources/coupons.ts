import { BaseType, TPeriod, TUser } from '@/types';

export type TCoupon = BaseType & {
    title: string;
    description: string | null;
    coupon_type: string;
    currency: string;
    amount_type: string;
    coupon_amount: number;
    is_claimed: boolean;
    allow_game_categories: string[];
    user: TUser;
    period: TPeriod;
};
