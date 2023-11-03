import { HttpError, useGetIdentity } from '@refinedev/core';
import { useTable } from '@refinedev/antd';
import { TMe } from '@/types';
/**
 * 使用useTable取得站內通知資料
 * @returns tableProps dataCount
 */
export const useGetNoteBox = () => {
    const { data: identity } = useGetIdentity<TMe>();
    const uuid = identity?.uuid;
    const { tableProps } = useTable<HttpError>({
        resource: 'cms-posts',
        meta: {
            populate: '*',
        },
        filters: {
            initial: [
                {
                    operator: 'or',
                    value: [
                        {
                            // 全站的，且沒隱藏
                            operator: 'and',
                            value: [
                                {
                                    field: 'post_type',
                                    operator: 'eq',
                                    value: 'siteNotify',
                                },
                                {
                                    field: 'send_to_user_ids',
                                    operator: 'null',
                                    value: true,
                                },
                                {
                                    field: 'hide_to_user_ids',
                                    operator: 'ncontains',
                                    value: uuid,
                                },
                            ],
                        },
                        {
                            // 給個人  但沒隱藏
                            operator: 'and',
                            value: [
                                {
                                    field: 'post_type',
                                    operator: 'eq',
                                    value: 'siteNotify',
                                },
                                {
                                    field: 'send_to_user_ids',
                                    operator: 'contains',
                                    value: uuid,
                                },
                                {
                                    field: 'hide_to_user_ids',
                                    operator: 'ncontains',
                                    value: uuid,
                                },
                            ],
                        },
                    ],
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
    console.log('🚀 ~ dataSource:', tableProps?.dataSource);
    return {
        tableProps,
        dataCount,
    };
};
