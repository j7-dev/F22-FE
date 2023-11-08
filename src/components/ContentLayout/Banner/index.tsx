import React from 'react';
import { nanoid } from 'nanoid';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useShowPc } from '@/hooks/useShowPc';
import banner_A from '@/assets/images/newBanner/banner_A.jpg';
import banner_B from '@/assets/images/newBanner/banner_B.jpg';
import banner_A_mobile from '@/assets/images/newBanner/banner_A_mobile.jpg';
import banner_B_mobile from '@/assets/images/newBanner/banner_B_mobile.jpg';

const Banner: React.FC<{ bannerData?: { img: string; img_mobile?: string }[] }> = ({
    bannerData = [
        {
            img: banner_A,
            img_mobile: banner_A_mobile,
        },
        {
            img: banner_B,
            img_mobile: banner_B_mobile,
        },
    ],
}) => {
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
                    // 判斷是否為PC，是的話就用item.img，不是的話就用item.img_mobile，如果沒有item.img_mobile就用item.img
                    const imgSrc = isPc ? item?.img : item?.img_mobile ? item?.img_mobile : item?.img;
                    return (
                        <SwiperSlide key={nanoid()} className="h-fit w-full md:w-full md:max-h-[360px] md:aspect-auto aspect-[342/180] ">
                            <img src={imgSrc} alt="" className="md:h-fit rounded-2xl w-full h-full object-cover md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] shadow-[0_4px_4px_0px_#A370ED33]" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default Banner;
