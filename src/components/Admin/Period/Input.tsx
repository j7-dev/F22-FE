import React from 'react';
import { DatePicker, Form, FormItemProps } from 'antd';
import { useTranslation } from 'react-i18next';

const Input: React.FC<{ formItemProps?: FormItemProps }> = ({ formItemProps }) => {
    const { t } = useTranslation();
    return (
        <div>
            <Form.Item name={['period', 'start_datetime']} label={t('start')} {...formItemProps}>
                <DatePicker size="small" className="w-full" showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item name={['period', 'end_datetime']} label={t('end')} {...formItemProps}>
                <DatePicker size="small" className="w-full" showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
            </Form.Item>
        </div>
    );
};

export default Input;
