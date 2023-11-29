import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { Spin, Button } from 'antd';
import { useGetEVOTableList } from '@/hooks/gameProvider/evolution/useGetEVOTableList';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';
import { useGameFilter } from '@/hooks/gameProvider/useGameFilter';
import { useGetMarketingContent } from '@/hooks/useGetMarketingContent';
import { useShowPc } from '@/hooks/useShowPc';
import { casinoCategory } from '@/utils/GameCategory/casinoCategory';
import { tokenData } from '@/utils/providerData/Token';
import { TGame } from '@/types/games';
import Banner from '@/components/ContentLayout/Banner';
import GameList from '@/components/ContentLayout/GameList';
import NewsMarquee from '@/components/ContentLayout/NewsMarquee';
import SearchBar from '@/components/ContentLayout/SearchBar';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import slot_favorite_icon from '@/assets/images/game_provider/slot_favorite_icon.svg';
import slot_favorite_icon2 from '@/assets/images/game_provider/slot_favorite_icon2.svg';
import allImg from '@/assets/images/casino/Icon_CasinoFilter_All.svg';
import allImg2 from '@/assets/images/casino/Icon_CasinoFilter_All2.svg';

//TODO 有空再把這邊做優化整理，太長了

//由五大分類而來的分類表
const fxnCasinoCategory = [
    {
        img: allImg,
        mbImg: allImg2,
        name: 'All',
        Category: 'all',
    },
    {
        img: slot_favorite_icon,
        mbImg: slot_favorite_icon2,
        name: 'Favorite',
        Category: 'favorite',
    },
    ...casinoCategory,
];
//Casino遊戲商
const casinoProvider = [
    {
        name: 'All',
        provider: 'all',
    },
    {
        name: 'Evolution',
        provider: 'evolution',
    },
    {
        name: 'PP',
        provider: 'pragmaticPlay',
    },
    {
        name: 'Other',
        provider: 'other',
    },
];

