import { atom } from 'jotai';
import { DataType } from './types';

type TListType = 'DEPOSIT' | 'WITHDRAW';
export const listTypeAtom = atom<TListType>('DEPOSIT');
export const selectedRecordsAtom = atom<DataType[]>([]);
