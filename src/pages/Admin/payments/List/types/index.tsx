import { Dayjs } from 'dayjs';
import { TTransction } from '@/types';

export type DataType = TTransction;

export type TSearchProps = {
    dateRange?: [Dayjs, Dayjs] | undefined;
    status?: string | undefined;
    user?: number | undefined;
};
