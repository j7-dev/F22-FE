import { Select, SelectProps, Form, FormItemProps } from 'antd';
import { useSelect } from '@refinedev/antd';
import { UseSelectProps, BaseRecord, HttpError } from '@refinedev/core';

const index = <TQueryFnData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TData extends BaseRecord = TQueryFnData>(props: { fetchProps: UseSelectProps<TQueryFnData, TError, TData>; selectProps: SelectProps; formItemProps: FormItemProps }) => {
    const { fetchProps, selectProps, formItemProps } = props;

    const { selectProps: fetchedSelectProps } = useSelect(fetchProps);
    return (
        <Form.Item {...formItemProps}>
            <Select {...fetchedSelectProps} {...selectProps} />
        </Form.Item>
    );
};

export default index;
