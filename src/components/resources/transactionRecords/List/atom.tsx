import { atom } from 'jotai';
import { DataType, TListType } from './types';

export const listTypeAtom = atom<TListType>('DEPOSIT');
export const selectedRecordsAtom = atom<DataType[]>([]);
