import React, { useState } from 'react';
import convertAllIcon from '@/assets/images/newMyPage/convertAll.svg';
// import { useConvert } from '@/hooks/resources/useConvert';
import { Modal, Spin } from 'antd';

const index: React.FC<{ rollingPoint?: number }> = ({ rollingPoint = 0 }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const { isLoading } = useConvert();
    const [fakeLoading, setFakeLoading] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setTimeout(() => {
            setIsModalOpen(false);
            setFakeLoading(false);
        }, 2000);
        setFakeLoading(true);
        console.log('rollingPoint', rollingPoint);
        // handleClick({ rollingPoint })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={showModal} className="convertAll cursor-pointer px-1 py-0.5 sm:mt-2 sm:py-[6.5px] sm:px-3 sm:gap-2 border-0 rounded-xl bg-primary flex items-center gap-0.5">
                <img className="aspect-square w-2.5 sm:w-4" src={convertAllIcon} alt="" />
                <span className="font-bold text-white text-[6px] sm:text-xs">Convert All</span>
            </button>
            <Modal title="Confirm Convert?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="text-center">
                    <Spin spinning={fakeLoading} />
                </div>
            </Modal>
        </>
    );
};

export default index;
