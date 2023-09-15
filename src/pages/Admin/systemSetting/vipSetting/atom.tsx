import { atom } from 'jotai';
import { ModalProps } from 'antd';

export const modalPropsAtom = atom<ModalProps>({
    centered: true,
    width: 800,
    title: '',
    forceRender: true,
});

export const modalShowAtom = atom<boolean>(false);
