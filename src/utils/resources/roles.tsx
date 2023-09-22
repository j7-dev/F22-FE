import { TRoleType } from '@/types';

export const getRoleId = (roleType: TRoleType) => {
    switch (roleType) {
        case 'authenticated':
            return 1;
        case 'public':
            return 2;
        case 'agent':
            return 3;
        case 'admin':
            return 4;
        default:
            return 1;
    }
};
