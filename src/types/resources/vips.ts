import { BaseType } from '@/types';

export type TVip = BaseType & {
    activated: boolean;
    currency: string;
    deposit_downgrade_threshold: number;
    deposit_upgrade_threshold: number;
    label: string;
    order: number;
    upgrade_award: number;
    upgrade_evaluation_interval: number;
    valid_bet_amount_downgrade_threshold: number;
    valid_bet_amount_upgrade_threshold: number;
    vip_duration: number;
};
