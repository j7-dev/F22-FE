import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { nanoid } from 'nanoid';
import { useAtom } from 'jotai';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TPopularGamesData, TPopularGames, TPopularGame } from '@/types/games/popularGames';
import { windowWidthAtom } from '@/components/ContentLayout';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaGamepad } from 'react-icons/fa';
import { RenderTabBar } from 'rc-tabs/lib/interface';

//單個文章版型
const TabPaneList = ({ gameCategory }: { gameCategory: TPopularGames }) => {
    // console.log('🚀 ~ file: index.tsx:16 ~ TabPaneList ~ gameCategory:', gameCategory);
    const gameData = gameCategory?.gameData || [];
    const openGameLoading = gameCategory?.openGameLoading || false;
    const handleClick =
        gameCategory?.openGame ||
        (() => () => {
            console.log('openGame');
        });

    const SingleCase = (SingleCaseProps: { item: TPopularGame }) => {
        const { item } = SingleCaseProps;

        return (
            <div onClick={handleClick(item)} className="w-full h-full relative overflow-hidden rounded-2xl sm:shadow-none shadow-[0_4px_4px_0_#A370ED33]">
                <div className={`z-10 cursor-pointer absolute inset-0 editOverlay w-full h-full duration-300 text-white opacity-0 hover:opacity-100 hover:bg-slate-600/50 flex justify-center items-center`}>{openGameLoading ? <AiOutlineLoading3Quarters className={`${openGameLoading ? 'block' : 'hidden'} animate-spin`} /> : <FaGamepad size={30} />}</div>
                <div className="w-full">
                    <LazyLoadImage src={item?.gameImg} alt="" className="sm:aspect-square w-full h-full duration-500 hover:scale-125 aspect-[342/120] object-cover" />
                </div>
            </div>
        );
    };
    //如果為空陣列
    if (gameData.length === 0) return <div className="min-h-[300px] flex items-center justify-center text-center h-full w-full">Stay tuned</div>;
    return (
        <div className="grid sm:grid-cols-11 sm:px-0 px-4 ">
            <div className="col-start-1"></div>
            <div className="col-span-9 grid grid-cols-1 gap-2 sm:py-10 sm:grid-cols-6 sm:gap-2">
                {gameData.map((item) => {
                    return (
                        <div key={nanoid()}>
                            <SingleCase item={item} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

//TODO 有空在來解any類型
// 自定义标签栏组件
const CustomTabBar: RenderTabBar = (props) => {
    const { activeKey, panes, onTabClick } = props;

    const [windowWidth, _setWindowWidth] = useAtom(windowWidthAtom);
    const { t } = useTranslation();
    // console.log('panes', panes);
    if (windowWidth <= 414) {
        // 当屏幕宽度小于 810px 时，
        return (
            <div className="customTabBarMb  py-4 overflow-x-scroll">
                <div className="flex gap-2.5 w-fit px-4">
                    {((panes || []) as []).map((pane: any, index: number) => {
                        if (index === 0) return;
                        return (
                            <div key={nanoid()} className={`${pane.props.tabKey} customTab relative rounded-2xl flex flex-col justify-center items-center aspect-square w-[50px] text-[8px] whitespace-nowrap shadow-[0px_4px_10px_0px_#A370ED33] ${activeKey === pane.props.tabKey ? 'active' : ''}`} onClick={(e) => onTabClick(pane.props.tabKey, e)}>
                                <div className="favicon h-[24px] w-[20px]" />
                                <span>{t(pane.props.tab)}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    return (
        <div className="customTabBarPc grid grid-cols-11 border-0 border-solid border-b border-[#d5d8dc]">
            <div className="col-start-2 col-span-9 flex gap-2.5 -ml-2">
                {((panes || []) as []).map((pane: any) => {
                    return (
                        <div key={nanoid()} className={`customTab relative cursor-pointer p-2 text-base ${activeKey === pane.props.tabKey ? 'text-black font-bold' : 'font-normal'}`} onClick={(e) => onTabClick(pane.props.tabKey, e)}>
                            {t(pane.props.tab)}
                            <div className={`activeBorder absolute top-[96%] left-0 w-full ${activeKey === pane.props.tabKey ? 'h-1 rounded-full bg-[#9680EA]' : 'h-0'}`}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const customTabBar: RenderTabBar = (props) => <CustomTabBar {...props} />;

type indexProps = {
    data: TPopularGamesData;
};
const index: React.FC<indexProps> = (props) => {
    const data = props?.data || [];
    //資料格式化
    const formattedData = data.map((item, _i) => ({
        // key: i.toString(),
        key: item.value,
        label: item.label,
        children: <TabPaneList gameCategory={item} />,
    }));

    return <Tabs defaultActiveKey="0" renderTabBar={customTabBar} items={formattedData} />;
};

export default index;
