import './Management.css'
import { Button, Card, ConfigProvider, Image, Typography } from 'antd';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { Box, ThemeProvider } from '@mui/system';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CourseAPI } from '../../api/CourseAPI';
import { AuthContext } from '../../context/AuthContext';



const tempCourse = {
  courseName: 'temp',
  modules: [
    {
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
  }]
}



function Management () {
  const [courseList, setCourseList] = useState<string[]>([]);
  
  const { user, organization, setEditCourseContext } = useContext(AuthContext);
  console.log(organization)

  useEffect(() => {
    CourseAPI.getAllCourses(user?.organization?.id || 0).then((data: any[]) => {
      const names = data.map((course: {courseName: string}) => course.courseName);
      setCourseList(names);

    });
  }, [])

  const navigate = useNavigate();

  const addCourse = () => {
    const length = courseList.length + 1;
    var newCourse = 'Course ' + length;
    tempCourse.courseName = newCourse;
    console.log(tempCourse)
    setCourseList([...courseList, newCourse]);
    console.log(courseList)



    CourseAPI.insertCourse(newCourse, JSON.stringify(tempCourse), 'Instructor', user?.organization?.id)

  }

  const removeCourse = (classtoRemove: string) => {
    CourseAPI.deleteCourse(classtoRemove);
    const updatedcoursesList = courseList.filter(item => item !== classtoRemove);
    setCourseList(updatedcoursesList);
    console.log(courseList);
  }

  const editCourse = (course: string) => {
    console.log(course); 
    setEditCourseContext('Edit_Course');
    navigate(`/editCourse/${course}`);
  };
  

  const cards = () => {
    return (
      <div style={{gap:'10px', justifyContent: 'space-between' }}>
        {courseList.map((course) => (
        <div className='courses'>
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
              }}
            >
              <Typography.Title level={3} style={{ textAlign: 'left' }}>
                <div className='dashboardText'>{course}</div>
              </Typography.Title>
              <div style = {{display:'flex'}}>
                <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => editCourse(course)}>
                  <EditOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                </Button>
                <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => removeCourse(course)}>
                  <DeleteOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                </Button>
              </div>
            </Box>
          </ThemeProvider>
        </div>
        ))}
      </div>
    );
  }


  return (
    <div className='wrapper'>
      <div className='headerImage'>
        <Image
          width= '100%'
          height = '98%'
          src = {headerImg}
          preview = {false}
        />
      </div>
      <h1 className='self-start' style= {{color:'#0c2245', fontFamily: 'Playfair-Display', paddingLeft: 50, paddingTop: 10}}>Course Management</h1>
      <div className='courses'>
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
            }}
          >
            <Typography.Title level={3} style={{ textAlign: 'left' }}>
              <div className='dashboardText'>Courses</div>
            </Typography.Title>
            <Button className='noHover' type="primary" style={{ width: '50px', display:'flex', verticalAlign: 'middle' }} onClick = {addCourse}>
              <PlusOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
            </Button>
          </Box>
          </ThemeProvider>
          <div>{cards()}</div>
        </div>
    </div>
  )
}

export default Management;
