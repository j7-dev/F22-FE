import React, { useRef } from 'react';
import { Carousel } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaCircleChevronRight, FaCircleChevronLeft } from 'react-icons/fa6';
import Banner1 from '@/assets/images/Banner1.png';
import Banner2 from '@/assets/images/Banner2.png';

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
                <div className="LazyLoadImage">
                    <LazyLoadImage src={Banner1} alt="" style={contentStyle} />
                    {/* //TODO 需要確認這邊build 到線上能不能正常顯示*/}
                    {/* <img src={Banner1} alt="" style={contentStyle} /> */}
                </div>
                <div>
                    {<LazyLoadImage src={Banner2} alt="" style={contentStyle} />}
                    {/* <img src={Banner2} alt="" style={contentStyle} /> */}
                </div>
            </Carousel>

            <FaCircleChevronLeft style={{ fontSize: '48px', color: '#fff' }} className="absolute top-2/4 left-[10%] translate-y-[-50%] px-0 border-0 py-0 bg-transparent cursor-pointer" onClick={handlePrev} />
            <FaCircleChevronRight style={{ fontSize: '48px', color: '#fff' }} className="absolute top-2/4 right-[10%] translate-y-[-50%] px-0 border-0 py-0 bg-transparent cursor-pointer" onClick={handleNext} />
        </div>
    );
};

export default Banner;
