import React from 'react'; // { useState, useRef, useEffect }
import iconSpeaker from '@/assets/images/Icon_Speaker.svg';
import { nanoid } from 'nanoid';
import Marquee from 'react-fast-marquee';

type marqueeTextProps = {
    marqueeText?: string[];
    speed?: number;
    className?: string;
};
const index: React.FC<marqueeTextProps> = ({ marqueeText = [''], speed = 40, className }) => {
    return (
        <div className={`${className} newsMarquee relative flex items-center gap-2.5 overflow-hidden w-full md:px-0 px-4`}>
            <img src={iconSpeaker} className="w-5 md:w-auto" />
            <Marquee autoFill={false} speed={speed} pauseOnHover={true} className="font-bold text-xs md:text-base text-black">
                {marqueeText?.map((item) => {
                    return (
                        <div key={nanoid()} className="flex items-center pr-[5px]">
                            {item}
                        </div>
                    );
                })}
            </Marquee>
        </div>
    );
};

export default index;
