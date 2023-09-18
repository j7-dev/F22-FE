import React, { useState, useEffect, useRef } from 'react';
import { useAtom, atom } from 'jotai';
import { Form, Input, Button } from 'antd';
import { GrFormClose } from 'react-icons/gr';
import { useGetIdentity, useCreate } from '@refinedev/core';
// import { useCreatBankAccount } from '@/hooks/useCreatBankAccount';

export const creatBankPopAtom = atom(false);
const index: React.FC = () => {
    const { data } = useGetIdentity<{ id: number }>();
    const [creatBankPop, setCreatBankPop] = useAtom(creatBankPopAtom);
    const creatBankPopRef = useRef<HTMLDivElement>(null);
    const [form] = Form.useForm();
    const [submittable, setSubmittable] = useState(false);
    const { mutate, isLoading, isSuccess } = useCreate();
    // const { status, isLoading, execute } = useCreatBankAccount();

    //submit
    const handleLogin = (values: any) => {
        mutate({
            resource: 'bank-accounts',
            values: values,
        });
    };

    //close popup
    const handleClick = () => {
        setCreatBankPop(!creatBankPop);
        // console.log('click', creatBankPop);
    };
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (creatBankPopRef.current && !creatBankPopRef.current.contains(event.target as Node)) {
            handleClick();
        }
    };
    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
        if (isSuccess) {
            form.resetFields();
            setCreatBankPop(false);
        }
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values, isLoading]);

    return (
        <>
            <div className={`${creatBankPop ? 'fixed' : 'hidden'} popupOverlay w-full h-full bg-[#000000d9] z-50 left-0 top-0 flex justify-center items-center`} onClick={handleOverlayClick}>
                <div ref={creatBankPopRef} className="popupContainer m-auto w-full md:max-w-[530px] min-h-[500px] bg-white rounded-3xl ">
                    <div className="closeBtn absolute right-5 top-5 z-10 cursor-pointer w-10 h-10 flex justify-center items-center text-2xl rounded-md bg-[#F6F7F7] hover:bg-[#e5e5e5]" onClick={handleClick}>
                        <GrFormClose size={40} />
                    </div>
                    <div className="w-full h-full flex flex-col justify-center items-center gap-2 p-8 md:p-16">
                        <div className="creatBankFrom text-center flex flex-col gap-2.5 w-full">
                            <span>Add New Bank Account</span>
                            <Form form={form} onFinish={handleLogin} layout="vertical">
                                <Form.Item validateStatus={isLoading ? 'validating' : ''} name="label" label="Account Name" hasFeedback rules={[{ required: true, message: 'Please input Account Name' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="bank_name" label="Bank Name">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="bank_code" label="Bank Code">
                                    <Input />
                                </Form.Item>
                                <Form.Item validateStatus={isLoading ? 'validating' : ''} name="bank_account_number" label="Bank Account Number" hasFeedback rules={[{ required: true, message: 'Please input Bank Account Number' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="owner_real_name" label="Owner Real Name">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="user" hidden initialValue={data?.id} />
                                <Form.Item validateStatus="validating">
                                    <Button disabled={!submittable} className="flex w-full h-10 items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 justify-center" htmlType="submit">
                                        Send
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default index;
