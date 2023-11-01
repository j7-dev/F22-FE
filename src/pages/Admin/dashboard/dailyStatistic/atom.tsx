import { atom } from 'jotai';
import dayjs, { Dayjs } from 'dayjs';

export type TSearchProps = {
    agent?: string;
    dateRange?: [Dayjs, Dayjs] | undefined;
};

export const searchPropsAtom = atom<TSearchProps>({ dateRange: [dayjs().startOf('month'), dayjs().endOf('month')] });
