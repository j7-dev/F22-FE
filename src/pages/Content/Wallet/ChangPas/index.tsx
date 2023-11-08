import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, Form, Modal } from 'antd';
import { useModal } from '@refinedev/antd';
import { useChangePassword } from '@/hooks/resources/useChangePassword';
import ChangPasIcon from '@/assets/images/newMyPage/ChangPas.svg';
import passwordIcon from '@/assets/images/loginFrom/password.svg';
import { AiFillCloseCircle } from 'react-icons/ai';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { modalProps, show } = useModal();
    const { changePassword, isLoading } = useChangePassword();
    //自定義驗證規則=>確認密碼
    const validateFunction = (_: object, value: string) => {
        if (value !== form.getFieldValue('newPas')) {
            return Promise.reject('The two passwords that you entered do not match!');
        }
        return Promise.resolve();
    };

    return (
        <div className="bg-white h-full w-full py-6 px-4 gap-3 userBank flex flex-col rounded-2xl md:py-[42px] md:px-[32px] md:gap-4 shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
            <span className="text-black font-bold md:text-2xl text-sm">{t('Change Password')}</span>
            <div className="ifShowForm flex items-center justify-center w-full flex-col relative md:h-[200px] md:aspect-[240/200] h-[90px] aspect-[130-90]">
                <div className="flex flex-col h-full items-center justify-between">
                    <img src={ChangPasIcon} className="aspect-square md:mt-6 md:w-[140px] w-[70px]" alt="" />
                    {/* TODO 確認一下這邊的文字大小跟Read More 按鈕是否一樣大 */}
                    <button onClick={() => show()} className="cursor-pointer font-bold border-0 px-3 py-1.5 rounded-xl text-xs bg-[#5932EA] text-white">
                        {t('Change')}
                    </button>
                </div>
                <Modal
                    {...modalProps}
                    centered
                    maskClosable={true}
                    closeIcon={<AiFillCloseCircle color="#FFFFFF" size={30} />}
                    footer={null}
                    className="formWrap md:w-[600px] md:h-auto w-screen max-w-none"
                    classNames={{
                        mask: 'md:bg-[#000000d9] blur-sm ',
                        content: 'bg-gradient-to-b from-[#BAA8FF] to-[#5932EA] shadow-[0px_0px_10px_4px_#D4C9FF33] md:px-[100px] py-[50px] px-[45px]',
                    }}
                >
                    <div className="loginFromSection text-center flex flex-col gap-8 w-full">
                        <span className="text-[30px] text-center font-semibold text-white">{t('Change Password')}</span>
                        <Form form={form} onFinish={(values) => changePassword(values)} className="h-full">
                            <div className="flex flex-col justify-between">
                                <Form.Item name="currentPassword" rules={[{ required: true, message: 'Please input your Password' }]}>
                                    <Input.Password prefix={<img src={passwordIcon} />} placeholder="Current Password" />
                                </Form.Item>
                                <Form.Item name="newPas">
                                    <Input.Password prefix={<img src={passwordIcon} />} placeholder="New Password" />
                                </Form.Item>
                                <Form.Item name="checkPas" rules={[{ required: true, message: 'Please input your Password' }, { validator: validateFunction }]}>
                                    <Input.Password prefix={<img src={passwordIcon} />} placeholder="Check Password" />
                                </Form.Item>
                                <Form.Item noStyle>
                                    <Button loading={isLoading} className="border-0 mt-6 flex w-[200px] m-auto h-10 items-center rounded-2xl text-xl font-semibold bg-white text-[#5932EA] justify-center shadow-[2px_4px_4px_0px_#4F2AEA2B]" htmlType="submit">
                                        {t('Change Password')}
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default index;
