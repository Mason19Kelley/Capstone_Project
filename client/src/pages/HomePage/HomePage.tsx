
import './HomePage.css'
import { Avatar, Layout, Menu, MenuProps, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { HomeOutlined, UserOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard';
import LoginPage from '../Login/LoginPage';
import { AuthContext } from '../../context/AuthContext';
import Account from '../../components/Account/Account';
import Courses from '../../components/Courses/Courses';



const layoutStyle = {
  width: '100%',
  height: '100vh', 
  display: 'flex', 
};

const contentStyle: React.CSSProperties = {
  flex: 1, 
  overflowY: 'auto', 
  padding: '20px',
  backgroundColor: '#dbdbdb',
  backgroundSize: '100%',
  textAlign: 'center',
  lineHeight: '120px',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#002F8B',
  width: '17%', 
  overflowY: 'auto', 
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Dashboard', 'Dashboard', <HomeOutlined />), getItem('Courses', 'Courses', <ProfileOutlined />), getItem('Account', 'Account', <UserOutlined />), getItem('Logout', 'Logout', <LogoutOutlined />)
];

function HomePage() {
  const [page, setPage] = useState('Dashboard');
  const { user } = useContext(AuthContext)
  const { username } = user || {};
  const renderPage = () => {
    console.log(user)
    switch (page) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Courses':
        return <Courses />;
      case 'Account':
        return <Account />;
      case 'Logout':
        return null;
      default:
        return null;
    }
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    setPage(key);
    console.log(page)
  };

  return (
    <div>
      <Layout style={layoutStyle}>
        <Layout>
          <Sider width="17%" style={siderStyle}>
            <div className="title">
              <Typography.Title level={2} className='text-left align-middle'>
                <div className = "brand">
                Surge
                </div>
              </Typography.Title>
            </div>
            <div className="user">
              <Avatar style={{backgroundColor: '#3e74c9'}} size={160} icon={<UserOutlined />} />
              <Typography.Title level={3} style={{ color: 'white' }}>
                <div className='emName'>
                  { username }
                </div>
              </Typography.Title>
            </div>
            <Menu
              style={{ width: '100%', backgroundColor: '#002F8B' }}
              defaultSelectedKeys={['Dashboard']}
              mode="vertical"
              onClick={handleMenuClick}
              items={items}
            />
          </Sider>
          <Content style={contentStyle}>
            {renderPage()}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default HomePage;
