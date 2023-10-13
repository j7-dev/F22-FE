import FormComponent from '../FormComponent';
import { useUpdate, HttpError, useGo } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/antd';
import { TCommission, TCommissionFields } from '@/types';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useParams } from 'react-router-dom';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
    const { id } = useParams();
    const { mutate: update } = useUpdate();
    const go = useGo();

    const { form, formProps, saveButtonProps, formLoading } = useForm<TCommission, HttpError, TCommissionFields>({
        meta: {
            populate: {
                vips: {
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
                        resource: 'discounts',
                        values,
                        id,
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: 'create-discounts',
                                message: 'Create Turnover bonus successfully',
                                ...notificationConfig,
                            });

                            go({
                                to: '/refine/promotion/discounts',
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
