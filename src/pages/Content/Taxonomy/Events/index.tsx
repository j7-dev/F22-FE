import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useList } from '@refinedev/core';
import { useModal } from '@refinedev/antd';
import { Spin, Modal } from 'antd';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import eventImg from '@/assets/images/eventImg.jpg';
import { nanoid } from 'nanoid';
import { API_URL } from '@/utils';
import { AiFillCloseCircle } from 'react-icons/ai';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [eventContent, setEventContent] = useState('');
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
                <div className="hidden slotTitle md:grid grid-cols-11 gap-4 py-9 border-0 border-solid border-b border-[#d5d8dc] shadow-[0_4.5px_0_0_#0000000D,0_3.5px_0_0_#FFFFFF,0_1.5px_0_0_#0000001A] ">
                    <div className="col-span-1 flex justify-center">
                        <img src={Icon_Main_Title} alt="" className="" />
                    </div>
                    <span className="col-span-1 font-bold text-3xl text-[#9680EA] flex items-center">{t('EVENTS')}</span>
                </div>
                <Spin spinning={isFetching}>
                    <div className="eventSection md:grid grid-cols-11 py-9">
                        <div className="eventList col-span-9 col-start-2 grid sm:grid-cols-3 grid-cols-2 gap-4">
                            {eventList?.data?.map((item) => (
                                <div
                                    key={nanoid()}
                                    onClick={() => {
                                        //使用正則表達式取得括號內的SRC字串
                                        setEventContent(item.content.match(/\(([^)]+)\)/)[1]);
                                        show();
                                    }}
                                    className="eventWrap cursor-pointer"
                                >
                                    <div className="eventImg rounded-2xl w-full mb-2 overflow-hidden">
                                        <img src={eventImg} alt="" className="aspect-[342/250] w-full object-cover" />
                                    </div>
                                    <div className="sm:flex-row sm:gap-5 flex-col flex gap-2 items-center">
                                        <div className="eventTitle text-base font-bold text-black ml-2.5">{t(item.title)}</div>
                                        <button className="hidden sm:block eventBtn rounded-2xl bg-[#5932EA] text-white text-base font-bold px-6 py-2 ml-auto border-0">{t('Details')}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Spin>
            </div>
            <Modal {...modalProps} footer={null} closeIcon={<AiFillCloseCircle color="#BDBDBD" size={30} />} centered width={'50vw'} classNames={{ content: 'p-0 my-20 rounded-2xl overflow-hidden' }}>
                <div className="eventContent">
                    <img src={API_URL + eventContent} alt="" className="w-full" />
                </div>
            </Modal>
        </div>
    );
};

export default index;