const index: React.FC = () => {
    const showPc = useShowPc();
    const { t } = useTranslation();
    //跑馬燈
    const { data } = useGetMarketingContent({ position: 'header' });
    const marqueeText = data?.map((item) => {
        return item?.content;
    });
    //篩選條件
    const [chosenCategory, setChosenCategory] = useState('all');
    const [chosenProvider, setChosenProvider] = useState('all');
    const [isDisabled, setIsDisabled] = useState(false);
    const { filterGame: filterGameFn } = useGameFilter();
    //遊戲列表State
    const [gameDataList, setGameDataList] = useState<TGame[]>([]);

    //取得遊戲列表
    const { data: evoData, isFetching: evoIsFetching } = useGetEVOTableList();
    // console.log('🚀 ~ evoData:', evoData);
    const { data: ppData, isFetching: ppIsFetching } = useGetPPTableList();
    const ppGameData = ppData
        .filter((item) => item.gameCategory === 'casino')
        //只篩選出gameName 包含 Lobby字眼的遊戲
        .filter((item) => item.gameName?.includes('Lobby'));

    // console.log('🚀 ~ ppGameData:', ppGameData);
    const tokenGamesData = tokenData.filter((item) => item.gameCategory === 'casino');

    const isFetching = evoIsFetching || ppIsFetching;
    const rawGameList = useMemo(() => [...evoData, ...ppGameData, ...tokenGamesData] || [], [isFetching]);
    // console.log('⭐  rawGameList:', rawGameList);

    //每當遊戲商改變時，重新渲染遊戲列表
    const handleProviderChange = (provider: string) => () => {
        setChosenProvider(provider);
        setChosenCategory('all');
        //如果為all，則直接渲染所有遊戲列表
        if (provider === 'all') {
            setIsDisabled(false);
            setGameDataList(rawGameList as TGame[]);
            return;
        }
        //如果為token遊戲商，則直接渲染token遊戲列表，並且禁用第二層分類
        if (provider === 'other') {
            setIsDisabled(true);
            setGameDataList(tokenGamesData);
            return;
        }

        //如果為其他遊戲商，則直接渲染其他遊戲商遊戲列表，並且啟用第二層分類
        if (isDisabled) setIsDisabled(false);
        const filterGameList = filterGameFn({ provider: provider, category: chosenCategory, gameData: rawGameList as TGame[] });
        setGameDataList(filterGameList);
    };
    const handleCategoryChange = (category: string) => () => {
        setChosenCategory(category);
        const filterGameList = filterGameFn({ provider: chosenProvider, category: category, gameData: rawGameList as TGame[] });
        setGameDataList(filterGameList);
    };

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
        <div className="casinoPage md:my-9 md:gap-8 my-4 w-full flex flex-col gap-4">
            <Banner />
            <NewsMarquee className="md:hidden" speed={15} marqueeText={marqueeText} />
            <div className="casinoSection relative md:w-full">
                <div className="md:mx-4 md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl md:py-4">
                    <div className="slotTitle md:grid grid-cols-11 gap-4 border-0 border-solid border-b border-[#d5d8dc] md:shadow-[0_4.5px_0_0_#0000000D,0_3.5px_0_0_#FFFFFF,0_1.5px_0_0_#0000001A] md:pt-9">
                        <div className="hidden col-span-1 md:flex justify-center">
                            <img src={Icon_Main_Title} alt="" className="" />
                        </div>
                        <span className="hidden whitespace-nowrap col-span-1 font-bold text-3xl text-[#9680EA] md:flex items-center">{t('CASINO')}</span>
                        <div className="hidden col-start-7 col-span-4 relative md:flex">
                            <SearchBar onFilter={filterGame} />
                        </div>
                        <div className="filterProviderBar col-start-2 col-span-9 grid grid-cols-4 px-4 md:p-0 md:gap-2.5 md:flex ">
                            {casinoProvider.map((item) => {
                                return (
                                    <div key={nanoid()} onClick={handleProviderChange(item.provider)} className={`filterTab relative cursor-pointer p-2 text-center`}>
                                        <span className={`${chosenProvider === item.provider ? 'text-black font-bold' : 'font-normal'} text-base `}>{t(item.name)}</span>
                                        <div className={`activeBorder ${chosenProvider === item.provider ? 'h-1 rounded-full bg-[#9680EA]' : 'h-0'} absolute top-[96%] left-0 w-full h-0`}></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="filterSection flex flex-col gap-2 py-3 md:pt-4">
                        <div className="casinoCategorySection px-4 overflow-x-scroll md:grid md:grid-cols-11 md:px-0 md:overflow-hidden">
                            <div className="w-fit flex flex-nowrap col-span-3 grid-cols-7 gap-1 md:w-full md:grid md:col-start-2 md:col-span-9 ">
                                {fxnCasinoCategory.map((item) => {
                                    return (
                                        <Button disabled={isDisabled} key={nanoid()} onClick={handleCategoryChange(item.Category)} className={`${isDisabled ? 'bg-[#BDBDBD]' : chosenCategory == item.Category ? 'font-bold bg-[#5932EA] border-[#5932EA]' : 'font-medium md:bg-[#C6BBEE] border-[#9680EA]'} h-fit basis-full flex-1 col-span-1 cursor-pointer rounded-2xl md:w-full md:border-0 px-2 py-1 md:px-4 md:py-2.5`}>
                                            <div className="flex items-center md:gap-2 gap-1">
                                                <img src={showPc ? item.img : chosenCategory == item.Category ? item.img : item.mbImg} className="md:w-9 w-5 h-full object-center object-contain" alt="" />
                                                <span className={`${chosenCategory == item.Category ? 'text-white' : 'text-[#9680EA]'} md:text-white md:text-base text-xs `}>{t(item.name)}</span>
                                            </div>
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="block px-4 md:hidden">
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
