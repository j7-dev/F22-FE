import { atom } from 'jotai';
import { Dayjs } from 'dayjs';
import { ModalProps } from 'antd';

export type TSearchProps = {
    agent?: string;
    dateRange?: [Dayjs, Dayjs] | undefined;
};

export const searchPropsAtom = atom<TSearchProps>({ agent: undefined, dateRange: undefined });

export const modalPropsAtom = atom<ModalProps>({
    centered: true,
    width: 800,
    title: '',
    forceRender: true,
});

export const modalShowAtom = atom<boolean>(false);
