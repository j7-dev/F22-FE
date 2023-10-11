export type TBetRecord = {
    uuid: string;
    status: string;
    game_provider: string;
    createdAt: string;
    updatedAt: string;
    currency: string;
    amount_type: string;
    stake: number;
    actual_stake: number;
    winloss: number;
    game_provider_transaction_id: string;
    user_id: number | null;
};
