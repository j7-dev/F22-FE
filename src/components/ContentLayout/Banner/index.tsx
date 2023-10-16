import React from 'react';
import { nanoid } from 'nanoid';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import banner_A from '@/assets/images/banner_A.jpg';
import banner_B from '@/assets/images/banner_B.jpg';
import { useShowPc } from '@/hooks/useShowPc';

const Banner: React.FC<{ bannerData?: string[] }> = ({ bannerData = [banner_A, banner_B] }) => {
    const isPc = useShowPc();
    //Banner圖片陣列
    const bannerArray = bannerData;
    return (
        <div className="relative banner md:w-full px-4">
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={isPc ? 20 : 8}
                loop={true}
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper w-full h-fit"
            >
                {bannerArray.map((item) => {
                    return (
                        <SwiperSlide key={nanoid()} className="h-fit w-full sm:w-full sm:aspect-[1260/360] aspect-[342/180] ">
                            <img src={item} alt="" className="sm:h-fit rounded-2xl w-full h-full object-cover sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] shadow-[0_4px_4px_0px_#A370ED33]" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default Banner;
