import React from 'react';
import dayjs from 'dayjs';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

export const DateTime: React.FC<{ value: string }> = ({ value }) => {
    return (
        <>
            <p className="m-0">
                <CalendarOutlined className="mr-2" />
                {dayjs(value).format('YYYY-MM-DD')}
            </p>
            <p className="m-0">
                <ClockCircleOutlined className="mr-2" />
                {dayjs(value).format('HH:mm:ss')}
            </p>
        </>
    );
};
