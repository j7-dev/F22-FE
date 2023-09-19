import React, { useState, useEffect, useRef } from 'react';
import { useAtom, atom } from 'jotai';
import { Form, Input, Button } from 'antd';
import { GrFormClose } from 'react-icons/gr';
import { useGetIdentity, useCreate, useUpdate, useDelete } from '@refinedev/core';
// import { useCreatBankAccount } from '@/hooks/useCreatBankAccount';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type updateBankPopProps = {
    id: number;
    label: string;
    bank_name: string;
    bank_code: string;
    bank_account_number: string;
    owner_real_name: string;
};
export const creatBankPopAtom = atom(false);
export const updateBankPopAtom = atom<updateBankPopProps | null>(null);

const index: React.FC = () => {
    const { data } = useGetIdentity<{ id: number }>();
    const [creatBankPop, setCreatBankPop] = useAtom(creatBankPopAtom);
    const [updateBankPop, setUpdateBankPop] = useAtom(updateBankPopAtom);
    const creatBankPopRef = useRef<HTMLDivElement>(null);
    const [form] = Form.useForm();
    const [submittable, setSubmittable] = useState(false);

    const { mutate: createMutate, isLoading: createLoading } = useCreate();
    const { mutate: updateMutate, isLoading: updateLoading } = useUpdate();
    const { mutate: deleteMutate, isLoading: deleteLoading } = useDelete();
    const loading = createLoading || updateLoading || deleteLoading;
    //create
    const handleCreate = (values: object) => {
        createMutate(
            {
                resource: 'bank-accounts',
                values: values,
            },
            {
                onSuccess: () => {
                    form.resetFields();
                    setCreatBankPop(false);
                },
            },
        );
    };
    //update
    const haddleUpdate = (values: object) => {
        updateMutate(
            {
                resource: `bank-accounts`,
                values: values,
                id: updateBankPop?.id as number,
            },
            {
                // onSuccess: (onSuccessdata) => {
                //     console.log('data', onSuccessdata);
                // },
                onError: (error) => {
                    console.log('error', error);
                },
            },
        );
    };
    //delete
    const handleDelete = (bankId: number) => {
        deleteMutate(
            {
                resource: 'bank-accounts',
                id: bankId,
            },
            {
                onSuccess: () => {
                    setCreatBankPop(false);
                    setUpdateBankPop(null);
                },
                onError: (error) => {
                    console.log('error', error);
                },
            },
        );
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
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);

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
                            <Form form={form} onFinish={updateBankPop !== null ? haddleUpdate : handleCreate} layout="vertical">
                                <Form.Item name="label" label="Account Name" hasFeedback rules={[{ required: true, message: 'Please input Account Name' }]} initialValue={updateBankPop !== null ? updateBankPop.label : ''}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="bank_name" label="Bank Name" initialValue={updateBankPop !== null ? updateBankPop.bank_name : ''}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="bank_code" label="Bank Code" initialValue={updateBankPop !== null ? updateBankPop.bank_code : ''}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="bank_account_number" label="Bank Account Number" hasFeedback rules={[{ required: true, message: 'Please input Bank Account Number' }]} initialValue={updateBankPop !== null ? updateBankPop.bank_account_number : ''}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="owner_real_name" label="Owner Real Name" initialValue={updateBankPop !== null ? updateBankPop.owner_real_name : ''}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="user" hidden initialValue={data?.id} />
                                <Form.Item validateStatus="validating">
                                    <Button disabled={!submittable} className="flex w-full h-10 items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 justify-center" htmlType="submit">
                                        {updateBankPop !== null ? 'Update' : 'Send'} <AiOutlineLoading3Quarters className={`${loading ? 'block' : 'hidden'} animate-spin`} />
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleDelete(updateBankPop?.id as number);
                                        }}
                                        className={`${updateBankPop !== null ? 'flex' : 'hidden'} w-full h-10 items-center rounded-lg border-white gap-x-2 font-bold bg-[#F9A318] text-white hover:opacity-80  md:my-3 md:px-6 md:py-3 justify-center`}
                                    >
                                        Delete
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
