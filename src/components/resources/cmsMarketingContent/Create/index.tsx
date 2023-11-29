import FormComponent from '../FormComponent';
import { useCreate, HttpError, useGo, useResource } from '@refinedev/core';
import { Create, useForm, CreateProps } from '@refinedev/antd';
import { TCommission, TCommissionFields } from '@/types';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { RESOURCE } from '../constants';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { TPosition } from '../List/types';

const index: React.FC<
    {
        notificationConfig?: ArgsProps;
        position: TPosition;
    } & CreateProps
> = ({ notificationConfig = {}, position, ...createProps }) => {
    const { t } = useTranslation();
    const { mutate: create } = useCreate();
    const go = useGo();
    const { resource } = useResource(RESOURCE);

    const { form, formProps, saveButtonProps, formLoading } = useForm<TCommission, HttpError, TCommissionFields>();
    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                create(
                    {
                        resource: RESOURCE,
                        values: {
                            ...values,
                            publishedAt: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                        },
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: `create-${RESOURCE}`,
                                message: `${t('create')} ${resource?.meta?.label} ${t('successfully')}`,
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
    saveButtonProps.children = t('Save');

    return (
        <Create saveButtonProps={saveButtonProps} {...createProps}>
            <FormComponent position={position} formType="create" formProps={formProps} formLoading={formLoading} handler={handleCreate} />
        </Create>
    );
};

export default index;
