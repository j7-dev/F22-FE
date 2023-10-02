import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TPopularGames, TPopularGame } from '@/types/resources/popularGames';
import { throttle } from 'lodash-es';
import { nanoid } from 'nanoid';

//單個文章版型
const TabPaneList = (props: { taxonomy: TPopularGames }) => {
    const { taxonomy } = props;
    const gameData = taxonomy?.gameData || [];

    const SingleCase = (SingleCaseProps: { item: TPopularGame }) => {
        const { item } = SingleCaseProps;
        return (
            <div className="h-full w-full">
                <a>
                    <div className="overflow-hidden w-full rounded-2xl">
                        <img src={item?.gameImg} alt="" className="w-full h-full duration-500 hover:scale-125 aspect-[1/1] object-cover" />
                    </div>
                </a>
            </div>
        );
    };
    //如果為空陣列
    if (gameData.length === 0) return <div className="min-h-[300px] flex items-center justify-center text-center h-full w-full">Stay tuned</div>;
    return (
        <div className="grid grid-cols-11">
            <div className="col-start-1"></div>
            <div className="col-span-9 grid grid-cols-2 gap-2 py-10 md:grid-cols-3 md:gap-5">
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
const CustomTabBar = (props: any) => {
    const { activeKey, panes, onTabClick } = props;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { t } = useTranslation();
    // console.log('activeKey', activeKey)
    // 添加用于检测屏幕宽度变化的事件处理程序
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
        // 添加窗口大小变化事件监听器
        window.addEventListener('resize', throttle(handleWindowResize, 500));
        return () => {
            // 在组件卸载时移除事件监听器
            window.removeEventListener('resize', throttle(handleWindowResize, 500));
        };
    }, []);

    if (windowWidth < 810) {
        // 当屏幕宽度小于 810px 时，使用下拉菜单
        const DropdownMenu = panes.map((pane: any) => ({
            key: pane.props.tabkey,
            label: (
                <a className="text-center underline-offset-0 no-underline" onClick={() => onTabClick(pane.key)}>
                    {t(pane.props.tab)}
                </a>
            ),
        }));
        return (
            <Dropdown menu={{ items: DropdownMenu, selectable: true }} trigger={['click']}>
                <a
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                    className="text-center"
                >
                    <Space>
                        {panes.find((pane: any) => pane.key === activeKey)?.props.tab}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        );
    }
    return (
        <div className="custom-tab-bar grid grid-cols-11 border-0 border-solid border-b border-[#d5d8dc]">
            <div className="col-start-2 col-span-9 flex gap-2.5 -ml-2">
                {panes.map((pane: any) => {
                    return (
                        <div key={pane.value} className={`customTab relative cursor-pointer p-2 text-base ${activeKey === pane.key ? 'text-black font-bold' : 'font-normal'}`} onClick={() => onTabClick(pane.key)}>
                            {t(pane.props.tab)}
                            <div className={`activeBorder absolute top-[96%] left-0 w-full ${activeKey === pane.key ? 'h-1 rounded-full bg-[#9680EA]' : 'h-0'}`}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const customTabBar = (props: any) => {
    // console.log(props)
    return <CustomTabBar {...props} />;
};

type ShowGamesProps = {
    data: TPopularGames[];
};
const ShowGames: React.FC<ShowGamesProps> = (props) => {
    const { data } = props;
    //資料格式化
    const formattedData = data.map((item, i) => ({
        key: i.toString(),
        label: item.label,
        children: <TabPaneList taxonomy={item} />,
    }));

    return <Tabs defaultActiveKey="0" renderTabBar={customTabBar} items={formattedData} />;
};

export default ShowGames;
