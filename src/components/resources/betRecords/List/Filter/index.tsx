import { Form, Button, DatePicker, Select, Card } from 'antd';
import dayjs from 'dayjs';
import { useUserSelect } from '@/hooks';
import { enabledAtom } from '../atom';
import { useSetAtom } from 'jotai';

const { RangePicker } = DatePicker;
const Filter = () => {
    const { selectProps } = useUserSelect({
        roleType: 'authenticated',
    });
    const form = Form.useFormInstance();
    const setEnabled = useSetAtom(enabledAtom);

    return (
        <Card bordered={false}>
            <Form form={form} layout="vertical">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-0">
                    <Form.Item label="Date" name={['dateRange']} initialValue={[dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')]}>
                        <RangePicker size="small" className="w-full" />
                    </Form.Item>
                    <Form.Item label="User" name={['user_id']}>
                        <Select size="small" {...selectProps} allowClear />
                    </Form.Item>
                    <Form.Item className="self-end">
                        <Button size="small" type="primary" className="w-full" onClick={() => setEnabled(true)}>
                            Filter
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Card>
    );
};

export default Filter;
