import React from 'react';
import { useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { updateBankPopAtom, creatBankPopAtom } from '../CreatBankPop';
import { AiOutlineEdit } from 'react-icons/ai';

type BankCardProps = {
    bankAccount: {
        id: number;
        label: string;
        bank_name: string;
        bank_code: string;
        bank_account_number: string;
        owner_real_name: string;
    }[];
};
const index: React.FC<BankCardProps> = ({ bankAccount }) => {
    const setUpdateBankPop = useSetAtom(updateBankPopAtom);
    const setCreatBankPop = useSetAtom(creatBankPopAtom);

    const handleEdit = (value: any) => {
        //TODO 這邊該怎麼指定?
        setUpdateBankPop(value);
        setCreatBankPop(true);
        // console.log('value', value);
    };

    return (
        <>
            {bankAccount?.map((item) => {
                const labelName = item?.label;
                const bankName = item?.bank_name;
                const bankCode = item?.bank_code;
                const bankAccountNumber = item?.bank_account_number;
                const ownerRealName = item?.owner_real_name;
                // console.log('item:', item, 'index:', indexnum);
                return (
                    <div key={nanoid()} className="BankCard flex items-center justify-center w-full h-full px-4 flex-col relative">
                        <div className="relative w-full px-8 py-8 bg-gradient-to-tl from-indigo-500 to-purple-500 rounded-lg min-h-[250px]">
                            <div onClick={() => handleEdit(item)} className="cursor-pointer absolute inset-0 editOverlay w-full h-full duration-300 text-white opacity-0 hover:opacity-100 hover:bg-slate-600/50 flex justify-center items-center">
                                <AiOutlineEdit size={30} />
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <p className="text-xl font-semibold leading-tight text-white">{`${bankName} ${bankCode}`}</p>
                            </div>
                            <p className="text-base font-medium leading-3 text-white mt-16">{ownerRealName}</p>
                            <p className="text-2xl font-semibold leading-4 text-white mt-4">{bankAccountNumber}</p>
                        </div>
                        <span className="text-xl font-bold text-[#2B3240] flex items-center gap-1">
                            {labelName}
                            {/* <GrFormClose size={20} onClick={() => handleDelete(bankId)} className="closeBtn duration-300 cursor-pointer rounded-full bg-red-300 hover:bg-red-600" /> */}
                        </span>
                    </div>
                );
            })}
        </>
    );
};

export default index;
