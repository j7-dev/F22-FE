import { atom } from 'jotai';
import { Dayjs } from 'dayjs';

export type TSearchProps = {
    agent?: string;
    dateRange?: [Dayjs, Dayjs] | undefined;
};

export const searchPropsAtom = atom<TSearchProps>({ agent: undefined, dateRange: undefined });
