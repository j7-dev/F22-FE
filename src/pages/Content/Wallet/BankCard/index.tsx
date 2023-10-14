import React from 'react';
import { nanoid } from 'nanoid';

const index: React.FC = () => {
    return (
        <div key={nanoid()} className="BankCard flex items-center justify-center w-full h-full flex-col relative">
            <div className="relative w-full px-8 py-8 bg-gradient-to-tl from-indigo-500 to-purple-500 rounded-[30px] min-h-[180px]">
                <div className="flex flex-col h-full w-full items-start justify-between">
                    <div className="text-xl font-semibold leading-tight text-white flex flex-col">
                        {`123456`}
                        <span className="text-sm font-medium leading-3 text-white opacity-50">123456</span>
                    </div>
                    <p className="text-sm font-medium text-white mt-4">12345</p>
                </div>
            </div>
        </div>
    );
};

export default index;
