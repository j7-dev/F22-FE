import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { Input, Form, Button } from 'antd';
// import { useNavigate } from 'react-router-dom';
import { useLogin } from '@refinedev/core';
import { GrFormClose } from 'react-icons/gr';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logoLogin from '@/assets/images/logo.png';
import { popupIsOpenAtom } from '@/components/ContentLayout/LoginModule';

type LoginVariables = {
    email: string;
    password: string;
    redirectPath: string;
};

const Popup: React.FC = () => {
    const { mutate: login } = useLogin<LoginVariables>();
    const [form] = Form.useForm();
    // const Navigate = useNavigate();
    const popupContainerRef = useRef<HTMLDivElement>(null);
    const [popupIsOpen, setPopupIsOpen] = useAtom(popupIsOpenAtom);

    useEffect(() => {
        if (popupIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [popupIsOpen]);

    const handleClick = () => {
        setPopupIsOpen(!popupIsOpen);
    };
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (popupContainerRef.current && !popupContainerRef.current.contains(event.target as Node)) {
            handleClick();
        }
    };
    const handleLogin = (values: any) => {
        const { Email, UserPas } = values;

        login(
            { email: Email, password: UserPas, redirectPath: '/wallet' },
            {
                onSuccess: (data) => {
                    if (!data.success) {
                        // handle error
                        console.log('錯誤訊息', data.error);
                    }
                    // handle success
                    setPopupIsOpen(false);
                },
            },
        );
    };

    return (
        <div className={`${popupIsOpen ? 'fixed' : 'hidden'} popupOverlay w-full h-full bg-[#000000d9] z-50 left-0 top-0 flex justify-center items-center`} onClick={handleOverlayClick}>
            <div ref={popupContainerRef} className="popupContainer m-auto w-full md:w-[530px] h-[500px] bg-white rounded-3xl ">
                <div className="closeBtn absolute right-5 top-5 z-10 cursor-pointer w-10 h-10 flex justify-center items-center text-2xl rounded-md bg-[#F6F7F7] hover:bg-[#e5e5e5]" onClick={handleClick}>
                    <GrFormClose size={40} />
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center gap-10 p-8 md:p-16">
                    <img src={logoLogin} alt="" className="w-full" />
                    <div className="loginFrom text-center flex flex-col gap-2.5 w-full">
                        <span>Available After Login.</span>
                        <Form form={form} onFinish={handleLogin}>
                            <Form.Item name="Email">
                                <Input addonBefore={<UserOutlined />} placeholder="User ID" />
                            </Form.Item>
                            <Form.Item name="UserPas">
                                <Input addonBefore={<LockOutlined />} placeholder="User Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button className="flex w-full h-10 items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 justify-center" htmlType="submit">
                                    Sign in
                                </Button>
                            </Form.Item>
                        </Form>
                        <p className="font-bold text-sm text-[#999999]">
                            Don't have an account yet? <span className="text-black">Sign Up</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
