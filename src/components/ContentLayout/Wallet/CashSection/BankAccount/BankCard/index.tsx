import React from 'react';
import { nanoid } from 'nanoid';
import { GrFormClose } from 'react-icons/gr';
import { useDelete } from '@refinedev/core';

type BankCardProps = {
    bankAccount:
        | {
              id: number;
              label: string;
              bank_name: string;
              bank_code: string;
              bank_account_number: string;
              owner_real_name: string;
          }[]
        | [];
};
const index: React.FC<BankCardProps> = ({ bankAccount }) => {
    const { mutate } = useDelete();
    const handleClick = (bankId: number) => {
        mutate({
            resource: 'bank-accounts',
            id: bankId,
        });
    };
    return (
        <>
            {bankAccount?.map((item) => {
                const bankId = item?.id;
                const labelName = item?.label;
                const bankName = item?.bank_name;
                const bankCode = item?.bank_code;
                const bankAccountNumber = item?.bank_account_number;
                const ownerRealName = item?.owner_real_name;
                // console.log('item:', item, 'index:', indexnum);
                return (
                    <div key={nanoid()} className="BankCard flex items-center justify-center w-full h-full px-4 flex-col relative">
                        {/* <div className="closeBtn absolute right-5 top-5 z-10 duration-300 opacity-0 cursor-pointer w-10 h-10 flex justify-center items-center text-2xl rounded-full bg-[#F6F7F7] hover:bg-[#e5e5e5] hover:opacity-100" onClick={() => handleClick(bankId)}>
                            <GrFormClose size={40} />
                        </div> */}
                        <div className="w-full px-8 py-8 bg-gradient-to-tl from-indigo-500 to-purple-500 rounded-lg min-h-[250px]">
                            <div className="flex w-full items-center justify-between">
                                <p className="text-xl font-semibold leading-tight text-white">{`${bankName} ${bankCode}`}</p>
                            </div>
                            <p className="text-base font-medium leading-3 text-white mt-16">{ownerRealName}</p>
                            <p className="text-2xl font-semibold leading-4 text-white mt-4">{bankAccountNumber}</p>
                        </div>
                        <span className="text-xl font-bold text-[#2B3240] flex items-center gap-1">
                            {labelName}
                            <GrFormClose size={20} onClick={() => handleClick(bankId)} className="closeBtn duration-300 cursor-pointer rounded-full bg-red-300 hover:bg-red-600" />
                        </span>
                    </div>
                );
            })}
        </>
    );
};

export default index;
