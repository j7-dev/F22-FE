export * from './users';
export * from './transactionRecords';
export * from './roles';
export * from './commissions';
export * from './vips';
export * from './balances';
export * from './SiteNotify';
export * from './loginDetails';
export * from './faq';
export * from './depositBonuses';
export * from './betRecords';
export * from './coupons';

export type BaseType = {
    id: number;
    createdAt: string;
    updatedAt: string;
};

export type AmountType = {
    amount: number;
    currency: string;
    amount_type: string;
};

export type TMeta = {
    meta_key: string;
    meta_value: string;
};

export type TPeriod = {
    id: number;
    start_datetime: string; // 2023-11-22T16:00:00.000Z
    end_datetime: string;
};
