import { Image, Layout, theme, Card, ConfigProvider, Button, Menu, Tooltip, MenuProps, Typography, Avatar } from "antd";
import './CoursePage.css';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseAPI } from "../../api/CourseAPI";
import { useContext, useEffect, useState } from "react";
import Meta from 'antd/es/card/Meta';
import { CheckOutlined, LogoutOutlined, PlaySquareOutlined, SettingOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { HomeOutlined } from '@ant-design/icons';
import { AuthContext } from "../../context/AuthContext";
import { PageContext } from "../../context/PageContext";
import { StepContext } from "../../context/StepContext";

const { Sider, Content } = Layout;

// Style for Sider
const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#4A7EE6',
  width: '17%', 
  minWidth: "215px",
  overflowY: 'auto', 
};

// counter to let CourseModule know what module to show
let innerModules: {[counter: number]: string} = {};

// Template for json information
interface course {
  courseName : string,
  modules :
      {
          moduleName : string,
          moduleID: string,
          content :
              {
                  contentType : string | null,
                  fileType : string | null,
                  fileName : string | null,
                  quizID : number | null,
                  Description : string | null
              }[]
      }[]
}

// Genertate the course modules recursivley, returns card html
function generateModule(inner: boolean, index: number, jsonInfo: course | undefined, mIndex?: number){
  const { setCurrentStep } = useContext(StepContext);
  let { id } = useParams();

  const innerStyle: React.CSSProperties = {
    marginBottom: '1vh', 
    textAlign: "left",
    borderBlockWidth: '1vw', 
    borderBlockColor: '#ECECEC',
    
  }

  const outerStyle: React.CSSProperties = {
    marginBottom: '5vh', 
    background: '#D0E2F0', 
    borderBlockWidth: '1vw', 
    borderBlockColor: '#B1D0E7',
  }

  const descFontStyle: React.CSSProperties = {
    fontFamily: 'Oswald',
    fontSize: '1.3em'
  }

  const titleFontStyle: React.CSSProperties = {
    fontFamily: 'Oswald',
    fontSize: '1.5em'
  }

  const altTitleFontStyle: React.CSSProperties = {
    fontFamily: 'Oswald',
    fontSize: '1.6em'
  }

  const moduleFontStyle: React.CSSProperties = {
    fontFamily: 'Playfair',
    fontSize: '1.6em'
  }
  
  // This is the actual click Handle, it finds the index that correlates to the content in CourseModule
  // And sets the page to that in CourseModule, before moving to that page
  const handleMenuClick = (fileName: string) => {
    let step = '';
    for (const pIndex in innerModules){
      if(innerModules[pIndex] == fileName){
        step = pIndex
      }
    }
    setCurrentStep(parseInt(step));
  };

  if (inner && mIndex != undefined){
    const moduleContent = jsonInfo?.modules[mIndex].content[index];
    const moduleName = moduleContent?.fileName || "Default";

    const handleClickWrapper = () => {
      handleMenuClick(moduleName)
    }

    if(!innerModules[mIndex]) {
      innerModules[mIndex] = moduleName;
    }
    if(moduleContent?.Description == null){
      return(
        <Card onClick={handleClickWrapper} 
          type="inner" style={innerStyle}>
            <Link to={`/courseModule/${id}`}>
              <Meta style={{fontFamily: 'Oswald'}} 
              title=<span style={titleFontStyle}>{moduleName}</span>/>
            </Link>
        </Card>
      )
    } else {
      return (
        <Link to={`/courseModule/${id}`}>
          <Card onClick={handleClickWrapper}
            type="inner" 
            title=<span style={altTitleFontStyle}>{moduleName}</span> style={innerStyle}>
              <span style={descFontStyle}>{moduleContent?.Description}</span>
          </Card>
        </Link>
        )
      }
  } else {
    const cards: JSX.Element[] = [];
    if(jsonInfo?.modules[index].content.length || 1 > 0){
      for (let ind = 0; ind < (jsonInfo?.modules[index].content.length || 1); ind++){
        cards.push(generateModule(true, ind, jsonInfo, index))
      }
    }
    return(
      <Card title=<span style={moduleFontStyle}>{jsonInfo?.modules[index].moduleName}</span> style={outerStyle} >
        {cards.map(card => <div>{card}</div>)}
      </Card>
    )
  }
}

