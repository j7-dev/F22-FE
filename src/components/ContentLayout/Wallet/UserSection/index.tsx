import React from 'react';
import UserContainer from './UserContainer';
import WalletListContainer from './WalletListContainer';
import { useLogout } from '@refinedev/core';

const UserSection: React.FC = () => {
    const { mutate: logout } = useLogout();
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col p-4">
            <UserContainer />
            <hr className="border-0 border-t border-[#eeeeee4D] w-full my-5" />
            <WalletListContainer />
            <hr className="border-0 border-t border-[#eeeeee4D] w-full my-5" />
            <span
                className="logoutBtn whitespace-nowrap justify-center flex items-center rounded-lg border-white gap-x-2 font-bold bg-[#e5e5e5] text-black hover:opacity-80 min-h-[30px] md:my-3 md:px-6 md:py-3 cursor-pointer"
                onClick={() => {
                    logout({ redirectPath: '/' });
                }}
            >
                Log out
            </span>
        </div>
    );
};

export default UserSection;
