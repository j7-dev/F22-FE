import { SearchOutlined } from '@ant-design/icons';
import { Form, Input, Button, DatePicker } from 'antd';
import { searchPropsAtom, TSearchProps } from './atom';
import { useSetAtom } from 'jotai';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const Filter: React.FC = () => {
    // TODO 優化  搜尋 agent
    const [form] = Form.useForm<TSearchProps>();
    const setSearchProps = useSetAtom(searchPropsAtom);

    const handleFinish = () => {
        const values = form.getFieldsValue();
        setSearchProps(values);
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
                label="Register Date"
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
            <Form.Item label="Member Account" name={['users']}>
                <Input placeholder="search user ID or leave blank" prefix={<SearchOutlined />} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" className="w-full" onClick={handleFinish}>
                    Filter
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Filter;
