import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetAtom } from 'jotai';
import { Table, Modal, Button } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useModal } from '@refinedev/antd';
import { useShowPc } from '@/hooks/useShowPc';
import { useRwd } from '@/hooks/useRwd';
import { useGetNoteBox } from '@/hooks/resources/useGetNoteBox';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import { BiSolidTimeFive } from 'react-icons/bi';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { TSiteNotify } from '@/types/resources';
import noteBoxDeleteIcon from '@/assets/images/newMyPage/noteBoxDelete.svg';
import { renderHTML } from '@/utils';

const { Column } = Table;

const index: React.FC<{ pageSize?: number | undefined }> = ({ pageSize }) => {
    const { t } = useTranslation();
    const isPc = useShowPc();
    const { isXs } = useRwd();

    //內文modal
    const { modalProps, show, close } = useModal();
    const [modalContent, setModalContent] = useState({} as TSiteNotify);
    const handleModal = (record: TSiteNotify) => () => {
        setModalContent(record);
        show();
    };
    //取得資料
    const { tableProps } = useGetNoteBox({ pageSize: pageSize });
    console.log('🚀 ~ tableProps:', tableProps);
    //轉換資料加上日期格式
    const fxnData =
        tableProps?.dataSource?.map((item) => {
            return {
                ...item,
                fxnCreatedAt: dayjs(item.createdAt).format('MMMM DD,YYYY') as string,
            };
        }) || [];
    tableProps.dataSource = fxnData;
    console.log('🚀 ~ fxnData:', fxnData);

    //分頁條設定
    const paginationSetting: TablePaginationConfig = {
        ...tableProps.pagination,
        position: ['bottomCenter'],
        hideOnSinglePage: true, //只有一頁時不顯示分頁條
        itemRender: (page, type) => {
            return (
                <div>
                    {type === 'prev' ? <BsFillCaretLeftFill color="#BDBDBD" /> : ''}
                    {type === 'next' ? <BsFillCaretLeftFill color="#BDBDBD" className="rotate-180" /> : ''}
                    {type === 'page' ? <span className="w-[30px] aspect-square rounded-full grid place-content-center text-[#BDBDBD] text-sm font-bold">{page}</span> : ''}
                </div>
            );
        },
    };
    //如果傳入pageSize則設定分頁條的每頁筆數
    if (pageSize !== undefined) {
        paginationSetting.total = pageSize;
        // console.log('🚀 ~ paginationSetting:', paginationSetting);
    }
    //渲染點擊Read More按鈕=>如果傳入pageSize代表只渲染固定筆數則不顯示按鈕
    const ShowBtn = () => {
        if (isPc) {
            //點擊前往的頁面
            const setSection = useSetAtom(activeMenuAtom);
            const handleClick = () => {
                setSection('siteNotify');
            };
            //如果有傳入pageSize則顯示按鈕
            if (pageSize) {
                return (
                    <button onClick={handleClick} className="cursor-pointer font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">
                        {t('Read More')}
                    </button>
                );
            } else return <></>;
        } else return <></>;
    };
    //FIXME 這邊怎麼用 取得選取的資料
    // const rowSelection = {
    //     onChange: (selectedRowKeys: React.Key[], selectedRows: TSiteNotify[]) => {
    //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //     },
    // };

    return (
        <div className="bg-white h-full w-full py-6 px-4 gap-3 userBank flex flex-col rounded-2xl sm:py-[42px] sm:px-[32px] sm:gap-4 shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
            <div className="flex gap-2">
                <span className="text-black font-bold sm:text-2xl text-sm">{t('Note Box')}</span>
                {/* <div className="flex justify-center items-center rounded-full bg-[#EB5757] aspect-square w-[30px] text-xl text-white font-bold">{dataCount}</div> */}
                <ShowBtn />
            </div>
            <Table {...tableProps} className="customTable" pagination={paginationSetting}>
                <Column
                    title="Title"
                    dataIndex="title"
                    key="title"
                    className=""
                    render={(text, record) => {
                        return (
                            <>
                                <span onClick={handleModal(record as TSiteNotify)} className="cursor-pointer">
                                    {t(text)}
                                </span>
                            </>
                        );
                    }}
                />
                <Column
                    title={
                        <div className="flex items-center gap-1">
                            <BiSolidTimeFive color="#828282" size={20} />
                            {t('Date')}
                        </div>
                    }
                    dataIndex="fxnCreatedAt"
                    key="fxnCreatedAt"
                    className=""
                />
            </Table>
            <Modal {...modalProps} centered closeIcon={false} footer={false} width={`${isXs ? '80%' : '60%'}`}>
                <div className="flex flex-col pt-10 pb-8 px-6">
                    <div className="flex justify-between">
                        <span className="font-bold sm:text-2xl text-base text-black">{modalContent.title}</span>
                        <div className="cursor-pointer flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-[#ECE8FA]">
                            <img src={noteBoxDeleteIcon} alt="" />
                            <span className="hidden sm:block">{t('Delete')}</span>
                        </div>
                    </div>
                    <div className="text-[#828282] text-[10px] font-medium">
                        <span>{dayjs(modalContent.createdAt).format('MMMM DD,YYYY')}</span>
                    </div>
                    <div className="divider my-4 border-0 border-solid border-b border-[#E0E0E0] w-full" />
                    <div className="font-normal sm:text-base text-xs text-[#828282]">
                        <span>{renderHTML(modalContent.content)}</span>
                    </div>
                    <div className="mt-6 w-full flex justify-center">
                        <Button onClick={close} className="h-full px-6 py-2 bg-[#5932EA] rounded-2xl text-white text-base font-bold">
                            {t('Confirm')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default index;
