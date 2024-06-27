import React, {useEffect, useState} from 'react';
import { DollarOutlined, FileOutlined, FallOutlined, BarChartOutlined, UserOutlined, CalendarOutlined, HomeFilled, SettingFilled
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme, Flex, Space } from 'antd';
import './Layout.css';
import Icon from '@ant-design/icons/lib/components/Icon';
import { BrowserRouter, Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import HomePage from '../pages/HomePage';
import IncomesExpenses from './IncomesExpenses';
import Reports from './Reports';
import MyCalendar from './MyCalendar';
import UserPanel from './UserPanel'

const { Header, Footer, Sider, Content } = Layout;



const LayoutStyle = ({userinfo, email, getnames, loginkey}) => {

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const loading = true;
  const [getincomes, setGetincomes] = useState([]);
  const [addincomes, setAddincomes] = useState([]);
  const [getexpenses, setGetexpenses] = useState([]);
  const [addexpenses, setAddexpenses] = useState([]);
  const [totalincome, setTotalincome] = useState(0);
  const [totalexpense, setTotalexpense] = useState(0);
  const [holdincome, setHoldincome] = useState(0);
  const [holdexpense, setHoldexpense] = useState(0);

  useEffect(() => {
    setAddincomes(getincomes)
    setHoldincome(totalincome)
  }, [getincomes])

  useEffect(() => {
    setAddexpenses(getexpenses)
    setHoldexpense(totalexpense)
  }, [getexpenses])


  const [states, setStates] = useState({
    menu1: false,
    menu2: true,
    menu3: false,
    menu4: false
  });

  const handleToggle = (key) => {
    setStates((prevStates) => {
      const newState = {
        menu1: false,
        menu2: false,
        menu3: false,
        menu4: false
      };
      newState[key] = true;
      return newState;
    });
  }



  return(

    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div/>
        <Menu theme='dark' defaultSelectedKeys={['2']} mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />} onClick={() => handleToggle('menu1')}>My Profile</Menu.Item>
          <Menu.Item key="2" icon={<DollarOutlined />} onClick={() => handleToggle('menu2')}>Incomes - Expenses</Menu.Item>
          <Menu.Item key="3" icon={<CalendarOutlined />} onClick={() => handleToggle('menu3')}>My Calendar</Menu.Item>
          <Menu.Item key="4" icon={<FileOutlined />} onClick={() => handleToggle('menu4')}>Reports</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            paddingLeft: 30,
            background: "rgba(2, 2, 111, 1)",
            fontSize: "24px",
            fontWeight: "bold",
            color: "white",
            height: 70,
          }}>
            {states.menu1 && (<div>My Profile</div>)}
            {states.menu2 && (<div>About Incomes and Expenses</div>)}
            {states.menu3 && (<div>My Budget Calendar</div>)}
            {states.menu4 && (<div>Get a Report</div>)}
          </Header>
        <Content
          style={{
            margin: '0 16px',
          }}>
            <div>
            {states.menu1 && (<UserPanel userinfo={userinfo} email={email} getnames={getnames} loginkey={loginkey}></UserPanel>)}
            {states.menu2 && (<IncomesExpenses setGetincomes={setGetincomes} addincomes={addincomes} addexpenses={addexpenses}
            setGetexpenses={setGetexpenses} setTotalincome={setTotalincome} holdincome={holdincome} 
            setTotalexpense={setTotalexpense} holdexpense={holdexpense} totalincome={totalincome} totalexpense={totalexpense}></IncomesExpenses>)}
            {states.menu3 && (<MyCalendar addincomes={addincomes} addexpenses={addexpenses}></MyCalendar>)}
            {states.menu4 && (<Reports></Reports>)}
            </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Budget Manager @ 2024
        </Footer>
      </Layout>
    </Layout>
  )
};

export default LayoutStyle;