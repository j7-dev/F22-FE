import { TUser, BaseType } from '@/types';

export type TBetRecord = BaseType & {
    id: 6;
    status: 'NORMAL' | 'PENDING' | 'CANCEL';
    createdAt: '2023-11-12T11:36:38.662Z';
    updatedAt: '2023-11-12T11:37:23.585Z';
    by: string;
    title: string;
    description: string | null;
    debit_amount: number | null;
    credit_amount: number | null;
    ref_id: string;
    bet_time: string | null;
    update_time: string | null;
    user: TUser;
};
