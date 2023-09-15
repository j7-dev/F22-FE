import { Line, LineConfig } from '@ant-design/plots';
import { Tag } from 'antd';

type TLineData = {
    date: string;
    value: number;
};

const LineChart: React.FC<{
    data: TLineData[];
    title: string;
    titleColor: string;
    yAxis: string;
}> = ({ data, title, titleColor, yAxis }) => {
    const config: LineConfig = {
        data,
        padding: 'auto',
        xField: 'date',
        yField: 'value',
        xAxis: {
            // type: 'timeCat',
            tickCount: 5,
        },
        yAxis: {
            title: {
                text: yAxis,
            },
        },
        smooth: true,
    };

    return (
        <>
            <Tag color={titleColor} className="mb-8">
                {title}
            </Tag>
            <Line {...config} />
        </>
    );
};

export default LineChart;
