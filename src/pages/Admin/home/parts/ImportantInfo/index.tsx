import React from 'react';
import { Typography } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import Table from './Table';

const { Title } = Typography;

const index = () => {
    return (
        <div>
            <Title level={5}>
                <InfoCircleFilled className="mr-2" />
                Important info
            </Title>
            <Table />
        </div>
    );
};

export default index;
