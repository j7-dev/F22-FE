import { Form, Button, DatePicker, FormProps } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
    return (
        <Form {...formProps} layout="vertical">
            <Form.Item label="Register Date" name={['dateRange']} initialValue={[dayjs().subtract(7, 'day'), dayjs()]}>
                <RangePicker className="w-full" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                    Filter
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Filter;
