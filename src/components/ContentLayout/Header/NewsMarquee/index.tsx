import React, { useEffect } from 'react'; // { useState, useRef, useEffect }
import iconSpeaker from '@/assets/images/Icon_Speaker.svg';
import { nanoid } from 'nanoid';

// App
const index: React.FC = () => {
    const marqueeContentData = ['Lorem ipsum dolor sit amet consectetur. Auctor rhoncus non pharetra sollicitudin.Lorem ipsum dolor sit amet consectetur. Auctor rhoncus non pharetra sollicitudin.'];
    useEffect(() => {
        const root = document.documentElement;
        const marqueeElementsDisplayed = marqueeContentData.length * 2;
        // console.log('marqueeElementsDisplayed', marqueeElementsDisplayed);
        const marqueeContent = document.querySelector('.marquee-content');
        if (marqueeContent !== null) {
            root.style.setProperty('--marquee-elements', marqueeElementsDisplayed.toString());
            //影響速度
            root.style.setProperty('--marquee-animation-duration', (marqueeElementsDisplayed * 30).toString() + 's');
        }
        for (let i = 0; i < marqueeElementsDisplayed; i++) {
            // console.log('i', i);
            if (marqueeContent !== null) {
                marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
            }
        }
    }, []);

    return (
        <div className="newsMarquee relative flex items-center gap-2.5 overflow-hidden w-full">
            <img src={iconSpeaker} />
            <div className="marquee">
                <ul className="marquee-content text-base font-bold">
                    {marqueeContentData.map((item) => {
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
