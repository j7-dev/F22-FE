import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useList } from '@refinedev/core';
import { useModal } from '@refinedev/antd';
import { Spin, Modal } from 'antd';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import { nanoid } from 'nanoid';
import { API_URL } from '@/utils';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useShowPc } from '@/hooks/useShowPc';
const index: React.FC = () => {
    const isPc = useShowPc();
    const { t } = useTranslation();
    const [eventContent, setEventContent] = useState<{ url?: string }[]>([]);
    const { modalProps, show } = useModal();
    const { data: eventList, isFetching } = useList({
        resource: 'cms-posts',
        meta: {
            populate: '*',
        },
        filters: [
            {
                field: 'post_type',
                operator: 'eq',
                value: 'event',
            },
        ],
    });
    return (
        <div className="eventPage sm:my-9 sm:gap-8 my-4 w-full flex flex-col gap-4">
            <div className="shadowSection w-auto rounded-2xl px-4 bg-white md:px-0 md:py-4 md:mx-4 md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] ">
                <iframe scrolling="no" frameBorder="0" style={{ width: '1000px', height: '800px' }}
                        allowFullScreen="true"
                        src="http://api.tgame365.com/api/?gtype=graph&uid=2427051&hash=8b2da7d6cf0bf16793042c186815b9e3"/>
            </div>
        </div>
    );
};

export default index;
