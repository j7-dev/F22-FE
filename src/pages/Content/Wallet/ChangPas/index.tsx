import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, Form } from 'antd';
import { useChangePassword } from '@/hooks/resources/useChangePassword';
import ChangPasIcon from '@/assets/images/newMyPage/ChangPas.svg';
import passwordIcon from '@/assets/images/loginFrom/password.svg';

const index: React.FC = () => {
    const { t } = useTranslation();
    const sliderSectionRef = useRef<HTMLDivElement>(null);
    const [form] = Form.useForm();
    const { changePassword, isLoading } = useChangePassword();

    //是否顯示表單
    const handleClick = () => {
        if (sliderSectionRef.current) sliderSectionRef.current.style.transform = 'translateX(-50%)';
    };
    return (
        <div className="h-full w-full py-[42px] flex flex-col gap-4 rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] sm:px-[32px]">
            <span className="text-black font-bold text-2xl">{t('Change Password')}</span>
            <div className="ifShowForm w-full flex flex-nowrap overflow-x-hidden">
                <div ref={sliderSectionRef} className="sliderSection min-w-[200%] grid grid-cols-2 duration-300">
                    <div className="col-span-1 min-h-[180px] flex flex-col items-center justify-between">
                        <img src={ChangPasIcon} className="w-[120] aspect-square" alt="" />
                        <button onClick={handleClick} className="cursor-pointer font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">
                            {t('Change')}
                        </button>
                    </div>
                    <div className="col-span-1 pasFrom">
                        <Form form={form} onFinish={(values) => changePassword(values)} className="h-full">
                            <div className="flex flex-col justify-between">
                                <div className="formInput">
                                    <Form.Item name="currentPassword">
                                        <Input addonBefore={<img src={passwordIcon} />} placeholder="Current Password" />
                                    </Form.Item>
                                    <Form.Item name="newPas">
                                        <Input addonBefore={<img src={passwordIcon} />} placeholder="New Password" />
                                    </Form.Item>
                                    <Form.Item name="checkPas">
                                        <Input addonBefore={<img src={passwordIcon} />} placeholder="Check Password" />
                                    </Form.Item>
                                </div>
                                <Form.Item noStyle>
                                    <Button loading={isLoading} className="flex justify-center items-center h-10 rounded-lg gap-x-2 font-bold bg-[#5932EA] text-white hover:opacity-80 md:px-6 mx-auto" htmlType="submit">
                                        {t('Change Password')}
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
