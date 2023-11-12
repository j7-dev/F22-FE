import { SearchOutlined } from '@ant-design/icons';
import { Form, Input, Button, DatePicker, FormProps, Card } from 'antd';
import BooleanRadioButton from '@/components/form/BooleanRadioButton';
import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;
const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
    const { t } = useTranslation();

    return (
        <Card bordered={false}>
            <Form {...formProps} layout="vertical">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-0">
                    <Form.Item label={t('Register Date')} name={['dateRange']}>
                        <RangePicker size="small" className="w-full" />
                    </Form.Item>
                    <Form.Item label={t('Account')} name={['username']}>
                        <Input size="small" allowClear placeholder="search username or leave blank" prefix={<SearchOutlined />} />
                    </Form.Item>

                    <Form.Item label={t('Real name')} name={['display_name']}>
                        <Input size="small" allowClear placeholder="search user real name or leave blank" prefix={<SearchOutlined />} />
                    </Form.Item>

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
