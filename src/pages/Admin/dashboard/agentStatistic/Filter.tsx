import { SearchOutlined } from '@ant-design/icons';
import { Form, Input, Button, DatePicker } from 'antd';
import { searchPropsAtom, TSearchProps } from './atom';
import { useSetAtom } from 'jotai';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const Filter: React.FC = () => {
    // TODO 優化  搜尋 agent

    const setSearchProps = useSetAtom(searchPropsAtom);

    const handleFinish = (values: TSearchProps) => {
        setSearchProps(values);
    };

    return (
        <Form layout="vertical" onFinish={handleFinish}>
            <Form.Item
                label="Date"
                name={['dateRange']}
                rules={[
                    {
                        required: true,
                        message: 'date is required',
                    },
                ]}
                initialValue={[dayjs().subtract(7, 'day'), dayjs()]}
            >
                <RangePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Agent" name={['agent']}>
                <Input placeholder="search agent ID or leave blank" prefix={<SearchOutlined />} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary" className="w-full">
                    Filter
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Filter;
