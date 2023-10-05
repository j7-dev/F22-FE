import { TGameProvider } from './';

export type TGameCategory = {
    label: string;
    value: string;
    path: string;
    providerData?: TGameProvider[];
};
