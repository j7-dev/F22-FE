import { useEffect } from 'react';
import { Form, Button, DatePicker, FormProps, Select } from 'antd';
import dayjs from 'dayjs';
import { listTypeAtom } from '../atom';
import { useAtomValue } from 'jotai';
import { useUserSelect } from '@/hooks';

const status = ['SUCCESS', 'FAILED', 'CANCEL', 'PENDING', 'REJECTED'];

export const statusOptinos = status.map((s) => ({
    label: s,
    value: s,
}));

const { RangePicker } = DatePicker;
const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
    const listType = useAtomValue(listTypeAtom);
    const form = formProps.form;
    const { selectProps } = useUserSelect({
        roleType: 'authenticated',
    });

    useEffect(() => {
        form?.setFieldValue(['status'], listType === 'WITHDRAW' ? 'PENDING' : undefined);
        form?.submit();
    }, [listType]);

    return (
        <Form {...formProps} layout="vertical">
            <Form.Item label="Date" name={['dateRange']} initialValue={[dayjs().subtract(7, 'day'), dayjs()]}>
                <RangePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Status" name={['status']}>
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
