import FormComponent from '../FormComponent';
import { useCreate, HttpError, useGo } from '@refinedev/core';
import { Create, useForm } from '@refinedev/antd';
import { TCommission, TCommissionFields } from '@/types';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useTranslation } from 'react-i18next';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
    const { mutate: create } = useCreate();
    const go = useGo();
    const { t } = useTranslation();

    const { form, formProps, saveButtonProps } = useForm<TCommission, HttpError, TCommissionFields>();
    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                create(
                    {
                        resource: 'commissions',
                        values,
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: 'create-commission',
                                message: 'Create commission successfully',
                                ...notificationConfig,
                            });
                            go({
                                to: '/refine/agents/commissions',
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
        <Create saveButtonProps={saveButtonProps}>
            <FormComponent formType="create" formProps={formProps} handler={handleCreate} />
        </Create>
    );
};

export default index;
