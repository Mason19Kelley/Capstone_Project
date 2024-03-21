import { Image, Layout, theme, Card, ConfigProvider } from "antd";
import './CoursePage.css';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { json, useParams } from "react-router-dom";
import { CourseAPI } from "../../api/CourseAPI";
import { Courses } from "../../models/courses.model";
import { useEffect, useState } from "react";
import Meta from 'antd/es/card/Meta';
import { minHeight } from "@mui/system";

const { Header, Content } = Layout;

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
  if (inner && mIndex != undefined){
    if(jsonInfo?.modules[mIndex].content[index].Description == null){
      return(
        <Card type="inner" style={{background: '#fafafa', marginBottom: '1vh'}}>
          <Meta title={jsonInfo?.modules[mIndex].content[index].fileName}/>
        </Card>
      )
    } else {
      return (
        <Card type="inner" title={jsonInfo?.modules[mIndex].content[index].fileName} style={{marginBottom: '1vh'}}>
          {jsonInfo.modules[mIndex].content[index].Description}
        </Card>
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
      <Card title={jsonInfo?.modules[index].moduleName} style={{ width: '80vw', marginBottom: '5vh'}}>
        {cards.map(card => <div>{card}</div>)}
      </Card>
    )
  }
  
  
}

function createModule(jsonInfo: course | undefined): JSX.Element[] {
  const cards: JSX.Element[] = [];

  for (let index = 0; index < (jsonInfo?.modules.length || 1); index++){
    cards.push(generateModule(false, index, jsonInfo))
  }

  return cards
}

const CoursePage: React.FC = () => {
  let { id } = useParams();

  const [selectedCourse, setselectedCourse] = useState<course>();
  const [instructor, setInstructor] = useState<string>('');
  const [courseName, setcourseName] = useState<string>('');


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
      />
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
        <div className="modules" >
        <ConfigProvider theme={{ token: { fontFamily: "Mulish", fontSize: 30, paddingLG: 18 } }}>
            {module.map(card => <div>{card}</div>)}
        </ConfigProvider>
        </div>
        <div className='wrapper'>
          <h1 className='header' style= {{
            fontFamily: 'Playfair-Display', 
            paddingLeft: 50, paddingTop: 10}}>
              Course Name: {courseName} <br /> 
              Course Instructor: {instructor} <br />
              Course id: {id}</h1>
        </div>
      </div>
      </Content>
    </Layout>
    );
  };

  
export default CoursePage;