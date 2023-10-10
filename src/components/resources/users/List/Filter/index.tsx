import { SearchOutlined } from '@ant-design/icons';
import { Form, Input, Button, DatePicker, FormProps, Collapse, Select } from 'antd';
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-0">
                <Form.Item label="Register Date" name={['dateRange']}>
                    <RangePicker size="small" className="w-full" />
                </Form.Item>
                <Form.Item label="User Id" name={['id']}>
                    <Input size="small" allowClear placeholder="search user Id or leave blank" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item label="User name" name={['username']}>
                    <Input size="small" allowClear placeholder="search username or leave blank" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item label="phone" name={['phone']}>
                    <Input size="small" allowClear placeholder="search user phone or leave blank" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item label="display name" name={['display_name']}>
                    <Input size="small" allowClear placeholder="search user display name or leave blank" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item label="VIP" name={['vip']}>
                    <Select size="small" {...vipSelectProps} allowClear />
                </Form.Item>
                <Form.Item label="agent" name={['agent']}>
                    <Select size="small" {...agentSelectProps} allowClear />
                </Form.Item>
                <Form.Item label="top agent" name={['top_agent']}>
                    <Select size="small" {...topAgentSelectProps} allowClear />
                </Form.Item>
                <BooleanRadioButton
                    formItemProps={{
                        initialValue: undefined,
                        label: 'blocked',
                        name: ['blocked'],
                    }}
                    radioGroupProps={{
                        size: 'small',
                    }}
                />
                <BooleanRadioButton
                    formItemProps={{
                        initialValue: undefined,
                        label: 'confirmed',
                        name: ['confirmed'],
                    }}
                    radioGroupProps={{
                        size: 'small',
                    }}
                />
            </div>
            <Form.Item>
                <Button size="small" type="primary" htmlType="submit" className="w-full">
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
