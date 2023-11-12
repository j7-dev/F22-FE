import React from 'react';
import dayjs from 'dayjs';

export const DateTime: React.FC<{ value: string }> = ({ value }) => {
    return value ? <div className="flex flex-nowrap text-xs">{`${dayjs(value).format('YYYY/MM/DD')} ${dayjs(value).format('HH:mm:ss')}`}</div> : <></>;
};
