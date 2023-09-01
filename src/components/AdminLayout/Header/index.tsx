import {
    LoginOutlined,
    UserOutlined,
    TranslationOutlined,
    CheckOutlined,
} from '@ant-design/icons';
import type { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd';
import {
    useGetIdentity,
    useGetLocale,
    useSetLocale,
    useLogout,
} from '@refinedev/core';
import { Layout as AntdLayout, Avatar, Dropdown, MenuProps } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorModeContext } from '@/contexts/color-mode';
import useColor from '@/hooks/useColor';
import { useQueryClient } from '@tanstack/react-query';

type IUser = {
    id: number;
    name: string;
    email: string;
};

const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky }) => {
    const { i18n } = useTranslation();
    const locale = useGetLocale();
    const changeLanguage = useSetLocale();
    const { data: user } = useGetIdentity<IUser>();
    const { mode, setMode } = useContext(ColorModeContext);

    const currentLocale = locale();
    const { colorSuccess, colorBgElevated } = useColor();

    const headerStyles: React.CSSProperties = {
        backgroundColor: colorBgElevated,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0px 24px',
        height: '64px',
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

    const userOptions: MenuProps['items'] = [
        {
            key: 'userName',
            label: user?.name || 'Unknown',
            icon: <UserOutlined className="w-4" />,
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'mode',
            label: (
                <p
                    className="m-0"
                    onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                >
                    {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
                </p>
            ),
            icon: (
                <div className="inline-block w-4">
                    {mode === 'light' ? '🌛' : '🔆'}
                </div>
            ),
        },
        {
            key: 'languages',
            label: 'Languages',
            icon: <TranslationOutlined className="w-4" />,
            children: [...(i18n.languages || [])]
                .sort()
                .map((lang: string) => ({
                    key: lang,
                    label: (
                        <p
                            className="m-0 flex justify-between w-24"
                            onClick={() => changeLanguage(lang)}
                        >
                            {lang === 'en' ? 'English' : 'German'}
                            {lang === currentLocale && (
                                <CheckOutlined
                                    style={{ color: colorSuccess }}
                                />
                            )}
                        </p>
                    ),
                    icon: (
                        <Avatar size={16} src={`/images/flags/${lang}.svg`} />
                    ),
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

    return (
        <AntdLayout.Header style={headerStyles}>
            <Dropdown
                menu={{ items: userOptions }}
                overlayClassName="w-60"
                trigger={['click']}
            >
                <Avatar
                    className="cursor-pointer"
                    style={{
                        backgroundColor: '#fde3cf',
                        color: '#f56a00',
                    }}
                >
                    {(user?.name || 'Unknown')?.charAt(0).toUpperCase()}
                </Avatar>
            </Dropdown>
        </AntdLayout.Header>
    );
};

export default Header;
