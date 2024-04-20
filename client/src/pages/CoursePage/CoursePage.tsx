import { Image, Layout, theme, Card, ConfigProvider, Button, Menu, Tooltip } from "antd";
import './CoursePage.css';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { Link, useParams } from "react-router-dom";
import { CourseAPI } from "../../api/CourseAPI";
import { useContext, useEffect, useState } from "react";
import Meta from 'antd/es/card/Meta';
import { PlaySquareOutlined } from "@ant-design/icons";
import { AuthAPI } from "../../api/AuthAPI";
import { Role } from "../../models/role.model"
import { HomeOutlined, ProfileOutlined } from '@ant-design/icons';
import { AuthContext } from "../../context/AuthContext";
import { PageContext } from "../../context/PageContext";
import { StepContext } from "../../context/StepContext";


const { Header, Content } = Layout;

let innerModules: {[counter: number]: string} = {};

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

function generateModule(inner: boolean, index: number, jsonInfo: course | undefined, mIndex?: number){
  const { setCurrentStep } = useContext(StepContext);
  let { id } = useParams();
  
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
          type="inner" style={{background: '#fafafa', marginBottom: '1vh', textAlign: "left"}}>
            <Link to={`/courseModule/${id}`}>
              <Meta title={moduleName}/>
            </Link>
        </Card>
      )
    } else {
      return (
        <Link to={`/courseModule/${id}`}>
          <Card onClick={handleClickWrapper}
            type="inner" title={moduleName} style={{marginBottom: '1vh'}}>
              {moduleContent?.Description}
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
      <Card title={jsonInfo?.modules[index].moduleName} style={{ marginBottom: '5vh', background: 'lightgrey'}}>
        {cards.map(card => <div>{card}</div>)}
      </Card>
    )
  }
}

function createModule(jsonInfo: course | undefined): JSX.Element[] {
  innerModules = [];
  const cards: JSX.Element[] = [];

  for (let index = 0; index < (jsonInfo?.modules.length || 1); index++){
    cards.push(generateModule(false, index, jsonInfo))
  }

  return cards
}

function createAdminButton(uid: number | undefined, courseName: string): JSX.Element {
 const [role, setRole] = useState<Role>();

  useEffect(() => {
    if(uid){
      AuthAPI.getUser(uid).then((data: any) => {
        setRole(data['role'])
      })
    }
  }, [uid])
  
  if(role?.id == (1 || 2)){
    return (
      <Menu.Item key="EditCourse">
        <Link to={`/editCourse/${courseName}`}>
          <span>Edit Course</span>
        </Link>
      </Menu.Item>
    )
  } else {
    return <Menu.Item/>
  }
}

const CoursePage: React.FC = () => {
  let { id } = useParams();

  const [selectedCourse, setselectedCourse] = useState<course>();
  const [instructor, setInstructor] = useState<string>('');
  const [courseName, setcourseName] = useState<string>('');
  const { user } = useContext(AuthContext)
  const { setPage } = useContext(PageContext)
  const { setCurrentStep } = useContext(StepContext)


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

  const optionalMenuItem  = createAdminButton(user?.id, courseName)
    
  const handleMenuClick = ({ key }: { key: string }) => {
    setPage(key);
  };
  
  const handleContenClick = () => {
    setCurrentStep(0)
  }
  
  const {
      token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
    
  const module = createModule(selectedCourse);

  return (
  <Layout style={{minHeight: '100vh'}}>
      <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{flex:1 , minWidth: 0}}
        onClick={handleMenuClick}
        >
          <Menu.Item key="Dashboard" icon={<HomeOutlined />}>
            <Link to={`/home`}>
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="Courses" icon={<ProfileOutlined />}>
            <Link to={'/home'}>
              Courses
            </Link>
          </Menu.Item>
          {optionalMenuItem}
        </Menu>
      </Header>
    <div className='headerImage'>
        <Image
          width= '100%'
          height = '98%'
          src = {headerImg}
          preview = {false}
        />
      </div>
    <Content style={{ padding: '0 48px' }}>
      <div
        style={{
          padding: 24,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <div className="flex flex-row justify-between">
        <h1 className='self-start' style= {{color: 'black', fontFamily: 'Playfair-Display', paddingLeft: '1vw', paddingBottom: '2vh', textAlign: "left"}}>
          {courseName}
        </h1>
        <Link to={`/courseModule/${id}`}>
          <Tooltip placement="bottom" title='Start Course'>
            <Button onClick={handleContenClick} type="primary" icon={<PlaySquareOutlined />}>
              Go to start
          </Button>
          </Tooltip>
        </Link>
      </div>
      <h2 style={{color: 'black', fontFamily: 'Playfair-Display', paddingLeft: '1vw', paddingBottom: '2vh', textAlign: "left"}}>
        Taught by: {instructor}
      </h2>
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