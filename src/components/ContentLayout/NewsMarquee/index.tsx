import React, { useEffect } from 'react'; // { useState, useRef, useEffect }
import iconSpeaker from '@/assets/images/Icon_Speaker.svg';
import { nanoid } from 'nanoid';

type marqueeTextProps = {
    marqueeText?: string[];
    speed?: number;
};
const index: React.FC<marqueeTextProps> = ({ marqueeText = [''], speed = 30 }) => {
    useEffect(() => {
        const root = document.documentElement;
        const marqueeElementsDisplayed = marqueeText.length * 2;
        // console.log('marqueeElementsDisplayed', marqueeElementsDisplayed);
        const marqueeContent = document.querySelector('.marquee-content');
        if (marqueeContent !== null) {
            root.style.setProperty('--marquee-elements', marqueeElementsDisplayed.toString());
            //影響速度
            root.style.setProperty('--marquee-animation-duration', (marqueeElementsDisplayed * speed).toString() + 's');
        }
        for (let i = 0; i < marqueeElementsDisplayed; i++) {
            // console.log('i', i);
            if (marqueeContent !== null) {
                marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
            }
        }
    }, []);
    console.log('speed', speed);
    return (
        <div className="newsMarquee relative flex items-center gap-2.5 overflow-hidden w-full sm:px-0 px-4">
            <img src={iconSpeaker} className="w-5 sm:w-auto" />
            <div className="marquee">
                <ul className="marquee-content sm:text-base sm:font-bold font-normal text-xs">
                    {marqueeText.map((item) => {
                        return (
                            <li key={nanoid()}>
                                <span className="mr-1">{item}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default index;
