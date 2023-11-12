import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useList } from '@refinedev/core';
import { useModal } from '@refinedev/antd';
import { Spin, Modal, Pagination } from 'antd';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import { nanoid } from 'nanoid';
import { API_URL } from '@/utils';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useShowPc } from '@/hooks/useShowPc';
import { BsFillCaretLeftFill } from 'react-icons/bs';

const index: React.FC = () => {
    const isPc = useShowPc();
    const { t } = useTranslation();
    const [eventContent, setEventContent] = useState<{ url?: string }[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [defaultPageSize, setDefaultPageSize] = useState(isPc ? 9 : 10);
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
        pagination: {
            current: currentPage,
            pageSize: defaultPageSize,
        },
    });
    return (
        <div className="eventPage md:my-9 md:gap-8 my-4 w-full flex flex-col gap-4">
            <div className="shadowSection w-auto rounded-2xl px-4 bg-white md:px-0 md:py-4 md:mx-4 md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] ">
                <div className="hidden slotTitle md:grid grid-cols-11 gap-4 py-9 border-0 border-solid border-b border-[#d5d8dc] shadow-[0_4.5px_0_0_#0000000D,0_3.5px_0_0_#FFFFFF,0_1.5px_0_0_#0000001A] ">
                    <div className="col-span-1 flex justify-center">
                        <img src={Icon_Main_Title} alt="" className="" />
                    </div>
                    <span className=" whitespace-nowrap col-span-1 font-bold text-3xl text-[#9680EA] flex items-center">{t('EVENTS')}</span>
                </div>
                <Spin spinning={isFetching}>
                    <div className="eventSection md:grid grid-cols-11 py-9 gap-9">
                        <div className="eventList col-span-9 col-start-2 grid md:grid-cols-3 grid-cols-2 gap-4">
                            {eventList?.data?.map((item) => (
                                <div
                                    key={nanoid()}
                                    onClick={() => {
                                        //使用正則表達式取得括號內的SRC字串
                                        setEventContent(item.content_images);
                                        show();
                                    }}
                                    className="eventWrap cursor-pointer"
                                >
                                    <div className="eventImg rounded-2xl w-full mb-2 overflow-hidden">
                                        <img src={API_URL + item.feature_image.url} alt="" className="aspect-[342/250] w-full object-cover" />
                                    </div>
                                    <div className="md:flex-row md:gap-5 flex-col flex gap-2 items-center">
                                        <div className="eventTitle text-base font-bold text-black ml-2.5">{t(item.title)}</div>
                                        <button className="hidden md:block eventBtn rounded-2xl bg-[#5932EA] text-white text-base font-bold px-6 py-2 ml-auto border-0">{t('Details')}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            className="col-span-11 text-center"
                            defaultCurrent={currentPage}
                            defaultPageSize={defaultPageSize}
                            showSizeChanger
                            onShowSizeChange={(_current, pageSize) => {
                                setDefaultPageSize(pageSize);
                            }}
                            current={currentPage}
                            total={eventList?.total}
                            onChange={(clickPage) => {
                                setCurrentPage(clickPage);
                            }}
                            // hideOnSinglePage={true}
                            itemRender={(page, type) => {
                                return (
                                    <div>
                                        {type === 'prev' ? <BsFillCaretLeftFill color="#BDBDBD" /> : ''}
                                        {type === 'next' ? <BsFillCaretLeftFill color="#BDBDBD" className="rotate-180" /> : ''}
                                        {type === 'page' ? <span className="w-[30px] aspect-square rounded-full grid place-content-center text-[#BDBDBD] text-sm font-bold">{page}</span> : ''}
                                    </div>
                                );
                            }}
                        />
                    </div>
                </Spin>
            </div>
            <Modal {...modalProps} footer={null} closeIcon={<AiFillCloseCircle color="#BDBDBD" size={30} />} centered width={isPc ? '30vw' : '100vw'} classNames={{ content: 'p-0 my-20 rounded-2xl overflow-hidden' }}>
                <div className="eventContent">
                    {eventContent.map((item) => (
                        <img key={nanoid()} src={API_URL + item.url} alt="" className="w-full" />
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default index;
