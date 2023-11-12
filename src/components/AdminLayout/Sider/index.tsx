import { useState } from 'react';
import { ITreeMenu, CanAccess, useMenu, useGetIdentity } from '@refinedev/core';
import { Link } from 'react-router-dom';
import { Sider } from '@refinedev/antd';
import { Layout as AntdLayout, Menu, Grid, theme, Button } from 'antd';
import { UnorderedListOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import logo from '@/assets/images/1002_logo_f.png';
import logo_s from '@/assets/images/1002_logo_s.png';
import { useTranslation } from 'react-i18next';
import { TMe } from '@/types';

const { useToken } = theme;
const siderWidth = 320;

const CustomSider: typeof Sider = () => {
    const { data: identity } = useGetIdentity<TMe>();
    const role = identity?.role?.type || '';
    const { token } = useToken();
    const { t } = useTranslation();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const { SubMenu } = Menu;

    const breakpoint = Grid.useBreakpoint();

    const isMobile = typeof breakpoint.lg === 'undefined' ? false : !breakpoint.lg;

    const renderTreeView = (tree: ITreeMenu[], theSelectedKey: string) => {
        return tree
            .filter((item: ITreeMenu) => {
                if (role === 'agent') {
                    const allow = ['members', 'users', 'dashboard', 'daily-statistic'];
                    return allow.includes(item.name);
                }
                if (role === 'admin') {
                    return true;
                }
            })
            .map((item: ITreeMenu) => {
                const { name, children, meta, key, list } = item;

                const icon = meta?.icon;
                const label = meta?.label ?? name;
                const parent = meta?.parent;
                const route = typeof list === 'string' ? list : typeof list !== 'function' ? list?.path : key;

                if (children.length > 0) {
                    return (
                        <SubMenu key={nanoid()} icon={icon ?? <UnorderedListOutlined />} title={label}>
                            {renderTreeView(children, theSelectedKey)}
                        </SubMenu>
                    );
                }
                const isSelected = route === theSelectedKey;
                const isRoute = !(parent !== undefined && children.length === 0);
                return (
                    <CanAccess key={nanoid()} resource={name.toLowerCase()} action="list" params={{ resource: item }}>
                        <Menu.Item
                            key={route}
                            style={{
                                textTransform: 'capitalize',
                            }}
                            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
                        >
                            {route ? <Link to={route || '/'}>{t(label)}</Link> : label}
                            {!collapsed && isSelected && <div className="ant-menu-tree-arrow" />}
                        </Menu.Item>
                    </CanAccess>
                );
            });
    };

    const items = renderTreeView(menuItems, selectedKey);

    return (
        <>
            <AntdLayout.Sider
                collapsible
                collapsedWidth={isMobile ? 0 : 80}
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={(isCollapsed: boolean): void => setCollapsed(isCollapsed)}
                style={{
                    zIndex: 999,
                    backgroundColor: token.colorBgContainer,
                    borderRight: `1px solid ${token.colorBgElevated}`,
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
                trigger={
                    !isMobile && (
                        <Button
                            type="text"
                            style={{
                                borderRadius: 0,
                                height: '100%',
                                width: '100%',
                                backgroundColor: token.colorBgElevated,
                            }}
                        >
                            {collapsed ? (
                                <RightOutlined
                                    style={{
                                        color: token.colorPrimary,
                                    }}
                                />
                            ) : (
                                <LeftOutlined
                                    style={{
                                        color: token.colorPrimary,
                                    }}
                                />
                            )}
                        </Button>
                    )
                }
                width={siderWidth}
            >
                <div
                    style={{
                        width: collapsed ? '80px' : `${siderWidth.toString()}px`,
                        padding: collapsed ? '0' : '0 16px',
                        display: 'flex',
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        alignItems: 'center',
                        height: '64px',
                        backgroundColor: token.colorBgElevated,
                        fontSize: '14px',
                    }}
                >
                    {collapsed ? <img src={logo_s} className="h-8" /> : <img src={logo} className="h-8" />}
                </div>
                <Menu
                    defaultOpenKeys={defaultOpenKeys}
                    selectedKeys={[selectedKey]}
                    mode="inline"
                    style={{
                        marginTop: '8px',
                        border: 'none',
                    }}
                    onClick={() => {
                        if (!breakpoint.lg) {
                            setCollapsed(true);
                        }
                    }}
                >
                    {items}
                </Menu>
            </AntdLayout.Sider>
            <div className="block" style={{ width: isMobile || collapsed ? '80px' : siderWidth }}></div>
        </>
    );
};

export default CustomSider;