// Create all the different modules
function createModule(jsonInfo: course | undefined): JSX.Element[] {
  innerModules = [];
  const cards: JSX.Element[] = [];

  for (let index = 0; index < (jsonInfo?.modules.length || 1); index++){
    cards.push(generateModule(false, index, jsonInfo))
  }

  return cards
}

const CoursePage: React.FC = () => {
  // Gathering all info for page
  let { id } = useParams();

  const [selectedCourse, setselectedCourse] = useState<course>();
  const [instructor, setInstructor] = useState<string>('');
  const [courseName, setcourseName] = useState<string>('');
  const { user } = useContext(AuthContext)
  const { setPage } = useContext(PageContext)
  const { setCurrentStep } = useContext(StepContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(id){
      CourseAPI.getCourses(parseInt(id || '')).then((data: any) => {
        const jsonInformation = JSON.parse(data['jsonInformation']);
        setInstructor(data['instructor']);
        setcourseName(data['courseName']);
        setselectedCourse(jsonInformation);
      })
    }
  }, [id])

  // Setting up the menu for the sidebar
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
      label: <span style={{fontFamily: 'Oswald'}}>{label}</span>,
      type,
    } as MenuItem;
  }

  const items: MenuProps['items'] = [
    getItem('Dashboard', 'Dashboard', <HomeOutlined />), (user?.role?.roleName === 'Systems Admin' || user?.role?.roleName === 'Administrator') ? getItem('User Course Progress', 'User Course Progress', <CheckOutlined />) : null, (user?.role?.roleName === 'Systems Admin' || user?.role?.roleName === 'Administrator') ? getItem('Admin', 'Admin', <TeamOutlined />) : null,(user?.role?.roleName === 'Systems Admin' || user?.role?.roleName === 'Administrator') ? getItem('Course Management', 'Management', <SettingOutlined />) : null, getItem('Logout', 'Logout', <LogoutOutlined />)
  ];
  
  // Setting the homepage page
  const handleMenuClick = ({ key }: { key: string }) => {
    setPage(key);
    navigate('/home')
  };
  
  // Logic for Go-To-Start button
  const handleContenClick = () => {
    setCurrentStep(0)
  }
  
  const {
      token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
    
  const module = createModule(selectedCourse);

  return (
  <Layout style={{minHeight: '100vh'}}>
    <Sider width="17%" style={siderStyle} className="csider">
      <div className="ctitle">
        <Typography.Title level={2} className='text-left align-middle'>
          <div className = "cbrand">
            Surge
            </div>
        </Typography.Title>
      </div>
      <div className="cuser">
        <Avatar style={{backgroundColor: '#A4BFE8'}} size={160} icon={<UserOutlined />} />
          <Typography.Title level={3} style={{ color: '#0c2245', paddingTop: '15px' }}>
            <div className='cemName'>
              { user?.fullName }
            </div>
          </Typography.Title>
      </div>
      <div className='csideMenu'>
        <Menu className="csideMenu" 
          style={{ width: '100%', backgroundColor: '#4A7EE6', fontSize: '125%'}}
          mode="vertical"
          onClick={handleMenuClick}
          items={items}
          />
      </div>
    </Sider>
    <Content>
      <div className='headerImage'>
        <Image
          width= '100%'
          height = '98%'
          src = {headerImg}
          preview = {false}
        />
      </div>
      <h1 style= {{color:'#0c2245', paddingTop: 10, marginLeft: "1%", textAlign: "start"}}>{courseName}</h1>
      <div
        style={{
          padding: 24,
          paddingTop: 20,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
      <div className="flex flex-row justify-between">
        <h2 style={{color: 'black', fontFamily: 'Playfair-Display', paddingLeft: '1vw', paddingBottom: '2vh', textAlign: "left"}}>
          Taught by: {instructor}
        </h2>
        <Link to={`/courseModule/${id}`}>
          <Tooltip placement="bottom" title='Start Course'>
            <Button style={{background: '#F34B4B'}}onClick={handleContenClick} type="primary" icon={<PlaySquareOutlined />}>
              Go to start
          </Button>
          </Tooltip>
        </Link>
      </div>
      <div className="modules" >
      <ConfigProvider>
          {module.map(card => <div className="w-[99%] ml-[1%]">{card}</div>)}
      </ConfigProvider>
      </div>
    </div>
    </Content>
  </Layout>
  );
};

  
export default CoursePage;