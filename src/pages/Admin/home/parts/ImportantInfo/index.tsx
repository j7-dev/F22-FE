import React from 'react';
import { Typography } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';

const { Title } = Typography;

const index = () => {
    return (
        <div>
            <Title level={5}>
                <InfoCircleFilled className="mr-2" />
                Important info
            </Title>
        </div>
    );
};

export default index;
