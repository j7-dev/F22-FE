import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useModal } from '@refinedev/antd';
import { AiFillCloseCircle } from 'react-icons/ai';

const index: React.FC = () => {
    const { show, modalProps } = useModal();
    const { show: show2, modalProps: props2 } = useModal();
    useEffect(() => {
        show();
        show2();
    }, []);
    return (
        <>
            <Modal {...modalProps} centered footer={null} closeIcon={<AiFillCloseCircle color="#FFFFFF" size={30} />}>
                123
            </Modal>
            <Modal {...props2} centered footer={null} closeIcon={<AiFillCloseCircle color="#FFFFFF" size={30} />}>
                123
            </Modal>
        </>
    );
};

export default index;
