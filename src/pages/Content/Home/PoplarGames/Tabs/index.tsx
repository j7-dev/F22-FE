import React, { useEffect, useState } from 'react';
import { Tabs, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TPoplarGames } from '@/types/resources/PoplarGames';

//TODO 有空在來解any類型

//單個文章版型
const TabPaneList = (props: any) => {
    const { taxonomy } = props;

    const SingleCase = (SingleCaseProps: any) => {
        const { item } = SingleCaseProps;
        return (
            <div className="h-full w-full shadow-[0_0px_20px_0px_rgba(3,50,142,0.1)]">
                <a>
                    <div className="overflow-hidden w-full rounded-2xl">
                        <img src={item.gameImg} alt="" className="w-full h-full duration-500 hover:scale-125 aspect-[300/215] object-cover" />
                    </div>
                </a>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-2 gap-4 px-4 py-10 md:px-32 md:grid-cols-3 md:gap-5">
            {taxonomy !== undefined
                ? taxonomy?.gameData
                      // .filter((item) => item.postCategoryID === taxonomy.CategoryID)
                      .map((item: any) => {
                          return (
                              <div key={item.gameID}>
                                  <SingleCase item={item} />
                              </div>
                          );
                      })
                : taxonomy?.gameData.map((item: any) => {
                      return (
                          <div key={item.gameID}>
                              <SingleCase item={item} />
                          </div>
                      );
                  })}
        </div>
    );
};

// 自定义标签栏组件
const CustomTabBar = (props: any) => {
    const { activeKey, panes, onChange } = props;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // console.log('panes', panes)
    // console.log('activeKey', activeKey)
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
                <a className="text-center underline-offset-0 no-underline" onClick={() => onChange(pane.key)}>
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
        <div className="custom-tab-bar flex justify-start px-32 gap-2.5 border-0 border-solid border-b border-[#d5d8dc]">
            {panes.map((pane: any) => {
                return (
                    <div key={pane.value} className={`customTab relative cursor-pointer py-2 mx-2.5 text-base ${activeKey === pane.key ? 'text-black font-bold' : 'font-normal'}`} onClick={() => onChange(pane.key)}>
                        {pane.props.tab}
                        <div className={`activeBorder absolute top-[96%] w-full ${activeKey === pane.key ? 'h-1 rounded-full bg-[#9680EA]' : 'h-0'}`}></div>
                    </div>
                );
            })}
        </div>
    );
};
const customTabBar = (props: any) => {
    // console.log(props)
    return <CustomTabBar {...props} onChange={props.onTabClick} />;
};

const ShowGames: React.FC<TPoplarGames> = (props) => {
    const { data } = props;
    //資料格式化
    const formattedData = data.map((item) => ({
        key: item.value,
        label: item.label,
        children: <TabPaneList taxonomy={item} />,
    }));

    return <Tabs defaultActiveKey="1" renderTabBar={customTabBar} items={formattedData} className=""></Tabs>;
};

export default ShowGames;
