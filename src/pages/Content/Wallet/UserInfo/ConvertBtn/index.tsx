import React, { useState } from 'react';
import convertAllIcon from '@/assets/images/newMyPage/convertAll.svg';
import { useConvert } from '@/hooks/resources/useConvert';
import { Modal, Spin } from 'antd';

const index: React.FC<{ rollingPoint?: number }> = ({ rollingPoint = 0 }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isLoading } = useConvert();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        console.log('rollingPoint', rollingPoint);
        // handleClick({ rollingPoint })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={showModal} className="convertAll cursor-pointer mt-2 border-0 rounded-xl py-[6.5px] px-3 bg-primary flex gap-2">
                <img className="aspect-square w-4" src={convertAllIcon} alt="" />
                <span className="font-bold text-white text-xs">Convert All</span>
            </button>
            <Modal title="Confirm Convert?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="text-center">
                    <Spin spinning={isLoading} />
                </div>
            </Modal>
        </>
    );
};

export default index;
