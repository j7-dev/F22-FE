export type TVip = {
    id: number;
    label: string;
    createdAt: string;
    updatedAt: string;
    order: number | null;
    upgrade_award: number | null;
    activated: boolean;
    deposit_upgrade_threshold: number | null;
    valid_bet_amount_upgrade_threshold: number | null;
    deposit_downgrade_threshold: number | null;
    valid_bet_amount_downgrade_threshold: number | null;
    upgrade_evaluation_interval: number | null;
    vip_duration: number | null;
};
