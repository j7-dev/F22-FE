import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { Spin, Button } from 'antd';
import { useGetEVOTableList } from '@/hooks/gameProvider/evolution/useGetEVOTableList';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';
import Banner from '@/components/ContentLayout/Banner';
import { casinoCategory } from '@/utils/GameCategory/casinoCategory';
import GameList from '@/components/ContentLayout/GameList';
import NewsMarquee from '@/components/ContentLayout/NewsMarquee';
import SearchBar from '@/components/ContentLayout/SearchBar';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import { useGetMarketingContent } from '@/hooks/useGetMarketingContent';
import slot_favorite_icon from '@/assets/images/game_provider/slot_favorite_icon.svg';
import allImg from '@/assets/images/casino/Icon_CasinoFilter_All.svg';
import { TGame } from '@/types/games';
import { tokenData } from '@/utils/providerData/Token';
import { useGameFilter } from '@/hooks/gameProvider/useGameFilter';
//由五大分類而來的分類表
const fxnCasinoCategory = [
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
    ...casinoCategory,
];
//Casino遊戲商
const casinoProvider = [
    {
        name: 'Evolution',
        provider: 'evolution',
    },
    {
        name: 'Pragmatic Play',
        provider: 'pragmaticPlay',
    },
    {
        name: 'Other',
        provider: 'other',
    },
];

const index: React.FC = () => {
    const { t } = useTranslation();
    //跑馬燈
    const { data } = useGetMarketingContent({ position: 'header' });
    const marqueeText = data?.map((item) => {
        return item?.content;
    });
    //篩選條件
    const [chosenCategory, setChosenCategory] = useState('all');
    const [chosenProvider, setChosenProvider] = useState('evolution');
    const [isDisabled, setIsDisabled] = useState(false);
    const { filterGame: filterGameFn } = useGameFilter();
    //遊戲列表State
    const [gameDataList, setGameDataList] = useState<TGame[]>([]);

    //取得遊戲列表
    const { data: evoData, isFetching: evoIsFetching } = useGetEVOTableList();
    const { data: ppData, isFetching: ppIsFetching } = useGetPPTableList();
    const ppGameData = ppData.filter((item) => item.gameCategory === 'casino');
    const tokenGamesData = tokenData.filter((item) => item.gameCategory === 'casino');

    const isFetching = evoIsFetching || ppIsFetching;
    const rawGameList = useMemo(() => [...evoData, ...ppGameData, ...tokenGamesData] || [], [isFetching]);
    // console.log('⭐  rawGameList:', rawGameList);

    //每當遊戲商改變時，重新渲染遊戲列表
    const handleProviderChange = (provider: string) => () => {
        setChosenProvider(provider);
        setChosenCategory('all');
        //如果為token遊戲商，則直接渲染token遊戲列表，並且禁用第二層分類
        if (provider === 'other') {
            setIsDisabled(true);
            setGameDataList(tokenGamesData);
            return;
        }

        if (isDisabled) setIsDisabled(false);
        const filterGameList = filterGameFn({ provider: provider, category: chosenCategory, gameData: rawGameList as TGame[] });
        setGameDataList(filterGameList);
    };
    const handleCategoryChange = (category: string) => () => {
        setChosenCategory(category);
        const filterGameList = filterGameFn({ provider: chosenProvider, category: category, gameData: rawGameList as TGame[] });
        setGameDataList(filterGameList);
    };

    // const handleSwitchTab = (key: string) => () => {
    //     setChosenCategory(key);
    //     if (key === 'all') return setGameDataList(rawGameList as []);
    //     //如果為Favorite遊戲渲染isFavorite Data
    //     if (key === 'favorite') return setGameDataList(rawGameList.filter((item) => isFavorite(item as TGame)) as []);
    //     //如果為其他分類，則渲染該分類的Data
    //     setGameDataList(rawGameList.filter((item) => item.casinoCategory === key) as []);
    // };

    //搜尋遊戲函式，傳入SearchBar組件
    const filterGame = (searchGame: string) => {
        setChosenCategory(searchGame);
        if (searchGame === 'all') return setGameDataList(rawGameList as []);
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
                        <span className="col-span-1 font-bold text-3xl text-[#9680EA] -ml-3 flex items-center">{t('CASINO')}</span>
                        <div className="col-start-7 col-span-4 relative flex">
                            <SearchBar onFilter={filterGame} />
                        </div>
                    </div>
                    <div className="filterSection flex flex-col gap-2 pb-3 md:pt-4">
                        <div className="casinoProviderSection px-4 overflow-x-scroll md:grid md:grid-cols-11 md:px-0 md:overflow-hidden">
                            <div className="w-fit flex flex-nowrap col-span-3 grid-cols-7 gap-2 md:w-full md:grid md:col-start-2 md:col-span-9 ">
                                {casinoProvider.map((item) => {
                                    return (
                                        <Button key={nanoid()} onClick={handleProviderChange(item.provider)} type="primary" className={`${chosenProvider == item.provider ? 'font-bold bg-[#5932EA]' : 'font-medium bg-[#C6BBEE]'} h-fit basis-full flex-1 col-span-1 cursor-pointer rounded-2xl w-28 md:w-full border-0`}>
                                            <div className="px-4 py-3 flex justify-center items-center md:gap-2 gap-1">
                                                <span className="md:text-base text-xs md:leading-9 leading-9 text-white">{t(item.name)}</span>
                                            </div>
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="casinoCategorySection px-4 overflow-x-scroll md:grid md:grid-cols-11 md:px-0 md:overflow-hidden">
                            <div className="w-fit flex flex-nowrap col-span-3 grid-cols-7 gap-2 md:w-full md:grid md:col-start-2 md:col-span-9 ">
                                {fxnCasinoCategory.map((item) => {
                                    return (
                                        <Button disabled={isDisabled} key={nanoid()} onClick={handleCategoryChange(item.Category)} className={`${isDisabled ? 'bg-[#BDBDBD]' : chosenCategory == item.Category ? 'font-bold bg-[#5932EA]' : 'font-medium bg-[#C6BBEE]'} h-fit basis-full flex-1 col-span-1 cursor-pointer rounded-2xl w-28 md:w-full border-0`}>
                                            <div className="px-4 py-3 flex items-center md:gap-2 gap-1">
                                                <img src={item.img} className="md:w-9 w-6 h-full object-center object-contain" alt="" />
                                                <span className="md:text-base text-xs text-white">{t(item.name)}</span>
                                            </div>
                                        </Button>
                                    );
                                })}
                            </div>
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
