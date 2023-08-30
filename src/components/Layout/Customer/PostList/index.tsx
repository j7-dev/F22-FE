import React from 'react';
import { useAtomValue, useAtom, useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';
import {
    serviceCenterAtom,
    isShowContentAtom,
    postContentAtom,
    PostContent,
} from '@/components/Layout/Customer/ServiceCenter';
import SinglePost from './PostDetail';

const Notice: React.FC = () => {
    const serviceCenterValue = useAtomValue(serviceCenterAtom);
    const [
        isShowContent,
        setIsShowContent,
    ] = useAtom(isShowContentAtom);
    const setPostContent = useSetAtom(postContentAtom);

    const fakeData = [
        {
            title: 'Notice',
            contentList: [
                {
                    id: 1,
                    title: 'Notice Fake Data 1',
                    date: '2023-08-14',
                    content: 'Notice Fake Data 1 Content',
                },
                {
                    id: 2,
                    title: 'Notice Fake Data 2',
                    date: '2023-08-14',
                    content: 'Notice Fake Data 2 Content',
                },
            ],
        },
        {
            title: 'Frequently Asked Questions',
            contentList: [
                {
                    id: 1,
                    title: 'FAQ Fake Data 1',
                    date: '2023-08-14',
                    content: 'FAQ Fake Data 2 Content',
                },
                {
                    id: 2,
                    title: 'FAQ Fake Data 2',
                    date: '2023-08-14',
                    content: 'FAQ Fake Data 2 Content',
                },
            ],
        },
        {
            title: 'Promotions/Events',
            contentList: [
                {
                    id: 1,
                    title: 'Promotions Fake Data 1',
                    date: '2023-08-14',
                },
                {
                    id: 2,
                    title: 'Promotions Fake Data 2',
                    date: '2023-08-14',
                },
            ],
        },
        {
            title: '1:1 Inquiry',
            contentList: [
                {
                    id: 1,
                    title: 'Inquiry Fake Data 1',
                    date: '2023-08-14',
                },
                {
                    id: 2,
                    title: 'Inquiry Fake Data 2',
                    date: '2023-08-14',
                },
            ],
        },
        {
            title: 'Partnership',
            contentList: [
                {
                    id: 1,
                    title: 'Partnership Fake Data 1',
                    date: '2023-08-14',
                },
                {
                    id: 2,
                    title: 'Partnership Fake Data 2',
                    date: '2023-08-14',
                },
            ],
        },
    ];
    const handleClick = (data: PostContent) => {
        setIsShowContent(true);
        setPostContent(data);
    };
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="pageHeader font-bold text-[#2B3240] text-sm p-2.5">
                {serviceCenterValue}
            </div>
            {isShowContent && <SinglePost />}
            <div className="pageContent w-full flex flex-col">
                <div className="tableHeader h-10 w-full items-center flex flex-row bg-[#2B3240] text-white p-2 font-bold text-[13px]">
                    <div className="tableNo w-20 text-center">No.</div>
                    <div className="tableTitle w-8/12">Title</div>
                    <div className="tableDate w-48 text-center">
                        Date Created
                    </div>
                </div>
                <div className="tableContent ">
                    {fakeData.map(
                        (item) =>
                            // 等於
                            // 	if (item.title === serviceCenterValue) {
                            //   item.contentList.map((content) => {
                            //   });
                            // }
                            item.title === serviceCenterValue &&
                            item.contentList.map((content) => (
                                <div
                                    className="contentList h-10 w-full items-center flex flex-row  p-2 font-bold text-[13px]"
                                    key={nanoid()}
                                >
                                    <div className="tableNo w-20 text-center">
                                        {content.id}
                                    </div>
                                    <div
                                        className="tableTitle w-8/12 hover:text-[#78D39D] cursor-pointer"
                                        onClick={() =>
                                            handleClick(content as PostContent)
                                        }
                                    >
                                        {content.title}
                                    </div>
                                    <div className="tableDate w-48 text-center">
                                        {content.date}
                                    </div>
                                </div>
                            )),
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notice;
