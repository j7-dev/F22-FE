import { useGetSiteSetting } from '@/hooks';
import { TUser } from '@/types';
import { useSelect } from '@refinedev/antd';
import { CrudFilter } from '@refinedev/core';

const getFilters = (roles: { [key: string]: number }, roleType?: string | string[]) => {
    if (!roleType) return undefined;

    if (Array.isArray(roleType)) {
        return [
            {
                operator: 'or',
                value: roleType.map((role) => ({
                    field: 'role.id',
                    operator: 'eq',
                    value: roles?.[role],
                })),
            },
        ];
    }

    return [
        {
            field: 'role.id',
            operator: 'eq',
            value: roles?.[roleType],
        },
    ];
};

export const useUserSelect = ({ roleType }: { roleType?: string | string[] }) => {
    const siteSetting = useGetSiteSetting();
    const roles = siteSetting?.roles || {};

    const filters = getFilters(roles, roleType) as CrudFilter[];

    const result = useSelect<TUser>({
        resource: 'users',
        optionLabel: 'username',
        filters,
    });

    return result;
};
