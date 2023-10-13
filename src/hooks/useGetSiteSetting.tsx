import { API_URL } from '@/utils';
import { useAtomValue } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { axiosInstance } from '@/providers/strapi-v4';
import { AxiosResponse } from 'axios';
import { TRole } from '@/types';

type TSiteSetting = {
    data: {
        id: number;
        attributes: {
            vip_upgrade_mode: string;
            company_info: {
                [key: string]: any;
            };
            createdAt: string;
            updatedAt: string;
            default_currency: string;
            support_currencies: string[];
            default_amount_type: string;
            support_amount_types: string[];
            support_payments: string[] | null;
            support_game_providers: string[] | null;
        };
    };
};
type TRoles = {
    roles: TRole[];
};

const [siteSettingAtom] = atomsWithQuery(() => ({
    queryKey: ['get-siteSetting'],
    queryFn: async () => {
        const res: AxiosResponse<TSiteSetting> = await axiosInstance.get(`${API_URL}/api/site-setting`);
        return res;
    },
    staleTime: 1000 * 60 * 60 * 24 * 7,
}));

const [rolesAtom] = atomsWithQuery(() => ({
    queryKey: ['get-roles'],
    queryFn: async () => {
        const res: AxiosResponse<TRoles> = await axiosInstance.get(`${API_URL}/api/users-permissions/roles`);
        return res;
    },
    staleTime: 1000 * 60 * 60 * 24 * 7,
}));

export const useGetSiteSetting = () => {
    const siteSettingData = useAtomValue(siteSettingAtom);
    const rolesData = useAtomValue(rolesAtom);

    const siteSetting = siteSettingData?.data?.data?.attributes;
    const default_currency = siteSetting?.default_currency || 'KRW';
    const support_currencies = siteSetting?.support_currencies || ['KRW'];
    const default_amount_type = siteSetting?.default_amount_type || 'CASH';
    const support_amount_types = siteSetting?.support_amount_types || ['CASH'];
    const support_game_providers = siteSetting?.support_game_providers || [];
    const rolesArr = rolesData?.data?.roles;
    const roleObj = rolesArr?.reduce(
        (acc, role) => {
            acc[role.type] = role.id;
            return acc;
        },
        {} as {
            [key: string]: number;
        },
    );

    return {
        ...siteSetting,
        default_currency,
        support_currencies,
        default_amount_type,
        support_amount_types,
        support_game_providers,
        roles: roleObj,
    };
};
