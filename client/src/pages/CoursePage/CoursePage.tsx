import { Image, Layout, theme } from "antd";
import './CoursePage.css';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { useParams } from "react-router-dom";
import { CourseAPI } from "../../api/CourseAPI";
import { Courses } from "../../models/courses.model";
import { useEffect, useState } from "react";
import { minHeight } from "@mui/system";

const { Header, Content } = Layout;

const CoursePage: React.FC = () => {
    let { id } = useParams();

    const [courses, setCourses] = useState<Courses>();
    useEffect(() => {
        const fetchData = async () => {
        try {
          const coursesData = await CourseAPI.getCourses(parseInt(id || ''));
          setCourses(coursesData);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }};
        fetchData();
      }, [id]);
    


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    

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
        <div className='wrapper'>
        <h1 className='header' style= {{
          fontFamily: 'Playfair-Display', 
          paddingLeft: 50, paddingTop: 10}}>
            Course Name: {courses?.courseName} <br /> 
            Course Instructor: {courses?.instructor} <br />
            Course id: {courses?.cid}</h1>
      </div>
        </div>
      </Content>
    </Layout>
    );
  };

  
export default CoursePage;