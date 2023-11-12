import { TUser, TBalance, TVip } from '@/types';
import { Dayjs } from 'dayjs';

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

export type TSearchProps = {
    dateRange?: [Dayjs, Dayjs] | undefined;
    id?: string | undefined;
    username?: string | undefined;
    phone?: string | undefined;
    display_name?: string | undefined;
    vip?: string | undefined;
    agent?: string | undefined;
    top_agent?: string | undefined;
    blocked?: boolean | undefined;
    confirmed?: boolean | undefined;
    [key: string]: any;
};
