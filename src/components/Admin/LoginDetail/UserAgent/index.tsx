import React from 'react';
import { TUserAgent } from '@/types';
import { Tag } from 'antd';
import { WindowsFilled, IeOutlined, MobileFilled } from '@ant-design/icons';

const index: React.FC<{ user_agent: TUserAgent }> = ({ user_agent }) => {
    return (
        <div className="flex flex-col">
            <Tag color="blue" className="mb-1">
                <WindowsFilled className="mr-2" />
                {user_agent?.os?.name || 'unknown'}
            </Tag>
            <Tag color="purple" className="mb-1">
                <IeOutlined className="mr-2" />
                {user_agent?.client?.name || 'unknown'}
            </Tag>
            <Tag color="cyan" className="mb-1">
                <MobileFilled className="mr-2" />
                {user_agent?.device?.brand && user_agent?.device?.model ? `${user_agent?.device?.brand} ${user_agent?.device?.model}` : 'unknown'}
            </Tag>
        </div>
    );
};

export default index;
