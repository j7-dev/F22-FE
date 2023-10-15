import { useEffect } from 'react';
import { Form, Input, Button, notification, Spin } from 'antd';
import { useCustomMutation, useApiUrl } from '@refinedev/core';
import { useParams } from 'react-router-dom';
import { TUserNote, USER_NOTES_FIELDS } from '@/types';

const { TextArea } = Input;

const NotesForm = ({ user_notes }: { user_notes?: TUserNote }) => {
    const [form] = Form.useForm<TUserNote>();
    const apiUrl = useApiUrl();
    const { id } = useParams();

    const { mutate, isLoading } = useCustomMutation<TUserNote>();

    const handleFinish = (values: TUserNote) => {
        mutate(
            {
                url: `${apiUrl}/users/${id}`,
                method: 'put',
                values: {
                    user_notes: values,
                },
            },
            {
                onSuccess: () => {
                    notification.success({
                        message: 'Update notes successfully',
                    });
                },
            },
        );
    };

    useEffect(() => {
        if (user_notes) {
            console.log('⭐  user_notes:', user_notes);
            form.setFieldsValue(user_notes);
        }
    }, [user_notes]);

    return (
        <Spin spinning={isLoading}>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <div className="grid grid-cols-3 gap-6">
                    {USER_NOTES_FIELDS.map((field) => (
                        <div key={field}>
                            <Form.Item name={[field.toString(), 'title']} initialValue={`Note${field + 1}`}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={[field.toString(), 'content']}>
                                <TextArea showCount maxLength={100} style={{ height: '8rem' }} />
                            </Form.Item>
                        </div>
                    ))}
                </div>
                <Form.Item className="text-right mt-8">
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default NotesForm;
