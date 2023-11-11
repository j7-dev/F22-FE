import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Radio, FormItemProps, RadioGroupProps } from 'antd';
import { useTranslation } from 'react-i18next';

const index: React.FC<{
    formItemProps: FormItemProps;
    radioGroupProps?: RadioGroupProps;
}> = ({ formItemProps, radioGroupProps }) => {
    const { t } = useTranslation();
    return (
        <Form.Item {...formItemProps}>
            <Radio.Group
                options={[
                    { label: t('ALL'), value: undefined as any },
                    { label: <CheckOutlined />, value: true },
                    { label: <CloseOutlined />, value: false },
                ]}
                optionType="button"
                buttonStyle="solid"
                className="w-avg"
                {...radioGroupProps}
            />
        </Form.Item>
    );
};

export default index;
