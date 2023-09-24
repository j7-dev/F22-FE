import { Form, Input, Select, FormProps } from 'antd';
import { useUserSelect } from '@/hooks';
import AmountInput from '@/components/Admin/AmountInput';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
}> = ({ formProps, handler }) => {
    const { selectProps: userSelectProps } = useUserSelect({
        roleType: 'authenticated',
    });

    return (
        <Form {...formProps} onFinish={handler} layout="vertical">
            <div className="grid grid-cols-2 gap-6">
                <Form.Item
                    name={['title']}
                    label="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a value',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name={['user']} label="User">
                    <Select {...userSelectProps} />
                </Form.Item>
            </div>
            <AmountInput />

            <Form.Item name={['description']} label="description">
                <Input.TextArea />
            </Form.Item>
        </Form>
    );
};

export default FormComponent;
