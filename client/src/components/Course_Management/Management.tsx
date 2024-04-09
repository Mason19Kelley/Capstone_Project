import './Management.css'
import { Button, Image, Typography } from 'antd';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { Box, ThemeProvider } from '@mui/system';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CourseAPI } from '../../api/CourseAPI';
import { AuthContext } from '../../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';


// Temporary course object to be used when creating a new course
const newID = uuidv4();

const tempCourse = {
  courseName: 'temp',
  modules: [
    {
      moduleName : "temp",
      moduleID : newID,
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
  
  const { user, setEditCourseContext } = useContext(AuthContext);

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
    setCourseList([...courseList, newCourse]);

    CourseAPI.insertCourse(newCourse, JSON.stringify(tempCourse), 'Instructor', user?.organization?.id)
  }

  const removeCourse = (classtoRemove: string) => {
    CourseAPI.deleteCourse(classtoRemove);
    const updatedcoursesList = courseList.filter(item => item !== classtoRemove);
    setCourseList(updatedcoursesList);

  }

  const editCourse = (course: string) => {
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
              <div style = {{display:'flex', gap: "2px"}}>
                <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => editCourse(course)} icon={<EditOutlined style={{ color: 'black' }} />}>
                </Button>
                <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => removeCourse(course)} icon={<DeleteOutlined style={{ color: 'black' }} />}>
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
    <div className='cm-wrapper'>
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
            <Button className='noHover' type="primary" style={{ width: '50px' }} onClick = {addCourse} icon={<PlusOutlined style={{ color: 'black' }} />}>
            </Button>
          </Box>
          </ThemeProvider>
          <div>{cards()}</div>
        </div>
    </div>
  )
}

export default Management;
