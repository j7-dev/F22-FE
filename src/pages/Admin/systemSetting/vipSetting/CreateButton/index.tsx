import { Button, Form } from 'antd';
import { useCreate } from '@refinedev/core';
import { modalPropsAtom, modalShowAtom } from '../atom';
import { useAtom, useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

const CreateButton = () => {
    const { mutate: create, isLoading } = useCreate();
    const [modalProps, setModalProps] = useAtom(modalPropsAtom);
    const setModalShow = useSetAtom(modalShowAtom);
    const form = Form.useFormInstance();
    const { t } = useTranslation();

    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                console.log(values);
                create(
                    {
                        resource: 'vips',
                        values,
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
        setModalShow(true);
        setModalProps({
            ...modalProps,
            title: `${t('Create')} VIP`,
            onOk: handleCreate,
            confirmLoading: isLoading,
        });
    };

    return (
        <>
            <Button type="primary" onClick={handleClick}>
                {t('Create')}
            </Button>
        </>
    );
};

export default CreateButton;
