import FormComponent from '../FormComponent';
import { useUpdate, useResource, useInvalidate } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/antd';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useParams } from 'react-router-dom';
import { RESOURCE } from '../constants';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
    const { id } = useParams();
    const { mutate: update } = useUpdate();
    const { resource } = useResource(RESOURCE);
    const invalidate = useInvalidate();

    const { form, formProps, saveButtonProps, formLoading } = useForm({
        meta: {
            populate: {
                send_to_user_ids: {
                    fields: ['id'],
                },
            },
        },
    });
    const handleCreate = () => {
        if (!id) return;
        form.validateFields()
            .then((values) => {
                update(
                    {
                        resource: RESOURCE,
                        values,
                        id,
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: `edit-${RESOURCE}`,
                                message: `edit ${resource?.meta?.label} successfully`,
                                ...notificationConfig,
                            });
                            invalidate({
                                resource: RESOURCE,
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
            <FormComponent formType="edit" formProps={formProps} formLoading={formLoading} handler={handleCreate} />
        </Edit>
    );
};

export default index;
