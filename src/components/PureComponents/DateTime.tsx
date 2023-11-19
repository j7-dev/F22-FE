import React from 'react';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
// dayjs.extend(timezone);
const TIMEZONE = 'Asia/Seoul';

/**
 * NOTE 用 timezone 的方式在 Brave 等瀏覽器沒有作用
 * 怎麼嘗試都無法正常，只好用傳統的 +9 hours 的方式
 */

export const DateTime: React.FC<{ value: string }> = ({ value }) => {
    return value ? (
        <Tooltip title={`TimeZone: ${TIMEZONE}`}>
            <div className="flex flex-nowrap text-xs">{`${dayjs.utc(value).add(9, 'hours').format('YYYY/MM/DD')} ${dayjs.utc(value).add(9, 'hours').format('HH:mm:ss')}`}</div>
        </Tooltip>
    ) : (
        <></>
    );
};
