import { Form, Button, DatePicker, FormProps, Select, Card } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import locale from 'antd/es/date-picker/locale/ko_KR';
import 'dayjs/locale/ko';

const { RangePicker } = DatePicker;

const types = ['DEPOSIT', 'WITHDRAW', 'MANUAL', 'COUPON', 'DEBIT', 'CREDIT', 'BET', 'CANCEL'];

const Filter: React.FC<{ formProps: FormProps; amount_type?: string }> = ({ formProps, amount_type }) => {
    const { t } = useTranslation();

    return (
        <Card bordered={false}>
            <Form {...formProps} layout="vertical">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-0">
                    <Form.Item label={t('date')} name={['dateRange']} initialValue={[dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')]}>
                        <RangePicker locale={locale} size="small" className="w-full" />
                    </Form.Item>

                    <Form.Item hidden={amount_type === 'TURNOVER_BONUS'} label={t('Type')} name={['type']}>
                        <Select
                            size="small"
                            options={types.map((item: string) => ({
                                label: item,
                                value: item,
                            }))}
                            allowClear
                            mode="multiple"
                        />
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
