import React, { useEffect } from 'react';
import { Button, Card, ConfigProvider, Image, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { Avatar, Layout, Menu, MenuProps } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import headerImg from '../../assets/Dashboard/DashboardHeader.png'
import { UserOutlined, TeamOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Box, ThemeProvider } from '@mui/system'

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


interface course {
  courseName : string,
  modules :
      {
          moduleName : string,
          content :
              {
                  contentType : string | null,
                  fileType : string | null,
                  fileLocation : string | null,
                  fileName : string | null,
                  quizID : number | null,
                  Description : string | null
              }[]
      }[]
}

const initialCourse: course = {
courseName : 'temp',
modules : [
    {
        moduleName : 'temp1',
        content : [
            {
                contentType : null,
                fileType : null,
                fileLocation :null,
                fileName : null,
                quizID : null,
                Description : null
            }]
    }]
}

const cyberInfo: course = {
  courseName: "Cyber",
  modules: [
      {
          moduleName: "Cyber 1",
          content: [
              {
                  contentType: "Quiz",
                  fileType: null,
                  fileLocation: null,
                  fileName: null,
                  quizID: 7,
                  Description: null,
              },
              {
                  contentType: "Media",
                  fileType: "pdf",
                  fileLocation: "/here/there/everywhere",
                  fileName: "Sample pdf",
                  quizID: null,
                  Description: "This is a sample video",
              },
          ],
      },
      {
          moduleName: "Cyber 2",
          content: [
              {
                  contentType: "Media",
                  fileType: "pdf",
                  fileLocation: "/here/there/everywhere",
                  fileName: "Sample pdf",
                  quizID: null,
                  Description: "This is a sample video",
              },
          ],
      },
  ],
};

  const oshaInfo : course = {
    courseName : "OSHA",
    modules : [
        {
            moduleName : "OSHA 1",
            content : [
                {
                    contentType : "Quiz",
                    fileType : null,
                    fileLocation :null,
                    fileName : null,
                    quizID : 7,
                    Description : null
                }]
        },
        {
          moduleName : "OSHA 2",
          content : [
              {
                  contentType : "Media",
                  fileType : "mp4",
                  fileLocation : "/here/there/everywhere",
                  fileName : "Sample Video",
                  quizID : null,
                  Description : "This is a sample video"
              }]
        }
    ]
  }

  const tempModule = {
    moduleName : "temp",
    content : [
        {
            contentType : null,
            fileType : null,
            fileLocation :null,
            fileName : null,
            quizID : null,
            Description : null
        }]
  }



function EditCourse() {
  const {user, setUser } = useContext(AuthContext)
  const { fullName } = user || {};
  

  const navigate = useNavigate();

  const [selectedCourse, setselectedCourse] = useState<course>(initialCourse);
  

  //const { courseModules, setcourseModules } = useState()

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
    getItem('Home', 'home', <TeamOutlined />)
  ];

  const handleMenuClick = () => {
    navigate(`/home`)
  };

  const { id } = useParams();

  useEffect(() => {
    if( id == "OSHA" ){
      setselectedCourse(oshaInfo);
    }
    else if( id == "Cyber" ){
      setselectedCourse(cyberInfo);
    }
  })

  const addModule = (module: any) => {
    console.log('here')
    console.log(module)
    module.push(tempModule);
    
  }

  const displayContent = (content: any) => {

    return (
        <Card
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2%',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography.Title level={3} style={{ textAlign: 'left', margin: 0 }}>
                <div className='dashboardText'>
                  {content['contentType']}
                </div>
              </Typography.Title>
              <div style={{ display: 'flex' }}>
                <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => null}>
                  <EditOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                </Button>
                <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => null}>
                  <DeleteOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                </Button>
              </div>
          </div>
        </Card>
    )
  }

  const displayModules = (module: any) => {

    //console.log(module['content'][0]['contentType'])

    return (

      <div style={{gap:'10px', justifyContent: 'space-between' }}>
        <div className='courses'>
          <Card
            style={{
              width: '100%',
              borderRadius: 8,
              backgroundColor: 'white', // Adjust the background color as needed
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2%',
              
            }}
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Title level={3} style={{ textAlign: 'left', margin: 0 }}>
                  <div className='dashboardText'>{module['moduleName']}</div>
                </Typography.Title>
                <div style={{ display: 'flex' }}>
                  <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => null}>
                    <EditOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                  </Button>
                  <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => null}>
                    <PlusOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                  </Button>
                  <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => null}>
                    <DeleteOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                  </Button>
                </div>
              </div>
            }
            bordered={true}
          >
          {module['content'].map((content: any) => (
              displayContent(content)
          ))}
          </Card>
        </div>
      </div>
    )
  }

  const listModules = (id: any) => {

    return (
      <div>
      {id['modules'].map((module: any) => (
        displayModules(module)
      ))}
      
      </div>
    )
  }

  //console.log(selectedCourse['courseName'])
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
                  { fullName }
                </div>
              </Typography.Title>
              <Menu
              style={{ width: '100%', backgroundColor: '#002F8B' }}
              defaultSelectedKeys={['Dashboard']}
              mode="vertical"
              onClick={handleMenuClick}
              items={items}
            />
            </div>
          </Sider>
          <Content style={contentStyle}>
          <div className='headerImage'>
            <Image
              width= '100%'
              height = '98%'
              src = {headerImg}
              preview = {false}
            />
          </div>
            <div>
              <Typography.Title level={2} style={{ textAlign: 'left' }}>
                <div className='dashboardText'>Edit Course</div>
              </Typography.Title>
              <div>
              <ThemeProvider theme={{ palette: {primary: {main: 'white'}}}}>
                <Box
                  sx={{
                    width: 1,
                    height: 75,
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '2%',
                    color: 'white'
                  }}
                >
                  <Typography.Title level={3} style={{ textAlign: 'left' }}>
                    <div className='dashboardText'>{id}</div>
                  </Typography.Title>
                  <div style = {{display:'flex'}}>
                    <Button className='noHover' style={{ width: '50px', display:'flex', verticalAlign: 'middle'  }} >
                      <EditOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                    </Button>
                    <Button className='noHover' style={{ width: '50px', display:'flex', verticalAlign: 'middle' }} onClick={() => addModule(selectedCourse['courseName'])} >
                      <PlusOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                    </Button>
                  </div>
                </Box>
              </ThemeProvider>
              <div>{listModules(selectedCourse)}</div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default EditCourse
