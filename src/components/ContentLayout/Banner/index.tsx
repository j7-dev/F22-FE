import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { nanoid } from 'nanoid';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import newBanner1 from '@/assets/images/newBanner1.png';
import newBanner2 from '@/assets/images/newBanner2.png';
import newBanner3 from '@/assets/images/newBanner3.png';

const Banner: React.FC = () => {
    //Banner圖片陣列
    const bannerArray = [newBanner1, newBanner2, newBanner3];
    return (
        <div className="relative banner md:w-full mt-10 mb-4 ">
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
