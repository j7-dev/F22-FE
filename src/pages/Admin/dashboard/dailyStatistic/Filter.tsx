import { Form, Button } from 'antd';
import { searchPropsAtom, TSearchProps } from './atom';
import { useSetAtom } from 'jotai';
import DateRangePicker from '@/components/Admin/DateRangePicker';

const Filter: React.FC = () => {
    const setSearchProps = useSetAtom(searchPropsAtom);

    const handleFinish = (values: TSearchProps) => {
        setSearchProps(values);
    };

    return (
        <Form layout="vertical" onFinish={handleFinish} className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-0">
                <DateRangePicker />
                <Form.Item className="self-end">
                    <Button size="small" htmlType="submit" type="primary" className="w-full">
                        Filter
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default Filter;
