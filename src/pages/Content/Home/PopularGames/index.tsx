import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { Spin } from 'antd';
import GameList from '@/components/ContentLayout/GameListNormal';
import { useGetPopularGames } from '@/hooks/gameProvider/useGetPopularGames';
import { useShowPc } from '@/hooks/useShowPc';
import { TPopularGames } from '@/types/games/popularGames';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';

const index: React.FC = () => {
    const { t } = useTranslation();
    const showPc = useShowPc();
    const [activeTab, setActiveTab] = useState('allGames');
    const [gameDataList, setGameDataList] = useState([]);
    //取得遊戲列表
    const { PopularGamesData, isLoading } = useGetPopularGames();
    //切換遊戲列表
    const handleSwitchTab = (key: string) => () => {
        setActiveTab(key);
        setGameDataList(PopularGamesData.filter((item) => item.value === key)[0].gameData as []);
    };
    //篩選條
    const FilterBar = () => {
        if (showPc)
            //PC版
            return (
                <>
                    <div className="hidden popularTitle md:grid grid-cols-11 gap-4 pb-0.5 pt-9 border-0 border-solid border-b border-[#d5d8dc] shadow-[0_4.5px_0_0_#0000000D,0_3.5px_0_0_#FFFFFF,0_1.5px_0_0_#0000001A] ">
                        <div className="col-span-1 flex justify-center">
                            <img src={Icon_Main_Title} alt="" className="" />
                        </div>
                        <span className="whitespace-nowrap col-span-1 font-bold text-3xl text-[#9680EA] -ml-3 flex items-center">{t('POPULAR')}</span>
                        <div className="filterBar col-start-2 col-span-9 flex gap-2.5 -ml-2">
                            {PopularGamesData.map((item: TPopularGames) => {
                                return (
                                    <div key={nanoid()} onClick={handleSwitchTab(item.value)} className={`filterTab relative cursor-pointer p-2`}>
                                        <span className={`${activeTab === item.value ? 'text-black font-bold' : 'font-normal'} text-base`}>{t(item.label)}</span>
                                        <div className={`activeBorder ${activeTab === item.value ? 'h-1 rounded-full bg-[#9680EA]' : 'h-0'} absolute top-[96%] left-0 w-full h-0`}></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            );
        return (
            //手機版
            <>
                <div className="filterBarMb pb-4 overflow-x-scroll">
                    <div className="flex gap-2.5 w-fit px-4">
                        {PopularGamesData.map((item: TPopularGames) => {
                            return (
                                <div key={nanoid()} onClick={handleSwitchTab(item.value)} className={`${activeTab === item.value ? 'active' : ''} ${item.value} filterTab relative rounded-2xl flex flex-col justify-center items-center aspect-square w-[60px] gap-1 shadow-[0px_4px_10px_0px_#A370ED33] `}>
                                    <div className="favicon h-[24px] w-[20px]" />
                                    <span className="text-[8px] whitespace-nowrap">{t(item.label)}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    };
    //首次載入時，將全部遊戲放入gameDataList
    useEffect(() => {
        setGameDataList(PopularGamesData.filter((item) => item.value === activeTab)[0].gameData as []);
    }, [isLoading]);
    return (
        <div className="relative PopularGames md:w-full">
            <div className="md:mx-4 md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl">
                <FilterBar />
                <Spin spinning={isLoading}>
                    <div className="md:py-9">
                        <GameList gameData={gameDataList} />
                    </div>
                </Spin>
            </div>
        </div>
    );
};

export default index;
