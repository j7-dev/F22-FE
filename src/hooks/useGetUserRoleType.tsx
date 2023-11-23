import { TMe, TRoleType } from '@/types';
import { useGetIdentity } from '@refinedev/core';

export const useGetUserRoleType = (_id?: number): TRoleType => {
    const { data: user } = useGetIdentity<TMe>();
    const roleType = (user?.role?.type || 'authenticated') as TRoleType;

    return roleType;
};
