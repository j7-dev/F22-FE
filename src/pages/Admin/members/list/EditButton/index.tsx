import { Button } from 'antd';
import { useUpdate } from '@refinedev/core';
import { modalPropsAtom, modalShowAtom } from '../atom';
import { useAtom, useSetAtom } from 'jotai';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { EditOutlined } from '@ant-design/icons';
import { DataType } from '../types';

const EditButton: React.FC<{ record: DataType }> = ({ record }) => {
    const { mutate: update, isLoading } = useUpdate();
    const [modalProps, setModalProps] = useAtom(modalPropsAtom);
    const setModalShow = useSetAtom(modalShowAtom);
    const form = useFormInstance();

    const handleEdit = () => {
        form.validateFields()
            .then((values) => {
                console.log(values);
                update(
                    {
                        resource: 'vips',
                        values,
                        id: record.id || '',
                    },
                    {
                        onSuccess: () => {
                            setModalShow(false);
                            form.resetFields();
                        },
                    },
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClick = () => {
        form.setFieldsValue(record);
        setModalShow(true);
        setModalProps({
            ...modalProps,
            title: `Edit VIP ${record?.label}`,
            onOk: handleEdit,
            confirmLoading: isLoading,
        });
    };

    return (
        <>
            <Button type="primary" onClick={handleClick} shape="circle" icon={<EditOutlined />} />
        </>
    );
};

export default EditButton;
