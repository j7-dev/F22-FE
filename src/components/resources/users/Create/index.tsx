import FormComponent from '@/components/resources/users/FormComponent';
import { useCreate, HttpError } from '@refinedev/core';
import { Create, useForm } from '@refinedev/antd';
import { TUser, TRoleType } from '@/types';
import dayjs, { Dayjs } from 'dayjs';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useTranslation } from 'react-i18next';

const index: React.FC<{
    defaultRoleType?: TRoleType;
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {}, defaultRoleType }) => {
    const { t } = useTranslation();
    const { mutate: create } = useCreate();
    const { form, formProps, saveButtonProps, formLoading } = useForm<TUser, HttpError, TUser & { birthday: Dayjs }>();
    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                const birthday = values?.birthday as Dayjs;

                const formattedValues = birthday
                    ? {
                          ...values,
                          birthday: dayjs(values?.birthday).format('YYYY-MM-DD'),
                      }
                    : values;

                create(
                    {
                        resource: 'users',
                        values: formattedValues,
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: 'create-user',
                                message: t('Create user successfully'),
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
    saveButtonProps.children = t('Save');

    return (
        <Create saveButtonProps={saveButtonProps} title={t('Create Member')}>
            <FormComponent formType="create" formProps={formProps} formLoading={formLoading} handler={handleCreate} defaultRoleType={defaultRoleType} />
        </Create>
    );
};

export default index;
