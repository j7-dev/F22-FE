import React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import Header from "@/components/Header";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "@/pages/Admin/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "@/pages/Admin/categories";

import ContentLayout from "@/components/Layout";
import ContentAbout from "@/pages/Content/About";
import ContentHome from "@/pages/Content/Home";
import ContentPromotionPage from "@/pages/Content/Promotion";
import ContentLive from "@/pages/Content/Taxonomy/Live";
import ContentEvolution from "@/pages/Content/Taxonomy/Evolution";
import ContentPragmatic from "@/pages/Content/Taxonomy/Pragmatic";
import ContentSlot from "@/pages/Content/Taxonomy/Slot";
import ContentTermsOfService from "@/pages/Content/TermsOfService";
import ContentCustomer from "@/pages/Content/Customer";
import ContentWallet from "@/pages/Content/Wallet";

const index = () => {
  return (
    <Routes>
      {/* Admin */}
      <Route
        element={
          <Authenticated fallback={<CatchAllNavigate to="/refine/login" />}>
            <ThemedLayoutV2
              Header={() => <Header sticky />}
              Sider={(props) => <ThemedSiderV2 {...props} fixed />}
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
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
                  email: "demo@refine.dev",
                  password: "demodemo",
                },
              }}
            />
          }
        />
        <Route path="/refine/register" element={<AuthPage type="register" />} />
        <Route
          path="/refine/forgot-password"
          element={<AuthPage type="forgotPassword" />}
        />
      </Route>
      {/* Content */}
      <Route element={<ContentLayout />}>
        <Route path="/" element={<ContentHome />} />
        <Route path="/about" element={<ContentAbout />} />
        <Route path="/promotion" element={<ContentPromotionPage />} />
        <Route path="/live" element={<ContentLive />} />
        <Route path="/evolution" element={<ContentEvolution />} />
        <Route path="/pragmatic" element={<ContentPragmatic />} />
        <Route path="/slots" element={<ContentSlot />} />
        <Route path="/terms-of-service" element={<ContentTermsOfService />} />
        <Route path="/customer" element={<ContentCustomer />} />
        <Route path="/wallet" element={<ContentWallet />} />
      </Route>
    </Routes>
  );
};

export default index;
