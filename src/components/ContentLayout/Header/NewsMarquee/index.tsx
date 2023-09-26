import React from 'react';
import iconSpeaker from '@/assets/images/Icon_Speaker.svg';

const index: React.FC = () => {
    return (
        <div className="NewsMarquee flex items-center gap-2.5">
            <img src={iconSpeaker} />
            <span className="">Lorem ipsum dolor sit amet consectetur. Auctor rhoncus non pharetra sollicitudin.</span>
        </div>
    );
};

export default index;
