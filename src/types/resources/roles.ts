import { BaseType } from '@/types';

export type TRoleType = 'admin' | 'top_agent' | 'agent' | 'authenticated' | 'public';

export type TRole = BaseType & {
    id: number;
    name: string;
    description: string | null;
    type: string;
    createdAt: string;
    updatedAt: string;
};
