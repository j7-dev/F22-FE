import { useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';
/**
 *
 * @returns true:已登入 false:未登入
 */
export const useIsLogin = () => {
    const { data: user } = useGetIdentity<TMe>();
    if (user) return true;
    return false;
};
