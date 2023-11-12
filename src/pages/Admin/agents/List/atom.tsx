import { Dayjs } from 'dayjs';

export type TSearchProps = {
    dateRange?: [Dayjs, Dayjs] | undefined;
    id?: string | number;
    username?: string;
    display_name?: string;
    confirmed?: boolean;
};
