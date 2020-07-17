import React, {useState} from "react"
import 'antd/dist/antd.css';
import { Menu, Layout } from 'antd';
import { DailyTop } from "./dailyTop"
import { DailyCard } from "./dailyCard"
import "./Layout.css"
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;


export const PageLayout = () => {
  const [collapsed, onCollapse] = useState(false)
  let isMobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)
  if (isMobile) {
    return <DailyCard/>
  }
  function handleClick(e){
    console.log('click ', e);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme="light">
        <div className="logo" style={{height:64}}>
          <h1 style={{textAlign: "center", lineHeight:"64px"}}><b>{!collapsed?"Daily Pixiv":"DP"}</b></h1>
        </div>
        <Menu
      onClick={(e)=>handleClick(e)}
      // style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      >
        <Menu.Item key="1">每周TOP(卡片)</Menu.Item>
        <Menu.Item key="2">每周TOP(表格)</Menu.Item>
        {/*<Menu.Item key="3">Tab 3</Menu.Item>*/}
        {/*<Menu.Item key="4">Tab 4</Menu.Item>*/}
      </Menu>
    </Sider>
    <Content><DailyCard/></Content>
    </Layout>
  )
}