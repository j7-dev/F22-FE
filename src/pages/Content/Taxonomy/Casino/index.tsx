import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { nanoid } from 'nanoid';
import { windowWidthAtom } from '@/components/ContentLayout';
import { useGetEVOTableList } from '@/hooks/gameProvider/evolution/useGetEVOTableList';
import Banner from '@/components/ContentLayout/Banner';
import { casinoCategoryFilter, casinoCategory } from '@/utils/GameCategory/casinoCategory';
import GameList from '@/components/ContentLayout/GameList';
import NewsMarquee from '@/components/ContentLayout/NewsMarquee';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import { useGetMarketingCotent } from '@/hooks/useGetMarketingCotent';

// import { nanoid } from 'nanoid';

const index: React.FC = () => {
    const { data: evoData, isLoading: evoLoadong } = useGetEVOTableList();
    const { t } = useTranslation();
    const windowWidth = useAtomValue(windowWidthAtom);
    const [casinoGameCategory, setCasinoGameCategory] = useState('all');
    const { data } = useGetMarketingCotent({ position: 'header' });

    const marqueeText = data?.map((item) => {
        return item?.content;
    });
    // const handleGameCategory = (key: string) => {
    //     setCasinoGameCategory(key);
    // };
    const allGameList = [...evoData];
    const allLoading = evoLoadong;
    //分類遊戲
    const trnGameList = casinoGameCategory !== 'all' ? allGameList.filter((item) => casinoCategoryFilter[casinoGameCategory].some((casinoCategoryItem) => item.formProviderCategory === casinoCategoryItem)) : allGameList;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="casinoPage sm:my-9 sm:gap-8 my-4 w-full flex flex-col  gap-4">
            <Banner />
            {windowWidth <= 414 ? <NewsMarquee speed={15} marqueeText={marqueeText} /> : ''}
            <div className="slotSection relative sm:w-full">
                <div className="sm:mx-4 sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl sm:py-4">
                    {windowWidth > 414 ? (
                        <div className="slotTitle grid grid-cols-11 gap-4 py-9 border-0 border-solid border-b border-[#d5d8dc] shadow-[0_4.5px_0_0_#0000000D,0_3.5px_0_0_#FFFFFF,0_1.5px_0_0_#0000001A] ">
                            <div className="col-span-1 flex justify-center">
                                <img src={Icon_Main_Title} alt="" className="" />
                            </div>
                            <span className="col-span-1 font-bold text-3xl text-[#9680EA] -ml-3">{t('CASINO')}</span>
                        </div>
                    ) : (
                        ''
                    )}
                    <div className="casinoCategorySection grid sm:grid-cols-11 sm:px-0 sm:py-2 sm:pt-4 grid-cols-3 pb-3 px-4">
                        <div className="sm:col-start-2 sm:col-span-9 col-span-3 grid grid-cols-3 gap-2">
                            {casinoCategory.map((item) => {
                                return (
                                    <div key={nanoid()} onClick={() => setCasinoGameCategory(item.Category)} className={`${casinoGameCategory == item.Category ? 'font-bold bg-[#5932EA]' : 'font-medium bg-[#C6BBEE]'} col-span-1 sm:h-20 sm:aspect-auto  aspect-[108/50] cursor-pointer rounded-2xl overflow-hidden`}>
                                        <div className="sm:px-9 sm:py-5 sm:gap-8 gap-1 p-3 flex w-full h-full relative justify-start items-center ">
                                            <img src={item.img} className="sm:h-10 h-6 object-center object-contain" alt="" />
                                            <span className="sm:text-3xl text-xs text-white">{t(item.name)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {!allLoading ? <GameList gameData={trnGameList} /> : <div className="w-full text-center">loading...</div>}
                </div>
            </div>
        </div>
    );
};

export default index;
