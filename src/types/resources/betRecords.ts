export type TBetRecord = {
    uuid: string;
    status: string;
    game_provider: string;
    createdAt: string;
    updatedAt: string;
    currency: string;
    amount_type: string;
    amount: number;
    winloss: number;
    game_provider_transaction_id: string;
    transaction_ref_id: string; // 一樣則為同一局
    user_id: number | null;
};
