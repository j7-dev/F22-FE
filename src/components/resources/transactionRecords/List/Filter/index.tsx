import { useEffect } from 'react';
import { Form, Button, DatePicker, FormProps, Select } from 'antd';
import dayjs from 'dayjs';
import { useUserSelect } from '@/hooks';
import { useParams } from 'react-router-dom';
import { TTransactionType, transactionStatus, transactionTypes } from '@/types';
import { TParams } from '../types';

export const statusOptions = transactionStatus.map((s) => ({
    label: s,
    value: s,
}));

export const typeOptions = transactionTypes.map((s) => ({
    label: s,
    value: s,
}));

const { RangePicker } = DatePicker;
const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
    const { type: listTypeLowerCase } = useParams<TParams>();
    const listType = (listTypeLowerCase || '')?.toUpperCase() as TTransactionType & 'ALL';

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
            {listType === 'ALL' && (
                <Form.Item label="Type" name={['type']}>
                    <Select options={typeOptions} allowClear />
                </Form.Item>
            )}

            <Form.Item label="Status" name={['status']}>
                <Select options={statusOptions} allowClear />
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
