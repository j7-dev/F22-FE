import { Dayjs } from 'dayjs';
import { TTransaction, TTransactionType, TTransactionStatus, TRoleType } from '@/types';

export type DataType = TTransaction;

export type TSearchProps = {
    dateRange?: [Dayjs, Dayjs] | undefined;
    type?: TTransactionType | 'ALL' | undefined;
    status?: TTransactionStatus | undefined;
    user?: number | undefined;
};

export type TParams = {
    type: string;
    roleType: TRoleType | undefined;
};
