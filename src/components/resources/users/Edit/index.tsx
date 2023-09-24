import FormComponent from '@/components/resources/users/FormComponent';
import { useUpdate, HttpError } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/antd';
import { TUser } from '@/types';
import dayjs, { Dayjs } from 'dayjs';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useParams } from 'react-router-dom';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
    const { mutate: update } = useUpdate();
    const { id } = useParams();

    const { form, formProps, saveButtonProps, formLoading } = useForm<TUser, HttpError, TUser & { birthday: Dayjs }>({
        meta: {
            populate: {
                agent: {
                    fields: ['id'],
                },
                top_agent: {
                    fields: ['id'],
                },
                role: {
                    fields: ['type'],
                },
            },
        },
    });

    const handleUpdate = () => {
        if (!id) return;
        form.validateFields()
            .then((values) => {
                const birthday = values?.birthday as Dayjs;

                const formattedValues = birthday
                    ? {
                          ...values,
                          birthday: dayjs(values?.birthday).format('YYYY-MM-DD'),
                      }
                    : values;

                update(
                    {
                        resource: 'users',
                        values: formattedValues,
                        id,
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: 'edit-user',
                                message: 'Edit user successfully',
                                ...notificationConfig,
                            });
                        },
                    },
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <FormComponent formType="edit" formProps={formProps} formLoading={formLoading} handler={handleUpdate} />
        </Edit>
    );
};

export default index;
