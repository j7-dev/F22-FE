import FormComponent from '../FormComponent';
import { useCreate, useGo, useResource } from '@refinedev/core';
import { Create, useForm } from '@refinedev/antd';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useTranslation } from 'react-i18next';
import { RESOURCE } from '../constants';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
    const { t } = useTranslation();
    const { mutate: create } = useCreate();
    const go = useGo();
    const { resource } = useResource(RESOURCE);

    const { form, formProps, saveButtonProps, formLoading } = useForm();
    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                console.log('⭐  values:', values);
                create(
                    {
                        resource: RESOURCE,
                        values,
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: `create-${RESOURCE}`,
                                message: t(`Create ${RESOURCE} successfully`),
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
        <Create saveButtonProps={saveButtonProps}>
            <FormComponent formType="create" formProps={formProps} formLoading={formLoading} handler={handleCreate} />
        </Create>
    );
};

export default index;
