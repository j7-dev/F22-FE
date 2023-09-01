import React from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import { Authenticated } from '@refinedev/core';
import { AuthPage, ErrorComponent, ThemedLayoutV2 } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import {
    CatchAllNavigate,
    NavigateToResource,
} from '@refinedev/react-router-v6';
import { Header, Sider } from '@/components/RefineLayout';
import {
    BlogPostCreate,
    BlogPostEdit,
    BlogPostList,
    BlogPostShow,
} from '@/pages/Admin/blog-posts';
import {
    CategoryCreate,
    CategoryEdit,
    CategoryList,
    CategoryShow,
} from '@/pages/Admin/categories';
import ContentLayout from '@/components/Layout';
import contentRoutes from '@/routes/content';
import refineRoutes from '@/routes/refine';

const index = () => {
    return (
        <Routes>
            {/* Admin */}
            <Route
                element={
                    <Authenticated
                        fallback={<CatchAllNavigate to="/refine/login" />}
                    >
                        <ThemedLayoutV2
                            Header={() => <Header sticky />}
                            Sider={Sider}
                        >
                            <Outlet />
                        </ThemedLayoutV2>
                    </Authenticated>
                }
            >
                {refineRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                        children={route.children}
                    />
                ))}
                <Route path="/refine/blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                </Route>
                <Route path="/refine/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
            </Route>
            {/* Login, Auth */}
            <Route
                element={
                    <Authenticated fallback={<Outlet />}>
                        <NavigateToResource />
                    </Authenticated>
                }
            >
                <Route
                    path="/refine/login"
                    element={
                        <AuthPage
                            type="login"
                            formProps={{
                                initialValues: {
                                    email: '',
                                    password: '',
                                },
                            }}
                        />
                    }
                />
                <Route
                    path="/refine/register"
                    element={<AuthPage type="register" />}
                />
                <Route
                    path="/refine/forgot-password"
                    element={<AuthPage type="forgotPassword" />}
                />
            </Route>
            {/* Content */}
            <Route element={<ContentLayout />}>
                {contentRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                        children={route.children}
                    />
                ))}
            </Route>
        </Routes>
    );
};

export default index;
