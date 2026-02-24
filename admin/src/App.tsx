import { Refine, Authenticated, I18nProvider, useGetIdentity } from "@refinedev/core";
import {
  ThemedLayoutV2,
  ErrorComponent,
  useNotificationProvider,
  RefineThemes,
  AuthPage,
} from "@refinedev/antd";
import { Spin } from "antd";
import { ConfigProvider, App as AntdApp } from "antd";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { TeamOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "@refinedev/antd/dist/reset.css";
import "./style.css";
import "./i18n";

import { authProvider } from "./authProvider";
import { accessControlProvider } from "./accessControlProvider";
import { Header } from "./components/Header";
import logoImg from "./img/logo.png";

import { ClientList } from "./pages/clients/list";
import { ClientCreate } from "./pages/clients/create";
import { ClientEdit } from "./pages/clients/edit";
import { ClientShow } from "./pages/clients/show";

import { MyCompanyList } from "./pages/my-companies/list";
import { MyCompanyCreate } from "./pages/my-companies/create";
import { MyCompanyEdit } from "./pages/my-companies/edit";
import { MyCompanyShow } from "./pages/my-companies/show";

import { InvoiceList } from "./pages/invoices/list";
import { InvoiceCreate } from "./pages/invoices/create";
import { InvoiceShow } from "./pages/invoices/show";

import { ActList } from "./pages/acts/list";
import { ActCreate } from "./pages/acts/create";
import { ActShow } from "./pages/acts/show";

import { UserList } from "./pages/users/list";
import { UserCreate } from "./pages/users/create";
import { UserEdit } from "./pages/users/edit";
import { FileTextOutlined, SolutionOutlined, BankOutlined } from "@ant-design/icons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001/api";

const axiosInstance = axios.create();

const AdminOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: identity, isLoading } = useGetIdentity<{ role?: string }>();
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
        <Spin size="large" />
      </div>
    );
  }
  if ((identity?.role as string) !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  const i18nProvider: I18nProvider = {
    translate: (key: string, params: any) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(API_URL, axiosInstance)}
            authProvider={authProvider}
            accessControlProvider={accessControlProvider}
            i18nProvider={i18nProvider}
            notificationProvider={useNotificationProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "clients",
                list: "/clients",
                create: "/clients/create",
                edit: "/clients/edit/:id",
                show: "/clients/show/:id",
                meta: {
                  canDelete: true,
                  icon: <TeamOutlined />,
                  label: "Clients",
                },
              },
              {
                name: "my-companies",
                list: "/my-companies",
                create: "/my-companies/create",
                edit: "/my-companies/edit/:id",
                show: "/my-companies/show/:id",
                meta: {
                  canDelete: true,
                  icon: <BankOutlined />,
                  label: "My Companies",
                },
              },
              {
                name: "invoices",
                list: "/invoices",
                create: "/invoices/create",
                edit: "/invoices/edit/:id",
                show: "/invoices/show/:id",
                meta: {
                  canDelete: true,
                  icon: <FileTextOutlined />,
                  label: "Invoices",
                },
              },
              {
                name: "acts",
                list: "/acts",
                create: "/acts/create",
                edit: "/acts/edit/:id",
                show: "/acts/show/:id",
                meta: {
                  canDelete: true,
                  icon: <SolutionOutlined />,
                  label: "Acts",
                },
              },
              {
                name: "users",
                list: "/users",
                create: "/users/create",
                edit: "/users/edit/:id",
                meta: {
                  canDelete: true,
                  icon: <UserOutlined />,
                  label: "Users",
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              title: "Garm CRM",
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2
                      Header={() => <Header />}
                      Title={({ collapsed }) => (
                        <div style={{ 
                          height: '64px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: collapsed ? 'center' : 'flex-start',
                          padding: collapsed ? '4px' : '0 24px',
                          background: '#fff',
                          borderBottom: '1px solid #f0f0f0'
                        }}>
                          <div style={{ fontSize: collapsed ? '12px' : '20px', fontWeight: 'bold', color: '#1890ff' }}>
                            {collapsed ? 'G' : 'GARM CRM'}
                          </div>
                        </div>
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<NavigateToResource resource="clients" />} />
                <Route path="/clients">
                  <Route index element={<ClientList />} />
                  <Route path="create" element={<ClientCreate />} />
                  <Route path="edit/:id" element={<ClientEdit />} />
                  <Route path="show/:id" element={<ClientShow />} />
                </Route>
                <Route path="/my-companies">
                  <Route index element={<MyCompanyList />} />
                  <Route path="create" element={<MyCompanyCreate />} />
                  <Route path="edit/:id" element={<MyCompanyEdit />} />
                  <Route path="show/:id" element={<MyCompanyShow />} />
                </Route>
                <Route path="/invoices">
                  <Route index element={<InvoiceList />} />
                  <Route path="create" element={<InvoiceCreate />} />
                  <Route path="edit/:id" element={<InvoiceCreate />} />
                  <Route path="show/:id" element={<InvoiceShow />} />
                </Route>
                <Route path="/acts">
                  <Route index element={<ActList />} />
                  <Route path="create" element={<ActCreate />} />
                  <Route path="edit/:id" element={<ActCreate />} />
                  <Route path="show/:id" element={<ActShow />} />
                </Route>
                <Route path="/users" element={<AdminOnly><Outlet /></AdminOnly>}>
                  <Route index element={<UserList />} />
                  <Route path="create" element={<UserCreate />} />
                  <Route path="edit/:id" element={<UserEdit />} />
                </Route>
              </Route>
              
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="clients" />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      title={<div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff', marginBottom: '20px' }}>GARM CRM</div>}
                      registerLink={false}
                      forgotPasswordLink={false}
                    />
                  }
                />
              </Route>

              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
