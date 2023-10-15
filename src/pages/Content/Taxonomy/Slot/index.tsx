import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { Spin } from 'antd';
import { providerData } from '@/utils/providerData';
import { useGetMarketingContent } from '@/hooks/useGetMarketingContent';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';
import NewsMarquee from '@/components/ContentLayout/NewsMarquee';
import Banner from '@/components/ContentLayout/Banner';
import GameList from '@/components/ContentLayout/GameList';
import SearchBar from '@/components/ContentLayout/SearchBar';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import slot_all_icon from '@/assets/images/game_provider/slot_all_icon.svg';
import slot_favorite_icon from '@/assets/images/game_provider/slot_favorite_icon.svg';

//由遊戲廠商而來的分類表
const slotProviderResource = providerData.filter((item) => item.gameCategories.includes('slot'));
const fxnSlotProvider = [
    {
        label: 'Favorite',
        value: 'favorite',
        providerData: {
            providerSmallIcon: slot_favorite_icon,
        },
    },
    {
        label: 'All',
        value: 'all',
        providerData: {
            providerSmallIcon: slot_all_icon,
        },
    },
    ...slotProviderResource,
];
const index: React.FC = () => {
    const { t } = useTranslation();
    const [slotGameProvider, setSlotGameProvider] = useState('all');
    //遊戲列表
    const [gameDataList, setGameDataList] = useState([]);

    //跑馬燈
    const { data } = useGetMarketingContent({ position: 'header' });
    const marqueeText = data?.map((item) => {
        return item?.content;
    });

    //取得遊戲列表
    const { data: ppData, isFetching } = useGetPPTableList();
    const allGameList = [...ppData];
    const allLoading = isFetching;

    //切換分類
    const handleSwitchTab = (key: string) => () => {
        setSlotGameProvider(key);
        if (key === 'all') return setGameDataList(allGameList as []);
        setGameDataList(allGameList.filter((item) => item.casinoCategory === key) as []);
    };
    //搜尋遊戲
    const filterGame = (searchGame: string) => {
        if (searchGame === '') return setGameDataList(allGameList as []);
        setSlotGameProvider(searchGame);
        setGameDataList((allGameList.filter((item) => item?.gameName?.includes(searchGame)) as []) || []);
    };
    //分類遊戲
    //分類遊戲條件渲染
    const ShowGames = () => {
        if (allLoading)
            return (
                <div className="text-center">
                    <Spin />
                </div>
            );
        return <GameList gameData={gameDataList} />;
    };
    //當載入完成後，將遊戲列表資料放入gameDataList
    useEffect(() => {
        setGameDataList(allGameList as []);
    }, [isFetching]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="slotPage sm:my-9 sm:gap-8 my-4 w-full flex flex-col  gap-4">
            <Banner />
            <NewsMarquee className="sm:hidden" speed={15} marqueeText={marqueeText} />
            <div className="slotSection relative sm:w-full">
                <div className="slotWrap sm:mx-4 sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl">
                    <div className="hidden slotTitle sm:grid grid-cols-11 gap-4 py-9 border-0 border-solid border-b border-[#d5d8dc] shadow-[0_4.5px_0_0_#0000000D,0_3.5px_0_0_#FFFFFF,0_1.5px_0_0_#0000001A] ">
                        <div className="col-span-1 flex justify-center">
                            <img src={Icon_Main_Title} alt="" className="" />
                        </div>
                        <span className="col-span-1 font-bold text-3xl text-[#9680EA] -ml-3">{t('SLOT')}</span>
                        <div className="col-start-7 col-span-4 relative flex">
                            <SearchBar onFilter={filterGame} />
                        </div>
                    </div>

                    <div className="providerSection grid-cols-3 pb-3 px-4  overflow-x-scroll sm:grid sm:grid-cols-11 sm:px-0 sm:py-2 sm:pt-4 sm:overflow-hidden">
                        <div className="w-fit flex flex-nowrap col-span-3 grid-cols-5 gap-2 sm:w-full sm:grid sm:col-start-2 sm:col-span-9 ">
                            {fxnSlotProvider.map((item) => {
                                return (
                                    <div key={nanoid()} onClick={handleSwitchTab(item.value)} className={`${slotGameProvider === item.value ? 'bg-[#5932EA]' : 'bg-[#9680EA]'} px-4 py-2 col-span-1 cursor-pointer rounded-2xl overflow-hidden flex items-center gap-2`}>
                                        <img src={item?.providerData?.providerSmallIcon} className="w-9 h-full object-center object-contain" alt="" />
                                        <span className="whitespace-nowrap font-medium text-xs text-white sm:text-base sm:whitespace-normal ">{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <ShowGames />
                </div>
            </div>
        </div>
    );
};

export default index;
