import React from 'react'; // { useState, useRef, useEffect }
import iconSpeaker from '@/assets/images/Icon_Speaker.svg';
import { nanoid } from 'nanoid';
import Marquee from 'react-fast-marquee';

type marqueeTextProps = {
    marqueeText?: string[];
    speed?: number;
};
const index: React.FC<marqueeTextProps> = ({ marqueeText = [''], speed = 40 }) => {
    return (
        <div className="newsMarquee relative flex items-center gap-2.5 overflow-hidden w-full sm:px-0 px-4">
            <img src={iconSpeaker} className="w-5 sm:w-auto" />
            <Marquee autoFill={true} speed={speed} pauseOnHover={true} className="font-bold text-xs sm:text-base text-black">
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
