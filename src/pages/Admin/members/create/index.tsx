import FormComponent from '../list/FormComponent';
import { useCreate, HttpError } from '@refinedev/core';
import { Create, useForm } from '@refinedev/antd';
import { TUser } from '@/types';
import dayjs, { Dayjs } from 'dayjs';

const index = () => {
    const { mutate: _create } = useCreate();

    const { form, formProps, saveButtonProps } = useForm<TUser, HttpError, TUser & { birthday: Dayjs }>();
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
                console.log('⭐  .then  formattedValues', formattedValues);

                // create(
                //     {
                //         resource: 'users',
                //         values: formattedValues,
                //     },
                //     {
                //         onSuccess: () => {
                //             form.resetFields();
                //         },
                //     },
                // );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Create saveButtonProps={saveButtonProps}>
            <FormComponent formProps={formProps} handler={handleCreate} />
        </Create>
    );
};

export default index;
