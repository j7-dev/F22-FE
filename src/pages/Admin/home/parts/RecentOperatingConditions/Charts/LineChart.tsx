import { Line, LineConfig } from '@ant-design/plots';
import { Tag } from 'antd';
import { TLineData } from '../types';
import { useTranslation } from 'react-i18next';

const LineChart: React.FC<{
    data: TLineData[];
    title: string;
    titleColor: string;
    yAxis: string;
    isLoading: boolean;
}> = ({ data, title, titleColor, yAxis, isLoading }) => {
    const { t } = useTranslation();
    const config: LineConfig = {
        data: data,
        padding: 'auto',
        xField: 'date',
        yField: 'value',
        xAxis: {
            // type: 'timeCat',
            tickCount: 7,
        },
        yAxis: {
            title: {
                text: yAxis,
            },
        },
        smooth: false,
    };

    return (
        <div>
            <Tag color={titleColor} className="mb-8">
                {t(title)}
            </Tag>
            <div className="h-[200px] w-full relative">
                <Line {...config} loading={isLoading} />
            </div>
        </div>
    );
};

export default LineChart;
