import { TUser, TBalance, TVip } from '@/types';

export type DataType = {
    id: number;
    riskManagement: any; //TODO
    username: string;
    display_name: string;
    agent: TUser | null;
    top_agent: TUser | null;
    birthday: string;
    balances: TBalance[];
    phone: string;
    vip: TVip | null;
    blocked: boolean;
    anyTimeDiscount: any; //TODO
    totalDeposits: number;
    totalWithdraw: number;
    dpWd: number;
    createdAt: string;
    lastBetTime: string;
};
