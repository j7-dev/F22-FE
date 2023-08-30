import React, { useRef } from 'react';
import { Carousel } from 'antd';
import { FaCircleChevronRight, FaCircleChevronLeft } from 'react-icons/fa6';
import fakeBannerImg from '@/assets/images/fakeBannerImg.webp';

const Banner: React.FC = () => {
    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '430px',
        color: '#fff',
        lineHeight: '430px',
        textAlign: 'center',
        background: '#364d79',
        width: '100%',
        objectFit: 'cover',
    };

    const carouselRef = useRef<any>(null);

    const handleNext = () => {
        // console.log('carouselRef', carouselRef.current);
        carouselRef.current.next(); // 呼叫 Carousel 的 next() 方法
    };

    const handlePrev = () => {
        carouselRef.current.prev(); // 呼叫 Carousel 的 prev() 方法
    };

    return (
        <div className="relative">
            <Carousel ref={carouselRef} dots={false}>
                <div>
                    <img src={fakeBannerImg} alt="" style={contentStyle} />
                </div>
                <div>
                    <img src={fakeBannerImg} alt="" style={contentStyle} />
                </div>
            </Carousel>

            <FaCircleChevronLeft
                style={{ fontSize: '48px', color: '#fff' }}
                className="absolute top-2/4 left-[10%] translate-y-[-50%] px-0 border-0 py-0 bg-transparent cursor-pointer"
                onClick={handlePrev}
            />
            <FaCircleChevronRight
                style={{ fontSize: '48px', color: '#fff' }}
                className="absolute top-2/4 right-[10%] translate-y-[-50%] px-0 border-0 py-0 bg-transparent cursor-pointer"
                onClick={handleNext}
            />
        </div>
    );
};

export default Banner;
