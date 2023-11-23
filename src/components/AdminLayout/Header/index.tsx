import { LoginOutlined, UserOutlined, TranslationOutlined, CheckOutlined } from '@ant-design/icons';
import type { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd';
import { useGetIdentity, useGetLocale, useSetLocale, useLogout } from '@refinedev/core';
import { Layout as AntdLayout, Avatar, Dropdown, MenuProps } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useColor } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { TMe } from '@/types';
import HeaderInfo from './HeaderInfo';

const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky }) => {
    const { t } = useTranslation();
    const locale = useGetLocale();
    const changeLanguage = useSetLocale();
    const { data: user } = useGetIdentity<TMe>();
    const role = user?.role?.type || '';

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
        headerStyles.zIndex = 100;
    }

    const queryClient = useQueryClient();
    const { mutate: logout } = useLogout();

    const handleLogOut = () => {
        logout();
        queryClient.clear();
    };

    const displayName = user?.display_name || 'Unknown';

    const languages = ['en', 'ko'];

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
            label: t('Languages'),
            icon: <TranslationOutlined className="w-4" />,
            children: languages.sort().map((lang: string) => {
                return {
                    key: lang,
                    label: (
                        <p className="m-0 flex justify-between w-24" onClick={() => changeLanguage(lang)}>
                            {lang === 'en' ? 'English' : 'Korea'}
                            {lang === currentLocale && <CheckOutlined style={{ color: colorSuccess }} />}
                        </p>
                    ),
                    icon: <Avatar size={16} src={`/images/flags/${lang}.svg`} />,
                };
            }),
        },
        {
            type: 'divider',
        },
        {
            key: 'logOut',
            label: (
                <p className="m-0" onClick={handleLogOut}>
                    {t('Log Out')}
                </p>
            ),
            icon: <LoginOutlined className="w-4" />,
        },
    ];

    //TODO 統計API
    return (
        <AntdLayout.Header style={headerStyles}>
            {role === 'admin' && <HeaderInfo />}
            <Dropdown menu={{ items: userOptions }} overlayClassName="w-60" trigger={['click']}>
                <Avatar
                    className="cursor-pointer"
                    style={{
                        backgroundColor: '#fde3cf',
                        color: '#f56a00',
                        minWidth: '2rem',
                        width: '2rem',
                        marginLeft: '1rem',
                    }}
                >
                    {displayName?.charAt(0).toUpperCase()}
                </Avatar>
            </Dropdown>
        </AntdLayout.Header>
    );
};

export default Header;
