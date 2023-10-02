import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { nanoid } from 'nanoid';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import banner_A from '@/assets/images/banner_A.jpg';
import banner_B from '@/assets/images/banner_B.jpg';

const Banner: React.FC = () => {
    //Banner圖片陣列
    const bannerArray = [banner_A, banner_B];
    return (
        <div className="relative banner md:w-full">
            <Swiper
                loop={true}
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper mx-4 rounded-2xl shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] aspect-[1260/360]"
            >
                {bannerArray.map((item) => {
                    return (
                        <SwiperSlide key={nanoid()}>
                            <LazyLoadImage src={item} alt="" className="h-full w-full object-cover" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default Banner;
