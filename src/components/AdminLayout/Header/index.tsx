import { LoginOutlined, UserOutlined, TranslationOutlined, CheckOutlined } from '@ant-design/icons';
import type { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd';
import { useGetIdentity, useGetLocale, useSetLocale, useLogout } from '@refinedev/core';
import { Layout as AntdLayout, Avatar, Dropdown, MenuProps } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useColor from '@/hooks/useColor';
import { useQueryClient } from '@tanstack/react-query';
import { TMe } from '@/types';

const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky }) => {
    const { i18n } = useTranslation();
    const locale = useGetLocale();
    const changeLanguage = useSetLocale();
    const { data: user } = useGetIdentity<TMe>();

    const currentLocale = locale();
    const { colorSuccess, colorBgElevated } = useColor();

    const headerStyles: React.CSSProperties = {
        backgroundColor: colorBgElevated,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 24px',
        height: '128px',
    };

    if (sticky) {
        headerStyles.position = 'sticky';
        headerStyles.top = 0;
        headerStyles.zIndex = 1;
    }

    const queryClient = useQueryClient();
    const { mutate: logout } = useLogout();

    const handleLogOut = () => {
        logout();
        queryClient.clear();
    };

    const displayName = user?.display_name || 'Unknown';

    const languages = (i18n?.languages || []).filter((lang) => lang === 'en' || lang === 'ko');

    const userOptions: MenuProps['items'] = [
        {
            key: 'userName',
            label: (
                <p className="m-0 cursor-default relative">
                    {displayName} <span className="absolute bottom-0 right-0 text-xs">#{user?.username}</span>
                </p>
            ),
            icon: <UserOutlined className="w-4" />,
        },
        {
            type: 'divider',
        },
        // {
        //     key: 'mode',
        //     label: (
        //         <p className="m-0" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        //             {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        //         </p>
        //     ),
        //     icon: <div className="inline-block w-4">{mode === 'light' ? '🌛' : '🔆'}</div>,
        // },
        {
            key: 'languages',
            label: 'Languages',
            icon: <TranslationOutlined className="w-4" />,
            children: languages.sort().map((lang: string) => ({
                key: lang,
                label: (
                    <p className="m-0 flex justify-between w-24" onClick={() => changeLanguage(lang)}>
                        {lang === 'en' ? 'English' : 'Korea'}
                        {lang === currentLocale && <CheckOutlined style={{ color: colorSuccess }} />}
                    </p>
                ),
                icon: <Avatar size={16} src={`/images/flags/${lang}.svg`} />,
            })),
        },
        {
            type: 'divider',
        },
        {
            key: 'logOut',
            label: (
                <p className="m-0" onClick={handleLogOut}>
                    Log Out
                </p>
            ),
            icon: <LoginOutlined className="w-4" />,
        },
    ];

    //TODO 統計API
    return (
        <AntdLayout.Header style={headerStyles}>
            <div className="flex">
                <table className="table table-small th-left w-[200px]">
                    <tr>
                        <th className="w-8">total balance</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>total point</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>total deposit (users)</th>
                        <td>0 (0)</td>
                    </tr>
                    <tr>
                        <th>total withdraw (users)</th>
                        <td>0 (0)</td>
                    </tr>
                    <tr>
                        <th>DPWD</th>
                        <td>0</td>
                    </tr>
                </table>

                <table className="table table-fixed table-small th-left w-[600px] ml-4">
                    <tr>
                        <th className="w-1/4"></th>
                        <th>total</th>
                        <th>live</th>
                        <th>slot</th>
                        <th>games</th>
                        <th>sport</th>
                        <th>igx</th>
                    </tr>
                    <tr>
                        <th className="whitespace-nowrap">valid bet amount (users)</th>
                        <td>0 (0)</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>payout</th>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>win loss</th>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>turnover bonus</th>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                </table>

                <table className="table table-fixed table-small th-left w-[240px] ml-4">
                    <tr>
                        <th className="w-1/4"></th>
                        <th>new</th>
                        <th>pending</th>
                        <th>confirmed</th>
                    </tr>
                    <tr>
                        <th>deposit</th>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>withdraw</th>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>register</th>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>&nbsp;</th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>

                <table className="table table-small th-left w-[200px] ml-4">
                    <tr>
                        <th>&nbsp;</th>
                        <th>人數</th>
                    </tr>
                    <tr>
                        <th>total users</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>online users</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>&nbsp;</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>&nbsp;</th>
                        <td></td>
                    </tr>
                </table>
            </div>

            <Dropdown menu={{ items: userOptions }} overlayClassName="w-60" trigger={['click']}>
                <Avatar
                    className="cursor-pointer"
                    style={{
                        backgroundColor: '#fde3cf',
                        color: '#f56a00',
                    }}
                >
                    {displayName?.charAt(0).toUpperCase()}
                </Avatar>
            </Dropdown>
        </AntdLayout.Header>
    );
};

export default Header;
