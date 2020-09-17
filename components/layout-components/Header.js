import {
  LogoutOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Menu } from "antd";
import styled from "styled-components";
import { Logo } from "./LogoTitle";
import Link from "next/link";
import { useOAuth } from "../../context/auth";
import nookies from "nookies";
import Router from "next/router";

const { Header } = Layout;

const TriggerBlock = styled.div`
  display: inline-block;
  height: 100%;
`;

const StyledImageBlock = styled(TriggerBlock)`
  @media (min-width: 576px) {
    display: none !important;
  }

  padding-left: 24px;
`;

const MobileLogo = styled(Logo)`
  vertical-align: -10px;
`;

const HeaderBlock = styled(TriggerBlock)`
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
`;

const MyMenu = () => {
  const { logout, user } = useOAuth();

  return (
    <Menu
      onClick={(item) => {
        if (item.key == "logout") {
        }
      }}
    >
      <Menu.Item key="logout">
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );
};

const MyHeader = ({ collapsed, handleToggle }) => {
  const { isAuthenticated } = useOAuth();

  return (
    <Header
      style={{
        background: "#fff",
        padding: 0,
        boxShadow: "0 1px 4px rgba(0,21,41,.08)",
        display: "flex",
      }}
    >
      <Link href="/">
        <a>
          <StyledImageBlock>
            <MobileLogo src="/static/transparent-logo.png" alt="logo" />
          </StyledImageBlock>
        </a>
      </Link>

      <TriggerBlock>
        {collapsed ? (
          <MenuUnfoldOutlined
            className="trigger"
            onClick={handleToggle}
            style={{
              fontSize: 20,
              verticalAlign: "middle",
            }}
          />
        ) : (
          <MenuFoldOutlined
            className="trigger"
            onClick={handleToggle}
            style={{
              fontSize: 20,
              verticalAlign: "middle",
            }}
          />
        )}
      </TriggerBlock>

      {isAuthenticated && (
        <div
          style={{
            marginLeft: "auto",
          }}
        >
          <Dropdown overlay={<MyMenu />} placement="bottomRight">
            <HeaderBlock>
              <UserOutlined
                style={{ fontSize: 16, marginRight: 8 }}
                title="User"
              />
              <span>Admin</span>
            </HeaderBlock>
          </Dropdown>
        </div>
      )}
    </Header>
  );
};

export default MyHeader;
