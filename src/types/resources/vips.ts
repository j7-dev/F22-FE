import { BaseType, AmountType, TDiscount } from '@/types';

export type TVip = BaseType &
    Omit<AmountType, 'amount'> & {
        activated: boolean;
        deposit_downgrade_threshold: number;
        deposit_upgrade_threshold: number;
        label: string;
        order: number;
        upgrade_award: number;
        upgrade_evaluation_interval: number;
        valid_bet_amount_downgrade_threshold: number;
        valid_bet_amount_upgrade_threshold: number;
        vip_duration: number;
        discount?: TDiscount;
        level_order?: number;
    };
