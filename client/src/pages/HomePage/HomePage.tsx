
import './HomePage.css'
import { Avatar, Layout, Menu, MenuProps, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { HomeOutlined, UserOutlined, ProfileOutlined, LogoutOutlined, TeamOutlined, SettingOutlined, CheckOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard';
import { AuthContext } from '../../context/AuthContext';
import Account from '../../components/Account/Account';
import Cookies from 'js-cookie';
import Admin from '../../components/Admin/Admin';
import Management from '../../components/Course_Management/Management';
import EditCourse from '../EditPage/Editcourse';
import CourseProgress from '../../components/CourseProgress/CourseProgress';
import CoursesList from '../../components/Courses/Courses';



const layoutStyle = {
  width: '100%',
  height: '100vh', 
  display: 'flex', 
};

const contentStyle: React.CSSProperties = {
  flex: 1, 
  overflowY: 'auto', 
  padding: '0px',
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
  minWidth: "215px",
  overflowY: 'auto', 
};

// Seeding the courses into the user (TODO: seed this in seed file
// function seedCourses(id: number | undefined) {
//   // created for testing purposes, inserting user into courses
//   if(id != undefined) {
//     CourseAPI.insertUser(2, id ?? 0)
//     CourseAPI.insertUser(1, id ?? 0)
//     CourseAPI.insertUser(3, id ?? 0)
//   }
// }

function HomePage() {
  const [page, setPage] = useState('Dashboard');
  const { setLoggedIn, user, setUser, setOrganization } = useContext(AuthContext)
  const { fullName } = user || {}

  setOrganization(user?.organization?.orgName || null)

  //seedCourses(id);
  const renderPage = () => {

    switch (page) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Courses':
        return <CoursesList />;
      case 'Account':
        return <Account />;
      case 'Admin':
        return <Admin />
      case 'Management':
        return <Management />
      case 'editCourse':
        return <EditCourse />
      case 'User Course Progress':
        return <CourseProgress />
      case 'Logout':
        logOut()
        return null;
      default:
        return null;
    }
  };

  const logOut = () => {
    Cookies.remove('token')
    setLoggedIn(false)
    setUser(null)

  }

  const handleMenuClick = ({ key }: { key: string }) => {
    setPage(key);
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
    getItem('Dashboard', 'Dashboard', <HomeOutlined />), getItem('Courses', 'Courses', <ProfileOutlined />), (user?.role?.roleName === 'Systems Admin' || user?.role?.roleName === 'Administrator') ? getItem('User Course Progress', 'User Course Progress', <CheckOutlined />) : null, getItem('Account', 'Account', <UserOutlined />), (user?.role?.roleName === 'Systems Admin' || user?.role?.roleName === 'Administrator') ? getItem('Admin', 'Admin', <TeamOutlined />) : null,(user?.role?.roleName === 'Systems Admin' || user?.role?.roleName === 'Administrator') ? getItem('Course Management', 'Management', <SettingOutlined />) : null, getItem('Logout', 'Logout', <LogoutOutlined />)
  ];

  return (
    <div>
      <Layout style={layoutStyle}>
        <Layout>
          <Sider width="17%" style={siderStyle} className="sider">
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
                  { fullName }
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
