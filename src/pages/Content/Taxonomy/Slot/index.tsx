import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { providerData } from '@/utils/providerData';
import { useGetMarketingContent } from '@/hooks/useGetMarketingContent';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';
import NewsMarquee from '@/components/ContentLayout/NewsMarquee';
import Banner from '@/components/ContentLayout/Banner';
import GameList from '@/components/ContentLayout/GameList';
import SearchBar from '@/components/ContentLayout/SearchBar';
import { useIsFavorite } from '@/hooks/useIsFavorite';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import slot_all_icon from '@/assets/images/Icon_Menu_Filled_Slot.svg';
import slot_favorite_icon from '@/assets/images/game_provider/slot_favorite_icon.svg';
import { TGame } from '@/types/games';
import { tokenData } from '@/utils/providerData/Token';

//由遊戲廠商而來的分類表
const slotProviderResource = providerData.filter((item) => item.gameCategories.includes('slot'));
const fxnSlotProvider = [
    {
        label: 'All',
        value: 'all',
        providerData: {
            providerSmallIcon: slot_all_icon,
        },
    },
    {
        label: 'Favorite',
        value: 'favorite',
        providerData: {
            providerSmallIcon: slot_favorite_icon,
        },
    },

    ...slotProviderResource,
];
const index: React.FC = () => {
    //取得路由參數
    const { provider } = useParams();
    const { t } = useTranslation();
    //分類標籤
    const [slotGameProvider, setSlotGameProvider] = useState('all');
    //遊戲列表
    const [gameDataList, setGameDataList] = useState([]);
    //取得判斷收藏遊戲方法
    const { isFavorite } = useIsFavorite();
    //跑馬燈
    const { data } = useGetMarketingContent({ position: 'header' });
    const marqueeText = data?.map((item) => {
        return item?.content;
    });

    //取得遊戲列表
    const { data: ppData, isFetching } = useGetPPTableList();
    const ppGameData = ppData.filter((item) => item.gameCategory === 'slot');
    const tokenGamesData = tokenData.filter((item) => item.gameCategory === 'slot');
    const rawGameList = useMemo(() => [...ppGameData, ...tokenGamesData] || [], [isFetching]);

    //切換分類
    const handleSwitchTab = (key: string) => () => {
        setSlotGameProvider(key);
        if (key === 'all') return setGameDataList(rawGameList as []);
        //如果為Favorite遊戲渲染Favorite組件
        if (key === 'favorite') return setGameDataList(rawGameList.filter((item) => isFavorite(item as unknown as TGame)) as []); //TODO 有空在解這個類型問題
        setGameDataList(rawGameList.filter((item) => item.gameProviderName === key) as []);
    };
    //搜尋遊戲
    const filterGame = (searchGame: string) => {
        if (searchGame === '') return setGameDataList(rawGameList as []);
        setSlotGameProvider(searchGame);
        setGameDataList((rawGameList.filter((item) => item?.gameName?.toLowerCase().includes(searchGame.toLowerCase())) as []) || []);
    };

    //當載入完成後，將遊戲列表資料放入gameDataList
    useEffect(() => {
        if (!isFetching) {
            setGameDataList(rawGameList as []);
        }
    }, [isFetching]);
    //當組件載入時執行1.滾動到最上方2.判斷路由參數是否有值，有的話就切換分類
    useEffect(() => {
        window.scrollTo(0, 0);
        if (provider) {
            setSlotGameProvider(provider);
            setGameDataList(rawGameList.filter((item) => item.gameProviderName === provider) as []);
        }
    }, []);
    return (
        <div className="slotPage md:my-9 md:gap-8 my-4 w-full flex flex-col  gap-4">
            <Banner />
            <NewsMarquee className="md:hidden" speed={15} marqueeText={marqueeText} />
            <div className="slotSection relative md:w-full">
                <div className="slotWrap md:mx-4 md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl">
                    <div className="hidden slotTitle md:grid grid-cols-11 gap-4 py-9 border-0 border-solid border-b border-[#d5d8dc] shadow-[0_4.5px_0_0_#0000000D,0_3.5px_0_0_#FFFFFF,0_1.5px_0_0_#0000001A] ">
                        <div className="col-span-1 flex justify-center">
                            <img src={Icon_Main_Title} alt="" className="" />
                        </div>
                        <span className="col-span-1 font-bold text-3xl text-[#9680EA] -ml-3">{t('SLOT')}</span>
                        <div className="col-start-7 col-span-4 relative flex">
                            <SearchBar onFilter={filterGame} />
                        </div>
                    </div>

                    <div className="providerSection grid-cols-3 pb-3 px-4  overflow-x-scroll md:grid md:grid-cols-11 md:px-0 md:py-2 md:pt-4 md:overflow-hidden">
                        <div className="w-fit flex flex-nowrap col-span-3 grid-cols-5 gap-2 md:w-full md:grid md:col-start-2 md:col-span-9 ">
                            {fxnSlotProvider.map((item) => {
                                return (
                                    <div key={nanoid()} onClick={handleSwitchTab(item.value)} className={`${slotGameProvider === item.value ? 'bg-[#5932EA]' : 'bg-[#9680EA]'} basis-full flex-1 col-span-1 cursor-pointer rounded-2xl w-36 md:w-full`}>
                                        <div className="px-4 py-3 flex h-full items-center md:gap-2 gap-1">
                                            <img src={item?.providerData?.providerSmallIcon} className="md:w-9 w-6 h-full object-center object-contain" alt="" />
                                            <span className="whitespace-nowrap md:whitespace-normal font-medium md:text-base text-xs text-white">{t(item.label)}</span>
                                        </div>
                                    </div>
                                );
                            })}
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
