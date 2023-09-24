import { Dayjs } from 'dayjs';
import { TTransaction } from '@/types';

export type DataType = TTransaction;

export type TSearchProps = {
    dateRange?: [Dayjs, Dayjs] | undefined;
    status?: string | undefined;
    user?: number | undefined;
};
