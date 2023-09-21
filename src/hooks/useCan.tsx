import { useGetIdentity } from '@refinedev/core';

type TRoleType = 'admin' | 'agent' | 'authenticated' | 'public';

const useCan = () => {
    const { data: identity } = useGetIdentity<any>();
    const role: TRoleType = identity?.role?.type;

    switch (role) {
        case 'admin':
            return {
                canDelete: true,
                canEdit: true,
            };
        case 'agent':
            return {
                canDelete: true,
                canEdit: true,
            };
        case 'authenticated':
            return {
                canDelete: true,
                canEdit: true,
            };

        default:
            return {
                canDelete: false,
                canEdit: false,
            };
    }
};

export default useCan;
