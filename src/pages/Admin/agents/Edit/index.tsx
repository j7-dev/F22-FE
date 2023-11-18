import FormComponent from '../FormComponent';
import { useUpdate, HttpError, useInvalidate, useGo } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/antd';
import { TUser } from '@/types';
import { Dayjs } from 'dayjs';
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
    const go = useGo();

    const { form, formProps, saveButtonProps, formLoading } = useForm<TUser, HttpError, TUser & { birthday: Dayjs }>();

    const handleUpdate = () => {
        if (!id) return;
        form.validateFields()
            .then((values) => {
                update(
                    {
                        resource: 'users',
                        values,
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
                                resource: 'agent',
                                invalidates: ['list'],
                            });

                            go({
                                to: '/refine/agent/list',
                            });
                        },
                    },
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };
    saveButtonProps.children = t('Save');

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <FormComponent formType="edit" formProps={formProps} formLoading={formLoading} handler={handleUpdate} />
        </Edit>
    );
};

export default index;
