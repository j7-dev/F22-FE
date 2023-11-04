import { HttpError, useGetIdentity } from '@refinedev/core';
import { useTable } from '@refinedev/antd';
import { TMe } from '@/types';
/**
 * 使用useTable取得站內通知資料
 * @returns tableProps dataCount
 * TODO 這邊缺少page的設定，目前是一次拿全部資料（參考CashHistory設定）
 * 先不處理，等到要做分頁時再處理
 */
export const useGetNoteBox = () => {
    const { data: identity } = useGetIdentity<TMe>();
    // const uuid = identity?.uuid;
    const { tableProps } = useTable<HttpError>({
        resource: 'cms-posts',
        meta: {
            populate: '*',
        },
        filters: {
            initial: [
                {
                    field: 'post_type',
                    operator: 'eq',
                    value: 'siteNotify',
                },
            ],
        },
        sorters: {
            initial: [
                {
                    field: 'publishedAt',
                    order: 'desc',
                },
            ],
        },
        queryOptions: {
            enabled: !!identity?.id,
        },
    });

    const dataCount = tableProps?.dataSource?.length || 0;
    // console.log('🚀 ~ dataSource:', tableProps?.dataSource);
    return {
        tableProps,
        dataCount,
    };
};
