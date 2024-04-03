import { useState } from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Header, Content, Footer } from "antd/es/layout/layout";
import Icon, { BellFilled } from "@ant-design/icons";

import { useAuthStore } from "../store";
import Logo from "../components/icons/logo";
import UserIcon from "../components/icons/UserIcon";
import FoodIcon from "../components/icons/FoodIcon";
import HomeIcon from "../components/icons/home";
import GiftIcon from "../components/icons/GiftIcon";
import BasketIcon from "../components/icons/BasketIcon";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";

const getMenuItems = (role: string) => {
  const baseItems = [
    {
      key: "/",
      icon: <Icon component={HomeIcon} />,
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: "/restaurants",
      icon: <Icon component={FoodIcon} />,
      label: <NavLink to="/restaurants">Restaurants</NavLink>,
    },
    {
      key: "/products",
      icon: <Icon component={BasketIcon} />,
      label: <NavLink to="/products">Products</NavLink>,
    },
    {
      key: "/promos",
      icon: <Icon component={GiftIcon} />,
      label: <NavLink to="/promos">Promos</NavLink>,
    },
  ];

  if (role === "admin") {
    let menuItems = [...baseItems];

    menuItems.splice(1, 0, {
      key: "/users",
      icon: <Icon component={UserIcon} />,
      label: <NavLink to="/users">Users</NavLink>,
    });

    return menuItems;
  }

  return baseItems;
};

const Dashboard = () => {
  const { logout: storeLogout, user } = useAuthStore();

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const items = getMenuItems(user?.role ?? "");

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      storeLogout();
      return;
    },
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (user === null)
    return (
      <Navigate
        to={`/auth/login?returnTo=${location.pathname}`}
        replace={true}
      />
    );

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          theme="light"
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">
            <Logo />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: "0 16px", background: colorBgContainer }}>
            <Flex gap="middle" align="start" justify="space-between">
              <Badge
                text={
                  user.role === "admin" ? "You are an admin" : user.tenant?.name
                }
                status="success"
              />
              <Space size={16}>
                <Badge dot={true}>
                  <BellFilled style={{ cursor: "pointer" }} />
                </Badge>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        label: "Logout",
                        onClick: () => logoutMutate(),
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <Avatar
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  >
                    U
                  </Avatar>
                </Dropdown>
              </Space>
            </Flex>
          </Header>
          <Content style={{ margin: "24px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Mern Space Pizza Shop ©{new Date().getFullYear()} Created by Shivam
            Vijaywargi
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
