import React, {useState} from "react";
import {
  MenuFoldOutlined,
  PieChartOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Button, Menu, Typography } from "antd";
import {useNavigate} from 'react-router-dom'

function getItem(label, key, icon, type) {
  return {
    key,
    icon,
    label,
    type,
  };
}

const items = [
  getItem("Chia sẻ khoá", "1", <PieChartOutlined />),
  getItem("Mã hoá DES", "2", <DesktopOutlined />),
];
const { Paragraph } = Typography;

var MenuUI = (props) => {
  var {selectedKey} = props

  var [collapsed, setCollapsed] = useState(false);
  var navigate = useNavigate()

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      style={{
        width: 256,
        marginTop: 50,
        marginLeft: 10,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={[selectedKey]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        onSelect={(item) => {
          item.key == 2 ? navigate("/DES") : navigate("/")
        }}
      />
    </div>
  );
};

export default MenuUI;
