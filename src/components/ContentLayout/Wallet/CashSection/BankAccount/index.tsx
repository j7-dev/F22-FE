import React from 'react';
import { useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { useGetBankAccount } from '@/hooks/useGetBankAccount';
import BankCard from './BankCard';
import { AiOutlinePlus } from 'react-icons/ai';
import { creatBankPopAtom } from './CreatBankPop';

const index: React.FC = () => {
    const { t } = useTranslation();
    const setCreatBankPop = useSetAtom(creatBankPopAtom);
    const { data, isLoading } = useGetBankAccount();
    if (isLoading) return <div>loading...</div>;
    // console.log(data);
    const bankAccountdata = data?.data as [];
    // console.log('data', data);
    const handleCreatBankAccount = () => {
        setCreatBankPop(true);
    };
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="pageHeader font-bold text-[#2B3240] text-sm p-2.5">{t('Bank Account')}</div>
            <div className="bankAccountContainer grid gap-4 grid-cols-2">
                <BankCard bankAccount={bankAccountdata} />
                <div className="min-h-[250px] w-full px-4">
                    <div onClick={handleCreatBankAccount} className="cursor-pointer w-full h-full flex flex-col justify-center items-center rounded-lg border border-solid border-slate-300 bg-gradient-to-tl duration-300 from-indigo-100 to-purple-100 text-[#2B3240] hover:text-white hover:from-indigo-500 hover:to-purple-500">
                        <AiOutlinePlus />
                        <span className="text-sm font-bold ">{t('Add Bank Account')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
