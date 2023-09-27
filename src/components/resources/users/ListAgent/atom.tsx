import { Dayjs } from 'dayjs';

export type TSearchProps = {
    agent?: string;
    dateRange?: [Dayjs, Dayjs] | undefined;
};
