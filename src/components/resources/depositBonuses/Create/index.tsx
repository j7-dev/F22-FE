import FormComponent from '../FormComponent';
import { useCreate, useGo } from '@refinedev/core';
import { Create, useForm } from '@refinedev/antd';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
    const { mutate: create } = useCreate();
    const go = useGo();

    const { form, formProps, saveButtonProps, formLoading } = useForm();
    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                create(
                    {
                        resource: 'deposit-bonuses',
                        values,
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: 'create-discount',
                                message: 'Create turnover bonus successfully',
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

    return (
        <Create saveButtonProps={saveButtonProps}>
            <FormComponent formType="create" formProps={formProps} formLoading={formLoading} handler={handleCreate} />
        </Create>
    );
};

export default index;
