import FormComponent from '../FormComponent';
import { useUpdate, useGo, useResource } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/antd';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RESOURCE } from '../constants';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { mutate: update } = useUpdate();
    const go = useGo();
    const { resource } = useResource(RESOURCE);

    const { form, formProps, saveButtonProps, formLoading } = useForm({
        meta: {
            populate: {
                user: {
                    fields: ['id'],
                },
                period: {
                    fields: '*',
                },
            },
        },
    });
    const handleEdit = () => {
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
                                message: t(`Edit ${RESOURCE} successfully`),
                                ...notificationConfig,
                            });
                            go({
                                to: (resource?.list || '') as string,
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
            <FormComponent formType="edit" formProps={formProps} formLoading={formLoading} handler={handleEdit} />
        </Edit>
    );
};

export default index;
