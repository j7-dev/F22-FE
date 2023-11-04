import React, { useState, useMemo, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import Banner from '@/components/ContentLayout/Banner';
import GameList from '@/components/ContentLayout/GameListNormal';
import NewsMarquee from '@/components/ContentLayout/NewsMarquee';
import SearchBar from '@/components/ContentLayout/SearchBar';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import { useGetMarketingContent } from '@/hooks/useGetMarketingContent';
import slot_favorite_icon from '@/assets/images/game_provider/slot_favorite_icon.svg';
import { useIsFavorite } from '@/hooks/useIsFavorite';
import allImg from '@/assets/images/casino/Icon_CasinoFilter_All.svg';
import { TGame } from '@/types/games';
import { tokenData } from '@/utils/providerData/Token';

const fxnTokenCategory = [
    {
        img: allImg,
        name: 'All',
        Category: 'all',
    },
    {
        img: slot_favorite_icon,
        name: 'Favorite',
        Category: 'favorite',
    },
];

const index: React.FC = () => {
    const { t } = useTranslation();
    const [chosenCategory, setChosenCategory] = useState('all');
    const [gameDataList, setGameDataList] = useState([]);
    //取得判斷收藏遊戲方法
    const { isFavorite } = useIsFavorite();
    //跑馬燈
    const { data } = useGetMarketingContent({ position: 'header' });
    const marqueeText = data?.map((item) => {
        return item?.content;
    });
    //取得遊戲列表
    //目前不會有Fetching跟useMemo的需求，但先留著
    const tokenGamesData = tokenData.filter((item) => item.gameCategory === 'games');
    const isFetching = false;
    const rawGameList = useMemo(() => [...tokenGamesData] || [], [isFetching]);
    //切換分類
    const handleSwitchTab = (key: string) => () => {
        setChosenCategory(key);
        if (key === 'all') return setGameDataList(rawGameList as []);
        //如果為Favorite遊戲渲染Favorite組件
        if (key === 'favorite') return setGameDataList(rawGameList.filter((item) => isFavorite(item as TGame)) as []);
        setGameDataList(rawGameList.filter((item) => item?.gtype?.includes(key)) as []);
    };
    //搜尋遊戲
    const filterGame = (searchGame: string) => {
        if (searchGame === '') return setGameDataList(rawGameList as []);
        setChosenCategory(searchGame);
        //使用.toLowerCase()將字串轉為小寫，避免大小寫問題
        setGameDataList((rawGameList.filter((item) => item?.gameName?.toLowerCase().includes(searchGame.toLowerCase())) as []) || []);
    };
    useEffect(() => {
        if (!isFetching) {
            setGameDataList(rawGameList as []);
        }
    }, [isFetching]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="casinoPage sm:my-9 sm:gap-8 my-4 w-full flex flex-col gap-4">
            <Banner />
            <NewsMarquee className="md:hidden" speed={15} marqueeText={marqueeText} />
            <div className="casinoSection relative sm:w-full">
                <div className="md:mx-4 md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl md:py-4">
                    <div className="hidden slotTitle md:grid grid-cols-11 gap-4 py-9 border-0 border-solid border-b border-[#d5d8dc] shadow-[0_4.5px_0_0_#0000000D,0_3.5px_0_0_#FFFFFF,0_1.5px_0_0_#0000001A] ">
                        <div className="col-span-1 flex justify-center">
                            <img src={Icon_Main_Title} alt="" className="" />
                        </div>
                        <span className="whitespace-nowrap col-span-1 font-bold text-3xl text-[#9680EA] -ml-3 flex items-center">{t('GAMES')}</span>
                        <div className="col-start-7 col-span-4 relative flex">
                            <SearchBar onFilter={filterGame} />
                        </div>
                    </div>
                    <div className="casinoCategorySection grid-cols-3 pb-3 px-4 overflow-x-scroll md:grid md:grid-cols-11 md:px-0 md:py-2 md:pt-4 md:overflow-hidden">
                        <div className="w-fit flex flex-nowrap col-span-3 grid-cols-7 gap-2 md:w-full md:grid md:col-start-2 md:col-span-9 ">
                            {fxnTokenCategory.map((item) => {
                                return (
                                    <div key={nanoid()} onClick={handleSwitchTab(item.Category)} className={`${chosenCategory == item.Category ? 'font-bold bg-[#5932EA]' : 'font-medium bg-[#C6BBEE]'} basis-full flex-1 col-span-1 cursor-pointer rounded-2xl w-28 md:w-full`}>
                                        <div className="px-4 py-3 flex items-center md:gap-2 gap-1">
                                            <img src={item.img} className="md:w-9 w-6 h-full object-center object-contain" alt="" />
                                            <span className="md:text-base text-xs text-white">{t(item.name)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="block px-4 sm:hidden">
                        <SearchBar onFilter={filterGame} />
                    </div>
                    <Spin spinning={isFetching}>
                        <GameList gameData={gameDataList} />
                    </Spin>
                </div>
            </div>
        </div>
    );
};

export default index;
