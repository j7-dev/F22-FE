import React from 'react';
import ComingSoonImg from '@/assets/images/ComingSoon.svg';

const index: React.FC = () => {
    return (
        <div className="w-full h-screen px-6 flex justify-center items-center">
            <img src={ComingSoonImg} className="w-[70%]" />
        </div>
    );
};

export default index;
