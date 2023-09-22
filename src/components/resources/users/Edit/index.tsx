import FormComponent from '@/components/resources/users/FormComponent';
import { useUpdate, HttpError } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/antd';
import { TUser, TRoleType } from '@/types';
import dayjs, { Dayjs } from 'dayjs';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';

const index: React.FC<{
    roleType?: TRoleType;
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {}, roleType }) => {
    const { mutate: update } = useUpdate();

    const { form, formProps, saveButtonProps } = useForm<TUser, HttpError, TUser & { birthday: Dayjs }>();
    const handleUpdate = () => {
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
                        id: values.id,
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: 'create-user',
                                message: 'Create user successfully',
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

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <FormComponent formType="edit" formProps={formProps} handler={handleUpdate} roleType={roleType} />
        </Edit>
    );
};

export default index;
