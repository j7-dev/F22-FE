import React, { useEffect, useState } from 'react';
import { Tabs, Dropdown, Space } from 'antd';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import { DownOutlined } from '@ant-design/icons';
import { TProviders, TProvider } from '@/types';
import { slogGamesArray } from '../index';
import { nanoid } from 'nanoid';

const tabActiveKeyAtom = atom<undefined | string>(undefined);
//單個文章版型
const TabPaneList = (props: { taxonomy: TProviders }) => {
    const { taxonomy } = props;
    // const navigate = useNavigate();
    // const { t } = useTranslation();
    // const handleStartGame = (path: string) => {
    //     navigate(path);
    // };
    const SingleCase = (SingleCaseProps: { item: TProvider }) => {
        const { item } = SingleCaseProps;
        return (
            <div className="providerInfo h-full w-full grid grid-cols-11 gap-4">
                <div className="col-start-1"></div>
                <div className="providerMainImg overflow-hidden col-span-6 rounded-2xl ">
                    <img src={item.providerMainImg} alt="" className="w-full min-h-[369px] duration-500 hover:scale-125  object-cover" />
                </div>
                <div className="col-span-3 flex flex-col items-center justify-center">
                    <img className="providerFavIcon w-full" src={item.providerFavIcon} />
                    <p className="providerDescribe text-xs font-bold">{item.providerDescribe}</p>
                    {/* <span
                        className="providerStartGameBtn w-[165px] text-center text-base font-bold text-white bg-[#5932EA] rounded-full py-1.5 cursor-pointer"
                        onClick={() => {
                            handleStartGame(item.providerPath as string);
                        }}
                    >
                        {t('START')}
                    </span> */}
                </div>
            </div>
        );
    };

    return (
        <div className="providerTabPane pt-10 pb-5">
            <div key={taxonomy.value} className="w-full">
                <SingleCase item={taxonomy.providerData} />
            </div>
        </div>
    );
};

//TODO 有空在來解any類型
// 自定义标签栏组件
const CustomTabBar = (props: any) => {
    const { activeKey, panes } = props;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [_tabActiveKey, setTabActiveKey] = useAtom(tabActiveKeyAtom);
    // 添加用于检测屏幕宽度变化的事件处理程序
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
        // 添加窗口大小变化事件监听器
        window.addEventListener('resize', handleWindowResize);
        return () => {
            // 在组件卸载时移除事件监听器
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    if (windowWidth < 810) {
        // 当屏幕宽度小于 810px 时，使用下拉菜单
        const DropdownMenu = panes.map((pane: any) => ({
            key: pane.props.tabkey,
            label: (
                <a className="text-center underline-offset-0 no-underline" onClick={() => setTabActiveKey(pane.key)}>
                    {pane.props.tab}
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
                        <div
                            key={nanoid()}
                            className={`customTab relative cursor-pointer p-2 text-base ${activeKey === pane.key ? 'text-black font-bold' : 'font-normal'}`}
                            onClick={() => {
                                setTabActiveKey(pane.key);
                            }}
                        >
                            {pane.props.tab}
                            <div className={`activeBorder absolute left-0 top-[96%] w-full ${activeKey === pane.key ? 'h-1 rounded-full bg-[#9680EA]' : 'h-0'}`}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

//TODO這裡的props怎麼來的?
const customTabBar = (props: any) => {
    // console.log('onTabClick', props.onTabClick);
    return <CustomTabBar {...props} />;
};

type ShowGamesProps = {
    data: TProviders[];
};
const ShowGames: React.FC<ShowGamesProps> = (props) => {
    const { data } = props;

    const formattedData = data.map((item) => ({
        key: item.value,
        label: item.label,
        children: <TabPaneList taxonomy={item} />,
    }));
    const [tabActiveKey, setTabActiveKey] = useAtom(tabActiveKeyAtom);
    tabActiveKey ?? setTabActiveKey(formattedData[0].key);
    return (
        <>
            {/* Tab */}
            <Tabs activeKey={tabActiveKey} renderTabBar={customTabBar} items={formattedData} className="SlotGamesTabs" />
            {/* 切換小圖 */}
            <div className="grid grid-cols-11 gap-4 pb-10">
                <div className="col-start-1"></div>
                {slogGamesArray.map((item: TProviders) => {
                    const handleSwichTab = (key: string) => {
                        setTabActiveKey(key);
                    };
                    return (
                        <div
                            key={item.value}
                            className="h-20 rounded-2xl overflow-hidden col-span-3"
                            onMouseEnter={() => {
                                handleSwichTab(item.value);
                            }}
                        >
                            <img src={item.providerData.providerMainImg} className="w-full h-full duration-500 hover:scale-125 object-center object-cover" alt="" />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ShowGames;
