import React from 'react';
import UserContainer from './UserContainer';
import WalletListContainer from './WalletListContainer';

const UserSection: React.FC = () => (
    <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col p-4">
        <UserContainer />
        <hr className="border-0 border-t border-[#eeeeee4D] w-full my-5" />
        <WalletListContainer />
    </div>
);

export default UserSection;
