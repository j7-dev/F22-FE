import { Form, DatePicker, Tag } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;

const index = () => {
    const { t } = useTranslation();
    const form = Form.useFormInstance();

    const handleThisWeek = () => {
        form.setFieldsValue({
            dateRange: [dayjs().startOf('week'), dayjs().endOf('week')],
        });
    };

    const handleThisMonth = () => {
        form.setFieldsValue({
            dateRange: [dayjs().startOf('month'), dayjs().endOf('month')],
        });
    };

    const handleLastMonth = () => {
        form.setFieldsValue({
            dateRange: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
        });
    };

    return (
        <div className="relative">
            <Form.Item
                label={t('Date')}
                name={['dateRange']}
                rules={[
                    {
                        required: true,
                        message: t('date is required'),
                    },
                ]}
                initialValue={[dayjs().startOf('week'), dayjs().endOf('week')]}
            >
                <RangePicker size="small" className="w-full" />
            </Form.Item>
            <div className="flex absolute -top-100 left-0">
                <Tag className="cursor-pointer" color="purple" onClick={handleThisWeek}>
                    {t('this week')}
                </Tag>
                <Tag className="cursor-pointer" color="purple" onClick={handleThisMonth}>
                    {t('this month')}
                </Tag>
                <Tag className="cursor-pointer" color="purple" onClick={handleLastMonth}>
                    {t('last month')}
                </Tag>
            </div>
        </div>
    );
};

export default index;
