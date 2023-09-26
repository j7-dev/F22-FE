import { useCustom, useApiUrl } from '@refinedev/core';
import dayjs from 'dayjs';
import { iso8601Format } from '@/utils';

const useDashboard = () => {
    const apiUrl = useApiUrl();
    const start = dayjs().subtract(7, 'day').startOf('day').format(iso8601Format);
    const end = dayjs().endOf('day').format(iso8601Format);
    const result = useCustom({
        url: `${apiUrl}/utility/dashboard/home`,
        method: 'get',
        config: {
            query: {
                start,
                end,
            },
        },
        queryOptions: {
            retry: 0,
            staleTime: 1000 * 60 * 5,
        },
    });

    return result;
};

export default useDashboard;
