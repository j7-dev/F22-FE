import { useGetSiteSetting } from '@/hooks';
import { TUser } from '@/types';
import { useSelect } from '@refinedev/antd';

export const useUserSelect = ({ roleType }: { roleType?: string }) => {
    const siteSetting = useGetSiteSetting();
    const roles = siteSetting?.roles || {};

    const result = useSelect<TUser>({
        resource: 'users',
        optionLabel: 'display_name',
        filters: roleType
            ? [
                  {
                      field: 'role.id',
                      operator: 'eq',
                      value: roles?.[roleType],
                  },
              ]
            : undefined,
    });

    return result;
};
