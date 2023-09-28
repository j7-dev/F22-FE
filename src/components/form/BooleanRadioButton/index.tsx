import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Radio, FormItemProps } from 'antd';

const index: React.FC<{
    formItemProps: FormItemProps;
}> = ({ formItemProps }) => {
    return (
        <Form.Item {...formItemProps}>
            <Radio.Group
                options={[
                    { label: 'ALL', value: undefined as any },
                    { label: <CheckOutlined />, value: true },
                    { label: <CloseOutlined />, value: false },
                ]}
                optionType="button"
                buttonStyle="solid"
                className="w-avg"
            />
        </Form.Item>
    );
};

export default index;