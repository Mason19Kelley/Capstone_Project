import './Management.css';
import { Button, Card, Image, Tooltip, Typography } from 'antd';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { ThemeProvider } from '@mui/system';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CourseAPI } from '../../api/CourseAPI';
import { AuthContext } from '../../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';


// Temporary course object to be used when creating a new course
const newID = uuidv4();

// temporary course information to be used when creating a 
// new course
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
      const sortedNames = names.sort((a, b) => a.localeCompare(b));
      setCourseList(sortedNames);

    });
  }, [])

  const navigate = useNavigate();

  // adds a course to the list of courses and adds to the database
  const addCourse = () => {
    const length = courseList.length + 1;
    var newCourse = 'Course ' + length;
    tempCourse.courseName = newCourse;
    setCourseList([...courseList, newCourse]);

    CourseAPI.insertCourse(newCourse, JSON.stringify(tempCourse), 'Instructor', user?.organization?.id)
  }

  // removes course from the list of courses and deletes from the database
  const removeCourse = (classtoRemove: string) => {
    CourseAPI.deleteCourse(classtoRemove);
    const updatedcoursesList = courseList.filter(item => item !== classtoRemove);
    setCourseList(updatedcoursesList);

  }

  // navigates to the edit course page
  const editCourse = (course: string) => {
    setEditCourseContext('Edit_Course');
    navigate(`/editCourse/${course}`);
  };
  
  // creates cards for each course and displays
  const cards = () => {
    return (
      <div className="flex flex-col gap-[1px]">
        {courseList.map((course) => (
        <div className='courses flex flex-row justify-between  w-[100%]'>
          <ThemeProvider theme={{ palette: {primary: {main: 'white'}}}}>
            <Card
            style={{ width: '100%', backgroundColor: 'lightgrey'}}
            >
              <div className="flex flex-row justify-between">
                <Typography.Title level={3} style={{ textAlign: 'left' }}>
                  <div className='dashboardText'>{course}</div>
                </Typography.Title>
                <div style = {{display:'flex', gap: "2px"}}>
                  <Tooltip placement='bottom' title="Edit Course">
                  <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => editCourse(course)} icon={<EditOutlined style={{ color: 'black' }} />}>
                  </Button>
                  </Tooltip>
                  <Tooltip placement='bottom' title="Delete Course">
                    <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => removeCourse(course)} icon={<DeleteOutlined style={{ color: 'black' }} />}>
                    </Button>
                  </Tooltip>                  
                </div>
              </div>
            </Card>
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
      <h1 className='self-start course-m pb-3' style= {{color:'#0c2245', fontFamily: 'Playfair-Display', paddingTop: 10}}>Course Management</h1>
      <div className='courses ml-[1%] mr-[1%]'>
        <ThemeProvider theme={{ palette: {primary: {main: 'white'}}}}>
          <Card
            // sx={{
            //   width: 1,
            //   height: 75,
            //   borderRadius: 1,
            //   bgcolor: 'primary.main',
            //   display: 'flex',
            //   justifyContent: 'space-between',
            //   alignItems: 'center',
            //   padding: '2%',
            // }}
          >
            <div className='flex flex-row justify-between'>
            <Typography.Title level={3} style={{ textAlign: 'left' }}>
              <div className='dashboardText'>Courses</div>
            </Typography.Title>
            <Tooltip placement='bottom' title="Create Course">
              <Button className='noHover' type="primary" style={{ width: '50px' }} onClick = {addCourse} icon={<PlusOutlined style={{ color: 'black' }} />}>
              </Button>
            </Tooltip>
            </div>
            <div>{cards()}</div>
          </Card>
          
          </ThemeProvider>
          
        </div>
    </div>
  )
}

export default Management;
