import { Form, Button, DatePicker, FormProps, Select, Card } from 'antd';
import dayjs from 'dayjs';
import { useUserSelect } from '@/hooks';
import { useTranslation } from 'react-i18next';
import BooleanRadioButton from '@/components/form/BooleanRadioButton';

const { RangePicker } = DatePicker;
const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
    const { t } = useTranslation();

    const { selectProps } = useUserSelect({
        roleType: 'authenticated',
    });

    return (
        <Card bordered={false}>
            <Form {...formProps} layout="vertical">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-0">
                    <Form.Item label={t('Date')} name={['dateRange']} initialValue={[dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')]}>
                        <RangePicker size="small" className="w-full" />
                    </Form.Item>

                    <BooleanRadioButton
                        formItemProps={{
                            initialValue: undefined,
                            label: t('Is Claimed'),
                            name: ['is_claimed'],
                        }}
                        radioGroupProps={{
                            size: 'small',
                        }}
                    />
                    <Form.Item label={t('User')} name={['user']}>
                        <Select size="small" {...selectProps} allowClear />
                    </Form.Item>
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
