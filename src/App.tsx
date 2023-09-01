import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import { notificationProvider } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import routerBindings, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import { DataProvider } from '@refinedev/strapi-v4';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { authProvider, axiosInstance } from '@/authProvider';
import { API_URL } from '@/utils';
import { ColorModeContextProvider } from '@/contexts/color-mode';
import AppRouter from '@/routes';
import '@/assets/scss/index.scss';

function App() {
    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <Refine
                        authProvider={authProvider}
                        dataProvider={DataProvider(
                            API_URL + `/api`,
                            axiosInstance,
                        )}
                        notificationProvider={notificationProvider}
                        routerProvider={routerBindings}
                        i18nProvider={i18nProvider}
                        resources={[
                            {
                                name: 'blog-posts',
                                list: '/blog-posts',
                                create: '/blog-posts/create',
                                edit: '/blog-posts/edit/:id',
                                show: '/blog-posts/show/:id',
                                meta: {
                                    canDelete: true,
                                },
                            },
                            {
                                name: 'categories',
                                list: '/categories',
                                create: '/categories/create',
                                edit: '/categories/edit/:id',
                                show: '/categories/show/:id',
                                meta: {
                                    canDelete: true,
                                },
                            },
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            projectId: 'DFwDAg-3y0BW1-GbOkSm',
                        }}
                    >
                        <AppRouter />

                        <RefineKbar />
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
