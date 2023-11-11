import React from 'react';
import { TPeriod } from '@/types';
import dayjs from 'dayjs';

const index: React.FC<{ period: TPeriod }> = ({ period }) => {
    const start_datetime = period?.start_datetime;
    const end_datetime = period?.end_datetime;
    const start = start_datetime ? dayjs(start_datetime).format('YYYY-MM-DD HH:mm:ss') : '';
    const end = end_datetime ? dayjs(end_datetime).format('YYYY-MM-DD HH:mm:ss') : '';
    if (!start && !end) return <>-</>;

    return (
        <div className="text-xs">
            {start} ~ {end}
        </div>
    );
};

export default index;
