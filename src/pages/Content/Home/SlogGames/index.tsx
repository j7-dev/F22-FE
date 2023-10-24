import React from 'react';
import { nanoid } from 'nanoid';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { providerData } from '@/utils/providerData';
import { TGameCategory } from '@/types/games';
import { gameCategories, mappingIncludesProvider } from '@/utils/GameCategory';
import CategorySection from './CategorySection';

// export const slogGamesResource = providerData.filter((item) => item.gameCategories.includes('slot'));
const index: React.FC = () => {
    //取得七大遊戲分類，並根據gameCategories判斷遊戲廠商屬於哪一個分類
    const gameCategoriesData = [...gameCategories].map((item) => {
        return { ...item, providerData: mappingIncludesProvider({ providerData: providerData, category: item }) };
    }) as TGameCategory[];

    return (
        <div className="relative PopularGames md:w-full">
            <div className="mx-4 rounded-2xl shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
                <Swiper
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="gameProvidersSwiper w-full h-fit"
                >
                    {/* 只取得有 providerData 的資料*/}
                    {gameCategoriesData
                        .filter((item) => item?.providerData?.length !== 0)
                        .map((item) => (
                            <SwiperSlide key={nanoid()} className="h-fit w-full sm:w-full sm:aspect-[1260/360] aspect-[342/180] shadow-[0_4px_4px_0px_#A370ED33]">
                                <CategorySection provider={item.providerData} categoryName={item.label} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
};

export default index;
