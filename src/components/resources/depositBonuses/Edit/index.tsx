import FormComponent from '../FormComponent';
import { useUpdate, useGo } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/antd';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { mutate: update } = useUpdate();
    const go = useGo();

    const { form, formProps, saveButtonProps, formLoading } = useForm({
        meta: {
            populate: {
                vips: {
                    fields: ['id'],
                },
            },
        },
    });
    const handleEdit = () => {
        if (!id) return;
        form.validateFields()
            .then((values) => {
                console.log('⭐  values:', values);
                update(
                    {
                        resource: 'deposit-bonuses',
                        values,
                        id,
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: 'edit-deposit-bonuses',
                                message: t('Edit Turnover bonus successfully'),
                                ...notificationConfig,
                            });

                            go({
                                to: '/refine/promotion/deposit-bonuses',
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
        <Edit saveButtonProps={saveButtonProps}>
            <FormComponent formType="edit" formProps={formProps} formLoading={formLoading} handler={handleEdit} />
        </Edit>
    );
};

export default index;
