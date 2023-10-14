import { useList } from '@refinedev/core';

export const useVip = (vip_id: number) => {
    console.log('⭐  vip_id:', vip_id);
    const { data: vips } = useList({
        resource: 'vips',
        pagination: {
            pageSize: 20,
        },
    });
    console.log('⭐  vips:', vips);

    return {};
};
