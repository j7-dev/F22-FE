import { SearchOutlined } from '@ant-design/icons';
import { Form, Input, Button, DatePicker, FormProps, Card, Select } from 'antd';
import { useSelect } from '@refinedev/antd';
import { useUserSelect } from '@/hooks';
import BooleanRadioButton from '@/components/form/BooleanRadioButton';
import { useTranslation } from 'react-i18next';
import { useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';

const { RangePicker } = DatePicker;
const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
    const { data: identity } = useGetIdentity<TMe>();
    const role = identity?.role?.type || '';
    const defaultAgentId = role === 'agent' ? identity?.id : undefined;

    const { t } = useTranslation();
    const { selectProps: vipSelectProps } = useSelect({
        resource: 'vips',
        optionLabel: 'label',
        optionValue: 'id',
    });
    const { selectProps: agentSelectProps } = useUserSelect({
        roleType: 'agent',
    });

    return (
        <Card bordered={false}>
            <Form {...formProps} layout="vertical">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-0">
                    <Form.Item label={t('date')} name={['dateRange']}>
                        <RangePicker size="small" className="w-full" />
                    </Form.Item>
                    <Form.Item label={t('Account')} name={['username']}>
                        <Input size="small" allowClear placeholder="search username or leave blank" prefix={<SearchOutlined />} />
                    </Form.Item>
                    <Form.Item label={t('Phone')} name={['phone']}>
                        <Input size="small" allowClear placeholder="search user phone or leave blank" prefix={<SearchOutlined />} />
                    </Form.Item>
                    <Form.Item label={t('Real name')} name={['display_name']}>
                        <Input size="small" allowClear placeholder="search user real name or leave blank" prefix={<SearchOutlined />} />
                    </Form.Item>
                    <Form.Item label={t('VIP')} name={['vip']}>
                        <Select size="small" {...vipSelectProps} allowClear />
                    </Form.Item>
                    <Form.Item label={t('Agent')} name={['agent']} hidden={!!defaultAgentId}>
                        <Select size="small" {...agentSelectProps} allowClear />
                    </Form.Item>

                    {/* <BooleanRadioButton
                        formItemProps={{
                            initialValue: undefined,
                            label: 'blocked',
                            name: ['blocked'],
                        }}
                        radioGroupProps={{
                            size: 'small',
                        }}
                    /> */}
                    <BooleanRadioButton
                        formItemProps={{
                            initialValue: undefined,
                            label: t('Status'),
                            name: ['confirmed'],
                        }}
                        radioGroupProps={{
                            size: 'small',
                        }}
                    />
                    <Form.Item className="self-end">
                        <Button size="small" type="primary" htmlType="submit" className="w-full">
                            {t('Search')}
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Card>
    );
};

export default Filter;
