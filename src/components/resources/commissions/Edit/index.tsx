import FormComponent from '../FormComponent';
import { useUpdate, HttpError } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/antd';
import { TCommission } from '@/types';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useParams } from 'react-router-dom';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
    const { id } = useParams();
    const { mutate: update } = useUpdate();

    const { form, formProps, saveButtonProps } = useForm<TCommission, HttpError, TCommission>();
    const handleCreate = () => {
        if (!id) return;
        form.validateFields()
            .then((values) => {
                update(
                    {
                        resource: 'commissions',
                        values,
                        id,
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: 'create-commission',
                                message: 'Create commission successfully',
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
            <FormComponent formType="edit" formProps={formProps} handler={handleCreate} />
        </Edit>
    );
};

export default index;