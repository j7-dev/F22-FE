import React from 'react';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import Tabs from './Tabs';
import { providerData } from '@/utils/providerData';
import { TGameProvider, TGameCategory } from '@/types/games';
import { gameCategories, mappingIncludesProvider } from '@/utils/GameCategory';

export const slogGamesResource = providerData.filter((item) => item.gameCategories.includes('slot'));

const index: React.FC = () => {
    const { t } = useTranslation();

    //取得七大遊戲分類，並根據gameCategories判斷遊戲廠商屬於哪一個分類
    const gameCategoriesData = [...gameCategories].map((item) => {
        return { ...item, providerData: mappingIncludesProvider({ providerData: providerData, category: item }) };
    }) as TGameCategory[];

    //渲染7大分類內頁面
    const CategorySwiper = ({ provider = [], categoryName }: { provider?: TGameProvider[]; categoryName: string }) => {
        return (
            <>
                <div className="grid grid-cols-11 gap-4 py-9">
                    <div className="col-span-1 flex justify-center">
                        <img src={Icon_Main_Title} alt="" className="" />
                    </div>
                    <span className="col-span-1 font-bold text-3xl text-[#9680EA] -ml-3">
                        {t(categoryName)}
                        {/* <span className="text-black">GAMES</span> */}
                    </span>
                </div>
                <Tabs provider={provider} />
            </>
        );
    };
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
                                <CategorySwiper key={nanoid()} provider={item.providerData} categoryName={item.label} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
};

export default index;
