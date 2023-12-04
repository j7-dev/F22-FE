import { Form, Button, DatePicker, FormProps, Card, Input } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { SearchOutlined } from '@ant-design/icons';

import locale from 'antd/es/date-picker/locale/ko_KR';
import 'dayjs/locale/ko';

const { RangePicker } = DatePicker;

const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
    const { t } = useTranslation();

    return (
        <Card bordered={false}>
            <Form {...formProps} layout="vertical">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-0">
                    <Form.Item label={t('date')} name={['dateRange']} initialValue={[dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')]}>
                        <RangePicker locale={locale} size="small" className="w-full" />
                    </Form.Item>

                    <Form.Item label={t('Account')} name={['username']}>
                        <Input size="small" allowClear placeholder="search username or leave blank" prefix={<SearchOutlined />} />
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
