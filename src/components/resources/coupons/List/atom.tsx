import { atom } from 'jotai';
import { DataType } from './types';

export const selectedRecordsAtom = atom<DataType[]>([]);
