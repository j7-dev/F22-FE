import { API_URL } from '@/utils';
import { useAtomValue } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { axiosInstance } from '@/providers/strapi-v4';

const [siteSettingAtom] = atomsWithQuery(() => ({
    queryKey: ['siteSetting'],
    queryFn: async () => {
        const res = (await axiosInstance.get(`${API_URL}/api/site-setting`)) as any;
        return res;
    },
}));

const useGetSiteSetting = () => {
    const data = useAtomValue(siteSettingAtom);

    const siteSetting = data?.data?.data?.attributes;

    return siteSetting;
};

export default useGetSiteSetting;
