import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Form, Button, Select } from 'antd';
import { GrFormClose } from 'react-icons/gr';
import { configAtom } from '@/components/ContentLayout/Games/Game';
import { useGetIdentity } from '@refinedev/core';

export const gamepopupIsOpenAtom = atom(false);

const index: React.FC = () => {
    const { t } = useTranslation();
    const [popupIsOpen, setPopupIsOpen] = useAtom(gamepopupIsOpenAtom);
    const gamePopupRef = useRef<HTMLDivElement>(null);
    const [form] = Form.useForm();
    //遊戲資料
    const gameconfig = useAtomValue(configAtom);
    //strapi會員資料
    const { data: identity } = useGetIdentity<{ id: number }>(); //TODO 為什麼是用identity而不是data?

    const onFinish = (values: any) => {
        //合併遊戲資料與strapi會員資料
        const formattedData = { ...values, ...gameconfig };
        console.log('formattedData', formattedData);
    };

    const handleClick = () => {
        // console.log('handleClick');
        setPopupIsOpen(false);
    };
    //TODO bug=>選了Select之後會直接關閉彈窗
    // const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    //     if (gamePopupRef.current && !gamePopupRef.current.contains(event.target as Node)) {
    //         handleClick();
    //     }
    // };
    useEffect(() => {
        if (popupIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [popupIsOpen]);

    return (
        <div
            className={`${popupIsOpen ? 'fixed' : 'hidden'} popupOverlay w-full h-full bg-[#000000d9] z-50 left-0 top-0 flex justify-center items-center`}
            // onClick={handleOverlayClick}
        >
            <div ref={gamePopupRef} className="popupContainer m-auto w-full md:w-[530px] h-[500px] bg-white rounded-3xl ">
                <div className="closeBtn absolute right-5 top-5 z-10 cursor-pointer w-10 h-10 flex justify-center items-center text-2xl rounded-md bg-[#F6F7F7] hover:bg-[#e5e5e5]" onClick={handleClick}>
                    <GrFormClose size={40} />
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center gap-10 p-8 md:p-16">
                    <div className="loginFrom text-center flex flex-col gap-2.5 w-full">
                        <span>請選擇語言與下注幣值</span>
                        {/* //TODO strapi 的 會員資料有缺  uuid/session id / session ip這三個資料來源待商榷 */}
                        <Form form={form} onFinish={onFinish}>
                            <Form.Item name="uuid" hidden={true} initialValue="unique request identifier" />
                            <Form.Item name={['player', 'id']} hidden={true} initialValue={identity?.id} />
                            <Form.Item name={['player', 'update']} hidden={true} initialValue={true} />
                            <Form.Item name={['player', 'firstName']} hidden={true} initialValue="firstName" />
                            <Form.Item name={['player', 'lastName']} hidden={true} initialValue="lastName" />
                            <Form.Item name={['player', 'country']} hidden={true} initialValue="ko" />
                            <Form.Item name={['player', 'language']}>
                                <Select
                                    showSearch
                                    placeholder={t('Please Select a language')}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    options={[
                                        { value: 'en', label: 'English' },
                                        { value: 'ko', label: '한국어' },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item name={['player', 'currency']}>
                                <Select
                                    showSearch
                                    placeholder={t('Please Select a currency value')}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    options={[
                                        { value: 'KRW', label: 'KRW' },
                                        { value: 'USD', label: 'USD' },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item name={['player', 'session', 'id']} hidden={true} initialValue="111ssss3333rrrrr45555" />
                            <Form.Item name={['player', 'session', 'ip']} hidden={true} initialValue="192.168.0.1" />
                            <Form.Item name={['player', 'group', 'action']} hidden={true} initialValue="assign" />
                            <Form.Item>
                                <Button htmlType="submit" className="flex w-full h-10 items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 justify-center">
                                    送出
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
