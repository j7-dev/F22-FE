import { BaseType, TVip } from '@/types';

const depositType = ['NORMAL', 'FIRST', 'FIRST_BY_DATE'] as const;

type TDepositType = (typeof depositType)[number];

type TRatioItem = {
    type: TDepositType;
    gameProvider: string;
    live: number | null;
    slot: number | null;
};

export type TDepositBonus = BaseType & {
    vips: TVip[];
    label: string;
    deposit_type: TDepositType;
    bonus_rate: number;
    min_deposit_amount: number;
    max_bonus_amount: number;
    extra_ratio: TRatioItem[];
    amount_type: string;
    currency: string;
    rolling_percentage: number;
};
