import { Form, FormProps, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useUserSelect } from '@/hooks';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    formLoading?: boolean;
}> = ({ formType, formProps, handler, formLoading }) => {
    const { selectProps } = useUserSelect({
        roleType: 'authenticated',
    });

    useEffect(() => {
        // 編輯時重組資料
        if (!formLoading && formProps.initialValues && formType === 'edit') {
            if (!formProps?.initialValues?.send_to_user_ids) {
                formProps.initialValues.send_to_user_ids = [];
            }
        }
    }, [formLoading]);

    return (
        <Form {...formProps} onFinish={handler} layout="vertical">
            <div className="grid grid-cols-3 gap-6">
                <Form.Item className="w-full" label="title" name={['title']} rules={[{ required: true, message: 'value is required' }]}>
                    <Input className="w-full" />
                </Form.Item>

                <Form.Item className="w-full" label="Send to Users" name={['send_to_user_ids']} help="Leave empty to send to all users">
                    <Select {...selectProps} mode="multiple" />
                </Form.Item>
            </div>
            <Form.Item className="w-full" label="content" name={['content']} rules={[{ required: true, message: 'value is required' }]}>
                <Input.TextArea className="w-full h-60" />
            </Form.Item>
        </Form>
    );
};

export default FormComponent;
