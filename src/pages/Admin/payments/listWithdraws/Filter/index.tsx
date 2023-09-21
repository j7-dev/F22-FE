import { Form, Button, DatePicker, FormProps, Select } from 'antd';
import dayjs from 'dayjs';
import { useSelect } from '@refinedev/antd';
import { TUser } from '@/types';
import { statusOptinos } from '@/pages/Admin/payments/listDeposits/Filter';

const { RangePicker } = DatePicker;
const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
    const { selectProps } = useSelect<TUser>({
        resource: 'users',
        optionLabel: 'display_name',
        filters: [
            {
                field: 'role.id',
                operator: 'eq',
                value: '1',
            },
        ],
    });
    return (
        <Form {...formProps} layout="vertical">
            <Form.Item label="Date" name={['dateRange']} initialValue={[dayjs().subtract(7, 'day'), dayjs()]}>
                <RangePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Status" name={['status']} initialValue="PENDING">
                <Select options={statusOptinos} allowClear />
            </Form.Item>
            <Form.Item label="User" name={['user']}>
                <Select {...selectProps} allowClear />
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
