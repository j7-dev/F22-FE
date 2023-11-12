import FormComponent from '../FormComponent';
import { useCreate, useGo, useResource } from '@refinedev/core';
import { Create, useForm, CreateProps } from '@refinedev/antd';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useTranslation } from 'react-i18next';
import { RESOURCE } from '../constants';

const index: React.FC<
    CreateProps & {
        notificationConfig?: ArgsProps;
    }
> = ({ notificationConfig = {}, ...createProps }) => {
    const { t } = useTranslation();
    const { mutate: create } = useCreate();
    const go = useGo();
    const { resource } = useResource(RESOURCE);
    const { action, identifier } = useResource();
    const isUserAdjustment = action === 'show' && identifier === 'members-list';

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
        <Create
            {...createProps}
            saveButtonProps={
                isUserAdjustment
                    ? {
                          ...saveButtonProps,
                          className: 'hidden',
                      }
                    : saveButtonProps
            }
        >
            <FormComponent saveButtonProps={saveButtonProps} formType="create" formProps={formProps} formLoading={formLoading} handler={handleCreate} />
        </Create>
    );
};

export default index;
