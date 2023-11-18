import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import '@refinedev/antd/dist/reset.css';
import routerBindings, { UnsavedChangesNotifier } from '@refinedev/react-router-v6';
import { DataProvider, axiosInstance } from '@/providers/strapi-v4';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { authProvider } from '@/authProvider';
import { API_URL } from '@/utils';
import { ColorModeContextProvider } from '@/contexts/color-mode';
import AppRouter from '@/routes';
import { resources } from '@/resources';
import '@/assets/scss/index.scss';
import { ConfigProvider } from 'antd';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ko from 'antd/locale/ko_KR';

function App() {
    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    const tResources = resources.map((resource) => {
        const meta = resource?.meta;
        if (meta && meta?.label) {
            const tMeta = {
                ...meta,
                label: t(meta.label),
            };

            return {
                ...resource,
                meta: tMeta,
            };
        }

        return resource;
    });

    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <ConfigProvider
                        locale={ko}
                        theme={{
                            token: {
                                colorPrimary: '#5932EA',
                                borderRadius: 12,
                            },
                            components: {
                                Button: {
                                    borderRadius: 16,
                                },
                            },
                        }}
                    >
                        <Refine
                            authProvider={authProvider}
                            dataProvider={DataProvider(`${API_URL}/api`, axiosInstance)}
                            routerProvider={routerBindings}
                            i18nProvider={i18nProvider}
                            resources={tResources}
                            options={{
                                syncWithLocation: false,
                                warnWhenUnsavedChanges: false,
                                disableTelemetry: true,
                                projectId: 'DFwDAg-3y0BW1-GbOkSm',
                                reactQuery: {
                                    clientConfig: {
                                        defaultOptions: {
                                            queries: {
                                                retry: 0,
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            <AppRouter />

                            <RefineKbar />
                            <UnsavedChangesNotifier />
                            <ReactQueryDevtools />
                        </Refine>
                    </ConfigProvider>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
