import { atom } from 'jotai';
import { Dayjs } from 'dayjs';

export type TSearchProps = {
    dateRange?: [Dayjs, Dayjs];
    txnId?: string;
    user_id?: string | number;
    gameProvider?: string;
    status?: string;
};

export const searchPropsAtom = atom<TSearchProps>({});
