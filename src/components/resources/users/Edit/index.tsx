import FormComponent from '@/components/resources/users/FormComponent';
import { useUpdate, HttpError, useInvalidate } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/antd';
import { TUser } from '@/types';
import dayjs, { Dayjs } from 'dayjs';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
    const { t } = useTranslation();
    const { mutate: update } = useUpdate();
    const { id } = useParams();
    const invalidate = useInvalidate();

    const { form, formProps, saveButtonProps, formLoading } = useForm<TUser, HttpError, TUser & { birthday: Dayjs }>({
        meta: {
            populate: {
                vip: {
                    fields: ['id'],
                },
                agent: {
                    fields: ['id'],
                },
                top_agent: {
                    fields: ['id'],
                },
                role: {
                    fields: ['type'],
                },
                commission: {
                    fields: '*',
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
                                message: t('Edit user successfully'),
                                ...notificationConfig,
                            });

                            invalidate({
                                resource: 'users',
                                invalidates: ['list'],
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
