import { SearchOutlined } from '@ant-design/icons';
import { Form, Input, Button, DatePicker, FormProps, Collapse, Select } from 'antd';
import dayjs from 'dayjs';
import { useSelect } from '@refinedev/antd';
import { useUserSelect } from '@/hooks';
import BooleanRadioButton from '@/components/form/BooleanRadioButton';

const { RangePicker } = DatePicker;
const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
    const { selectProps: vipSelectProps } = useSelect({
        resource: 'vips',
        optionLabel: 'label',
        optionValue: 'id',
    });
    const { selectProps: agentSelectProps } = useUserSelect({
        roleType: 'agent',
    });

    const { selectProps: topAgentSelectProps } = useUserSelect({
        roleType: 'top_agent',
    });

    const children = (
        <Form {...formProps} layout="vertical">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Form.Item label="Register Date" name={['dateRange']} initialValue={[dayjs().subtract(7, 'day'), dayjs()]}>
                    <RangePicker className="w-full" />
                </Form.Item>
                <Form.Item label="User Id" name={['id']}>
                    <Input allowClear placeholder="search user Id or leave blank" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item label="User name" name={['username']}>
                    <Input allowClear placeholder="search username or leave blank" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item label="phone" name={['phone']}>
                    <Input allowClear placeholder="search user phone or leave blank" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item label="display name" name={['display_name']}>
                    <Input allowClear placeholder="search user display name or leave blank" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item label="VIP" name={['vip']}>
                    <Select {...vipSelectProps} allowClear />
                </Form.Item>
                <Form.Item label="agent" name={['agent']}>
                    <Select {...agentSelectProps} allowClear />
                </Form.Item>
                <Form.Item label="top agent" name={['top_agent']}>
                    <Select {...topAgentSelectProps} allowClear />
                </Form.Item>
                <BooleanRadioButton
                    formItemProps={{
                        initialValue: undefined,
                        label: 'blocked',
                        name: ['blocked'],
                    }}
                />
                <BooleanRadioButton
                    formItemProps={{
                        initialValue: undefined,
                        label: 'confirmed',
                        name: ['confirmed'],
                    }}
                />
            </div>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                    Filter
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <Collapse
            bordered={false}
            className="bg-white"
            items={[
                {
                    key: 'filters',
                    label: <span className="font-semibold text-base relative -top-0.5">Filters</span>,
                    children,
                },
            ]}
        />
    );
};

export default Filter;
