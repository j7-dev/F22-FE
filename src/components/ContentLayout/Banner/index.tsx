import React, { useRef } from 'react';
import { Carousel } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaCircleChevronRight, FaCircleChevronLeft } from 'react-icons/fa6';
import newBanner1 from '@/assets/images/newBanner1.png';
import newBanner2 from '@/assets/images/newBanner2.png';
import newBanner3 from '@/assets/images/newBanner3.png';

const Banner: React.FC = () => {
    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '100%',
        color: '#fff',
        // lineHeight: '430px',
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
        <div className="relative banner md:w-full">
            <Carousel ref={carouselRef} dots={false}>
                <div className="LazyLoadImage">
                    <LazyLoadImage src={newBanner1} alt="" style={contentStyle} />
                </div>
                <div className="LazyLoadImage">
                    <LazyLoadImage src={newBanner2} alt="" style={contentStyle} />
                </div>
                <div className="LazyLoadImage">
                    <LazyLoadImage src={newBanner3} alt="" style={contentStyle} />
                </div>
            </Carousel>

            <FaCircleChevronLeft style={{ fontSize: '48px', color: '#fff' }} className="absolute top-2/4 left-[10%] translate-y-[-50%] px-0 border-0 py-0 bg-transparent cursor-pointer" onClick={handlePrev} />
            <FaCircleChevronRight style={{ fontSize: '48px', color: '#fff' }} className="absolute top-2/4 right-[10%] translate-y-[-50%] px-0 border-0 py-0 bg-transparent cursor-pointer" onClick={handleNext} />
        </div>
    );
};

export default Banner;
