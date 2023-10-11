import { BaseType, TVip } from '@/types';

type TRatioItem = {
    gameProvider: string;
    live: number | null;
    slot: number | null;
};

export type TDiscount = BaseType & {
    vips: TVip[];
    valid_bet_amount_threshold: number;
    discount_limit: number;
    amount_type: string;
    currency: string;
    ratio: TRatioItem[];
};
