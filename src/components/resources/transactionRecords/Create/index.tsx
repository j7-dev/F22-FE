import FormComponent from '../FormComponent';
import { useCustomMutation, HttpError, useGetIdentity, useApiUrl } from '@refinedev/core';
import { Create, useForm } from '@refinedev/antd';
import { TTransaction, TTransactionFields, TUser } from '@/types';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';

const index: React.FC<{
    notificationConfig?: ArgsProps;
}> = ({ notificationConfig = {} }) => {
    const { mutate: add } = useCustomMutation<TTransactionFields>();
    const { data: identity } = useGetIdentity<TUser>();
    const updated_by_user_id = identity?.id;
    const apiUrl = useApiUrl();

    const { form, formProps, saveButtonProps } = useForm<TTransaction, HttpError, Pick<TTransactionFields, 'title' | 'user' | 'description' | 'amount' | 'currency' | 'amount_type'>>();
    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                add(
                    {
                        url: `${apiUrl}/wallet-api/balance/add`,
                        method: 'post',
                        values: {
                            ...values,
                            type: 'MANUAL',
                            by: 'USER',
                            updated_by_user_id,
                        },
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            notification.success({
                                key: 'add balance',
                                message: 'add balance records successfully',
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

    // TODO 可以加上顯示API結果方便除錯

    return (
        <Create saveButtonProps={saveButtonProps}>
            <FormComponent formType="create" formProps={formProps} handler={handleCreate} />
        </Create>
    );
};

export default index;