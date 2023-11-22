import { Form, Button, FormProps, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import BooleanRadioButton from '@/components/form/BooleanRadioButton';
import 'dayjs/locale/ko';

const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
    const { t } = useTranslation();

    return (
        <Card bordered={false}>
            <Form {...formProps} layout="vertical">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-0">
                    <BooleanRadioButton
                        formItemProps={{
                            initialValue: undefined,
                            label: t('status'),
                            name: ['activated'],
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
