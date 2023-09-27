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

const useGetSiteSetting = () => {
    const siteSettingData = useAtomValue(siteSettingAtom);
    const rolesData = useAtomValue(rolesAtom);

    const siteSetting = siteSettingData?.data?.data?.attributes;
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
        roles: roleObj,
    };
};

export default useGetSiteSetting;
