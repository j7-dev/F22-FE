import FormComponent from '../FormComponent';
import { useCreate, HttpError, useInvalidate, useGo } from '@refinedev/core';
import { Create, useForm } from '@refinedev/antd';
import { TUser } from '@/types';
import { Dayjs } from 'dayjs';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useTranslation } from 'react-i18next';
import { useGetSiteSetting } from '@/hooks';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
    const { t } = useTranslation();
    const { mutate: create } = useCreate();
    const { form, formProps, saveButtonProps, formLoading } = useForm<TUser, HttpError, TUser & { birthday: Dayjs }>();
    const invalidate = useInvalidate();
    const go = useGo();
    const siteSetting = useGetSiteSetting();
    const rolesMapping = siteSetting?.roles || {};
    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                create(
                    {
                        resource: 'users',
                        values: {
                            ...values,
                            email: `${values?.username}@smtbet7.com`,
                            role: rolesMapping.agent,
                        },
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: 'create-agent',
                                message: t('Create agent successfully'),
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

    return (
        <Create saveButtonProps={saveButtonProps}>
            <FormComponent formType="create" formProps={formProps} formLoading={formLoading} handler={handleCreate} />
        </Create>
    );
};

export default index;
