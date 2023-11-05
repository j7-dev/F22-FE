import FormComponent from '../FormComponent';
import { useCreate, HttpError, useGo, useResource } from '@refinedev/core';
import { Create, useForm } from '@refinedev/antd';
import { TCommission, TCommissionFields } from '@/types';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { RESOURCE, POST_TYPE } from '../constants';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
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
                            post_type: POST_TYPE,
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

    return (
        <Create saveButtonProps={saveButtonProps}>
            <FormComponent formType="create" formProps={formProps} formLoading={formLoading} handler={handleCreate} />
        </Create>
    );
};

export default index;
