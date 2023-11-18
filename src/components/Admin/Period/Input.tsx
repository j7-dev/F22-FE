import React from 'react';
import { DatePicker, Form, FormItemProps } from 'antd';
import { useTranslation } from 'react-i18next';
import locale from 'antd/es/date-picker/locale/ko_KR';
import 'dayjs/locale/ko';

const Input: React.FC<{ formItemProps?: FormItemProps }> = ({ formItemProps }) => {
    const { t } = useTranslation();
    return (
        <div>
            <Form.Item name={['period', 'start_datetime']} label={t('Start')} {...formItemProps}>
                <DatePicker locale={locale} size="small" className="w-full" showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item name={['period', 'end_datetime']} label={t('End')} {...formItemProps}>
                <DatePicker locale={locale} size="small" className="w-full" showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
            </Form.Item>
        </div>
    );
};

export default Input;
