import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, Form, Modal } from 'antd';
import { useModal } from '@refinedev/antd';
import { useChangePassword } from '@/hooks/resources/useChangePassword';
import ChangPasIcon from '@/assets/images/newMyPage/ChangPas.svg';
import passwordIcon from '@/assets/images/loginFrom/password.svg';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { modalProps, show, close } = useModal();
    const { changePassword, isLoading } = useChangePassword();
    //自定義驗證規則=>確認密碼
    const validateFunction = (_: object, value: string) => {
        if (value !== form.getFieldValue('newPas')) {
            return Promise.reject('The two passwords that you entered do not match!');
        }
        return Promise.resolve();
    };

    return (
        <div className="bg-white h-full w-full py-6 px-4 gap-3 userBank flex flex-col rounded-2xl sm:py-[42px] sm:px-[32px] sm:gap-4 shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
            <span className="text-black font-bold sm:text-2xl text-sm">{t('Change Password')}</span>
            <div className="ifShowForm flex items-center justify-center w-full flex-col relative sm:h-[200px] sm:aspect-[240/200] h-[90px] aspect-[130-90]">
                <div className="flex flex-col h-full items-center justify-between">
                    <img src={ChangPasIcon} className="aspect-square sm:mt-6 sm:w-[140px] w-[70px]" alt="" />
                    {/* TODO 確認一下這邊的文字大小跟Read More 按鈕是否一樣大 */}
                    <button onClick={() => show()} className="cursor-pointer font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">
                        {t('Change')}
                    </button>
                </div>
                <Modal
                    {...modalProps}
                    title="Change Password"
                    centered
                    maskClosable={true}
                    closeIcon={false}
                    footer={
                        <div className="flex justify-between">
                            <Button onClick={() => close()} type="primary">
                                {t('Cancel')}
                            </Button>
                        </div>
                    }
                >
                    <Form form={form} onFinish={(values) => changePassword(values)} className="h-full">
                        <div className="flex flex-col justify-between">
                            <div className="formInput">
                                <Form.Item name="currentPassword">
                                    <Input addonBefore={<img src={passwordIcon} />} placeholder="Current Password" />
                                </Form.Item>
                                <Form.Item name="newPas">
                                    <Input.Password addonBefore={<img src={passwordIcon} />} placeholder="New Password" />
                                </Form.Item>
                                <Form.Item name="checkPas" rules={[{ required: true, message: 'Please input your Password' }, { validator: validateFunction }]}>
                                    <Input.Password addonBefore={<img src={passwordIcon} />} placeholder="Check Password" />
                                </Form.Item>
                            </div>
                            <Form.Item noStyle>
                                <Button loading={isLoading} className="flex justify-center items-center h-10 rounded-lg gap-x-2 font-bold bg-[#5932EA] text-white hover:opacity-80 md:px-6 mx-auto" htmlType="submit">
                                    {t('Change Password')}
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default index;
