import FormComponent from '../FormComponent';
import { useCustomMutation, HttpError, useGetIdentity, useApiUrl, useInvalidate, useResource } from '@refinedev/core';
import { Create, useForm, CreateProps } from '@refinedev/antd';
import { TTransaction, TTransactionFields, TMe } from '@/types';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const index: React.FC<
    CreateProps & {
        notificationConfig?: ArgsProps;
    }
> = ({ notificationConfig = {}, ...createProps }) => {
    const { t } = useTranslation();
    const invalidate = useInvalidate();
    const queryClient = useQueryClient();
    const { mutate: add } = useCustomMutation<TTransactionFields>();
    const { data: identity } = useGetIdentity<TMe>();
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
                            by: 'ADMIN',
                            updated_by_user_id,
                            is_hide: true,
                        },
                    },
                    {
                        onSuccess: () => {
                            form.resetFields();
                            invalidate({
                                resource: 'users',
                                invalidates: ['all'],
                            });
                            queryClient.invalidateQueries(['wallet-api', 'balance', 'get']);
                            notification.success({
                                key: 'add balance',
                                message: t('Balance Adjustment successfully'),
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
    const { action, identifier } = useResource();
    const isUserAdjustment = action === 'show' && identifier === 'members-list';

    // TODO 可以加上顯示API結果方便除錯
    saveButtonProps.children = t('Save');
    if (isUserAdjustment) {
        saveButtonProps.className = 'hidden';
    }

    return (
        <Create {...createProps} saveButtonProps={saveButtonProps}>
            <FormComponent formType="create" formProps={formProps} handler={handleCreate} saveButtonProps={saveButtonProps} />
        </Create>
    );
};

export default index;
