import { Outlet, Routes, Route } from 'react-router-dom';
import { Authenticated, useGetIdentity } from '@refinedev/core';
import { ErrorComponent, ThemedLayoutV2 } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { Header, Sider } from '@/components/AdminLayout';

import ContentLayout from '@/components/ContentLayout';
import contentRoutes from '@/routes/content';
import adminRoutes from '@/routes/admin';
import { allowedRoles } from '@/utils';
import { TUser } from '@/types';
import Login from '@/pages/Admin/login';

const index = () => {
    const { data: identity } = useGetIdentity<TUser>();
    const role = identity?.role?.type || '';

    return (
        <Routes>
            {/* Admin */}
            {allowedRoles.includes(role) ? (
                <Route
                    element={
                        <Authenticated fallback={<CatchAllNavigate to="/refine/login" />}>
                            <ThemedLayoutV2 Header={() => <Header sticky />} Sider={Sider}>
                                <Outlet />
                            </ThemedLayoutV2>
                        </Authenticated>
                    }
                >
                    {adminRoutes()}
                </Route>
            ) : null}

            {/* Login, Auth */}
            <Route
                element={
                    <Authenticated fallback={<Outlet />}>
                        <NavigateToResource />
                    </Authenticated>
                }
            >
                <Route path="/refine/login" element={<Login />} />
                {/* <Route path="/refine/register" element={<AuthPage type="register" />} />
                <Route path="/refine/forgot-password" element={<AuthPage type="forgotPassword" />} /> */}
            </Route>
            {/* Content */}
            <Route element={<ContentLayout />}>
                {contentRoutes()}
                <Route path="*" element={<ErrorComponent />} />
            </Route>
        </Routes>
    );
};

export default index;
