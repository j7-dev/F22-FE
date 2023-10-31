import React, { useState } from 'react';
import convertAllIcon from '@/assets/images/newMyPage/convertAll.svg';
import { Modal, Spin } from 'antd';
import { useApiUrl, useCustomMutation } from '@refinedev/core';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const index: React.FC = () => {
    const { t } = useTranslation();
    const apiUrl = useApiUrl();
    const { mutate, isLoading } = useCustomMutation();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        mutate(
            {
                url: `${apiUrl}/wallet-api/trunoverbonus-to-cash`,
                method: 'post',
                values: {},
            },
            {
                onSuccess: () => {
                    setIsModalOpen(false);
                    queryClient.invalidateQueries(['getUserIdentity']); // 清除getIdentity數據
                },
                onError: (error) => {
                    console.log('error', error);
                },
            },
        );
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={showModal} className="convertAll cursor-pointer px-1 py-0.5 sm:mt-2 sm:py-[6.5px] sm:px-3 sm:gap-2 border-0 rounded-xl bg-primary flex items-center gap-0.5">
                <img className="aspect-square w-2.5 sm:w-4" src={convertAllIcon} alt="" />
                <span className="font-bold text-white text-[6px] sm:text-xs">{t('Convert All')}</span>
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
