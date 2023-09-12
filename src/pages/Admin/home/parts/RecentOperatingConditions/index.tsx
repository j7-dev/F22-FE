import React from 'react';
import { Typography, Tabs, TabsProps } from 'antd';
import { LineChartOutlined, TableOutlined, InfoCircleFilled } from '@ant-design/icons';
import Charts from './Charts';
import Table from './Table';

const { Title } = Typography;

// 最近 7 天資訊

const index = () => {
    const items: TabsProps['items'] = [
        {
            key: 'chart-presentation',
            label: (
                <span>
                    <LineChartOutlined className="mr-2" />
                    Chart presentation
                </span>
            ),
            children: <Charts />,
        },
        {
            key: 'report-presentation',
            label: (
                <span>
                    <TableOutlined className="mr-2" />
                    Report presentation
                </span>
            ),
            children: <Table />,
        },
    ];

    return (
        <div className="mb-32">
            <Title level={5}>
                <InfoCircleFilled className="mr-2" />
                Recent Operating Conditions
            </Title>
            <Tabs defaultActiveKey="2" items={items} />
        </div>
    );
};

export default index;
