import React, { useState } from 'react';
import { Tabs, Dropdown, Space, TabsProps } from 'antd';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
// import {LazyLoadImage} from 'react-lazy-load-image-component';
import { windowWidthAtom } from '@/components/ContentLayout';
import { TGameProvider, TProviderData } from '@/types/games';
import { DownOutlined } from '@ant-design/icons';

//TODO 這邊只要套用LazyLoadImage 組件就會閃跳
//單個文章版型
const TabPaneList = (props: { taxonomy: TGameProvider }) => {
    const { taxonomy } = props;
    // const navigate = useNavigate();
    // const { t } = useTranslation();
    // const handleStartGame = (path: string) => {
    //     navigate(path);
    // };
    const SingleCase = (SingleCaseProps: { item?: TProviderData }) => {
        const { item } = SingleCaseProps;
        return (
            <div className="providerInfo h-full w-full grid grid-cols-11 gap-4">
                <div className="col-start-1"></div>
                <div className="providerMainImg overflow-hidden col-span-6 rounded-2xl ">
                    <img src={item?.providerMainImg} alt="" className="w-full min-h-[369px] duration-500 hover:scale-125  object-cover" />
                </div>
                <div className="col-span-3 flex flex-col items-center justify-center">
                    <img className="providerFavIcon w-full" src={item?.providerFavIcon} />
                    <p className="providerDescribe text-xs font-bold">{item?.providerDescribe}</p>
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
            <div key={nanoid()} className="w-full">
                <SingleCase item={taxonomy?.providerData} />
            </div>
        </div>
    );
};

//TODO 有空在來解any類型
// 自定义标签栏组件
const CustomTabBar = (props: any) => {
    const { activeKey, panes, onTabClick } = props;
    const [windowWidth, _setWindowWidth] = useAtom(windowWidthAtom);
    // 添加用于检测屏幕宽度变化的事件处理程序

    //目前手機版用不到
    if (windowWidth < 810) {
        // 当屏幕宽度小于 810px 时，使用下拉菜单
        const DropdownMenu = panes.map((pane: any) => ({
            key: pane.props.tabKey,
            label: (
                <a key={nanoid()} className="text-center underline-offset-0 no-underline">
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
                        {panes.find((pane: any) => pane.props.tabKey === activeKey)?.props.tab}
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
                            className={`customTab relative cursor-pointer p-2 text-base ${activeKey === pane.props.tabKey ? 'text-black font-bold' : 'font-normal'}`}
                            onClick={(e) => {
                                console.log('key', pane.props.tabKey);
                                onTabClick(pane.props.tabKey, e);
                            }}
                        >
                            {pane.props.tab}
                            <div className={`activeBorder absolute top-[96%] left-0 w-full ${activeKey === pane.props.tabKey ? 'h-1 rounded-full bg-[#9680EA]' : 'h-0'}`}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

//TODO 這裡的props怎麼來的? TAB 內部封裝時幫你帶入的
const customTabBar: TabsProps['renderTabBar'] = (props) => <CustomTabBar {...props} />;

type indexProps = {
    provider: TGameProvider[];
};
const index: React.FC<indexProps> = (props) => {
    const { provider } = props;

    //資料格式化
    //TODO 如何取得Tabs的props
    const formattedData = provider.map((item, i) => ({
        key: i.toString(),
        label: item.label,
        children: <TabPaneList taxonomy={item} />,
    }));
    const [tabActiveKey, setTabActiveKey] = useState('0');
    const handleTabClick = (key: string) => {
        setTabActiveKey(key);
    };
    return (
        <>
            {/* Tab */}
            <Tabs activeKey={tabActiveKey} onTabClick={handleTabClick} renderTabBar={customTabBar} items={formattedData} className="SlotGamesTabs" />
            {/* 切換小圖 */}
            <div className="grid grid-cols-11 gap-4 pb-10">
                <div className="col-start-1"></div>
                {provider.map((item: TGameProvider, indexKey: number) => {
                    const activeKey = indexKey.toString();
                    const handleSwitchTab = (key: string) => {
                        setTabActiveKey(key);
                    };
                    return (
                        <div
                            key={activeKey}
                            className="h-20 rounded-2xl overflow-hidden col-span-3"
                            onMouseEnter={() => {
                                handleSwitchTab(activeKey);
                            }}
                        >
                            <img src={item?.providerData?.providerMainImg} className="w-full h-full duration-500 hover:scale-125 object-center object-cover" alt="" />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default index;
