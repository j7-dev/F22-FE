import { TDiscount } from '@/types';
import ObjectTable, { TColumn } from '@/components/general/ObjectTable';
import { Empty } from 'antd';

const columns: TColumn[] = [
    {
        key: 'gameProvider',
        title: 'Game Provider',
        dataIndex: 'gameProvider',
    },
    {
        key: 'live',
        title: 'live',
        dataIndex: 'live',
        render: (v: number | null) => `${v}%`,
    },
    {
        key: 'slot',
        title: 'slot',
        dataIndex: 'slot',
        render: (v: number | null) => `${v}%`,
    },
];

const index = (props: { discount: TDiscount }) => {
    const ratio = props?.discount?.ratio || [];
    if (ratio.length === 0) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

    return (
        <div className="grid grid-cols-2 gap-6">
            {ratio.map((item) => {
                return <ObjectTable key={item.gameProvider} record={item} columns={columns} />;
            })}
        </div>
    );
};

export default index;
