import { Breadcrumb, Layout, Menu, MenuProps } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
//const { Header, Content, Footer } = Layout;

export default function Root() {
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate(e.key);
  };

  const items: MenuProps['items'] = [
    {
      label: 'Home',
      key: 'home',
      onClick: onClick,
    },
    {
      label: 'Products',
      key: 'products',
      onClick: onClick,
    },
    {
      label: 'Categories',
      key: 'categories',
      onClick: onClick,
    },
    {
      label: 'Users',
      key: 'users',
      onClick: onClick,
    },
  ];

  return (
    <>
      <Layout className='layout'>
        <Header>
          <div className='logo' />
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['2']}
            items={items}
          />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            className='site-layout-content'
            style={{ background: 'transparent' }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </>
  );
}
