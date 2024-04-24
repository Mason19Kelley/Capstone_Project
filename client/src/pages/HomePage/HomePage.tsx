
import './HomePage.css'
import { Avatar, Layout, Menu, MenuProps, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { HomeOutlined, UserOutlined, LogoutOutlined, TeamOutlined, SettingOutlined, CheckOutlined } from '@ant-design/icons';
import { useContext } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import Admin from '../../components/Admin/Admin';
import Management from '../../components/Course_Management/Management';
import EditCourse from '../EditPage/Editcourse';
import { PageContext } from '../../context/PageContext';
import CourseProgress from '../../components/CourseProgress/CourseProgress';

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
  backgroundColor: '#4A7EE6',
  width: '17%', 
  minWidth: "215px",
  overflowY: 'auto', 
};

function HomePage() {
  const { page, setPage} = useContext(PageContext);
  //const [page, setPage] = useState('Dashboard');
  const { setLoggedIn, user, setUser, setOrganization } = useContext(AuthContext)
  const { fullName } = user || {}

  setOrganization(user?.organization?.orgName || null)

  //seedCourses(id);
  const renderPage = () => {

    switch (page) {
      case 'Dashboard':
        return <Dashboard />;
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
    getItem('Dashboard', 'Dashboard', <HomeOutlined />), (user?.role?.roleName === 'Systems Admin' || user?.role?.roleName === 'Administrator') ? getItem('User Course Progress', 'User Course Progress', <CheckOutlined />) : null, (user?.role?.roleName === 'Systems Admin' || user?.role?.roleName === 'Administrator') ? getItem('Admin', 'Admin', <TeamOutlined />) : null,(user?.role?.roleName === 'Systems Admin' || user?.role?.roleName === 'Administrator') ? getItem('Course Management', 'Management', <SettingOutlined />) : null, getItem('Logout', 'Logout', <LogoutOutlined />)
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
              <Avatar style={{backgroundColor: '#A4BFE8'}} size={160} icon={<UserOutlined />} />
              <Typography.Title level={3} style={{ color: 'white' }}>
                <div className='emName'>
                  { fullName }
                </div>
              </Typography.Title>
            </div>
            <div className='sideMenu'>
            <Menu
              style={{ width: '100%', backgroundColor: '#4A7EE6', fontSize: '1em'}}
              defaultSelectedKeys={['Dashboard']}
              mode="vertical"
              onClick={handleMenuClick}
              items={items}
            />
            </div>
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
