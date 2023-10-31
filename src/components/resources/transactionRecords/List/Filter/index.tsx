import { useEffect } from 'react';
import { Form, Button, DatePicker, FormProps, Select, Card } from 'antd';
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
        <Card bordered={false}>
            <Form {...formProps} layout="vertical">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-0">
                    <Form.Item label="Date" name={['dateRange']} initialValue={[dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')]}>
                        <RangePicker size="small" className="w-full" />
                    </Form.Item>
                    {listType === 'ALL' && (
                        <Form.Item label="Type" name={['type']}>
                            <Select size="small" options={typeOptions} allowClear />
                        </Form.Item>
                    )}

                    <Form.Item label="Status" name={['status']}>
                        <Select size="small" options={statusOptions} allowClear />
                    </Form.Item>
                    <Form.Item label="User" name={['user']}>
                        <Select size="small" {...selectProps} allowClear />
                    </Form.Item>
                    <Form.Item className="self-end">
                        <Button size="small" type="primary" htmlType="submit" className="w-full">
                            Filter
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Card>
    );
};

export default Filter;
