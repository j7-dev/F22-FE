import { atom } from 'jotai';
import dayjs, { Dayjs } from 'dayjs';

export type TSearchProps = {
    agent?: number;
    dateRange?: [Dayjs, Dayjs] | undefined;
};

export const searchPropsAtom = atom<TSearchProps>({ agent: undefined, dateRange: [dayjs().startOf('week'), dayjs().endOf('week')] });
